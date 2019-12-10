import React, { Component } from 'react'
import poiData from '../data/poi-toulouse.json'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { IconLayer } from '@deck.gl/layers';
import { MAPBOX_TOKEN, INITIAL_VIEW_STATE } from '../utils'
import atlas from '../images/atlas.png'
import { Tag, Typography, Select } from 'antd';
import marker from '../images/adresse.png'
import ICON_MAPPING from './icons-locations'
import OverlayCategory from './OverlayCategory';
import { styleToolTipPoi } from '../style'

const { Text } = Typography
const { Option } = Select

class Poi extends Component {
	state = {
		viewport: {
			...INITIAL_VIEW_STATE,
			width: '100%',
			height: window.innerHeight - 115
		},
		categories: [],
		x: 0,
		y: 0,
		hoveredObject: null,
		expandedObjects: null,
		selectedRowKeys: [0], // Check here to configure the default column
	}

	componentDidMount() {
		this.processCategory()
		this.onFilter()
	}

	// tableau des catégories
	processCategory = () => {
		const categoriesArray = []
		poiData
			.map(poi => {
				return !categoriesArray.includes(poi.categorie) && categoriesArray.push(poi.categorie)
			})
		this.setState({ categories: categoriesArray }, () => this.onFilter())
	}

	onFilter() {

		const filteredCat = this.state.categories && this.state.selectedRowKeys
			.map(row => this.state.categories[row])

		const filtered = poiData
			.filter(poi => poi.categorie === filteredCat[0] ||
				poi.categorie === filteredCat[1] ||
				poi.categorie === filteredCat[2] ||
				poi.categorie === filteredCat[3] ||
				poi.categorie === filteredCat[4] ||
				poi.categorie === filteredCat[5] ||
				poi.categorie === filteredCat[6] ||
				poi.categorie === filteredCat[7]
				? poi : null)
		this.setState({ filtered })
	}

	onSelectChange = selectedRowKeys => {
		this.setState({ selectedRowKeys }, () => this.onFilter());
	};

	_renderIcons(d) {
		if (d.categorie.includes('Caniparc')) {
			return 'dogGreen'
		}
		if (d.categorie.includes('Piscine')) {
			return 'pool'
		}
		if (d.categorie.includes('Skate')) {
			return 'skate'
		}
		if (d.categorie.includes('Marché')) {
			return 'shop'
		}
		if (d.categorie.includes('Sanisette')) {
			return 'toilets'
		}
		if (d.categorie.includes('Ecole maternelle ')) {
			return 'school'
		}
		if (d.categorie.includes('Ecole élémentaire')) {
			return 'elementarySchool'
		}
		if (d.categorie.includes('Santé')) {
			return 'heart'
		}
	}

	_renderLayers() {
		return [
			new IconLayer({
				id: 'icon-layer',
				data: this.state.filtered,
				pickable: true,
				iconAtlas: atlas,
				iconMapping: ICON_MAPPING,
				getIcon: d => this._renderIcons(d),
				sizeScale: 10,
				getPosition: d => d.shape.coordinates,
				getSize: d => 5,
				anchorY: 'bottom',
				filterEnabled: true,
				visible: true,
				alphaCutoff: 0, autoHighlight: true,
			})
		]
	}

	_renderTooltipOnClick() {
		const { x, y, expandedObjects } = this.state;

		console.log('ok')
		if (expandedObjects) {
			return (
				<div style={{ left: x, top: y }}>
					{expandedObjects.map(({ nom, descriptif, adresse, categorie, shape, commune }) => {
						return (
							<div key={nom} style={styleToolTipPoi}>
								<p><Tag color="geekblue">{categorie}</Tag></p>
								<h3>{nom}</h3>
								<p>{descriptif}</p>
								<div style={{ display: 'flex' }}>
									<div><img src={marker} alt='' /></div>
									<div style={{ marginLeft: '20px' }}>
										<div><Text>{adresse && adresse.toUpperCase()}</Text></div>
										<div><Text>{commune && commune.toUpperCase()}</Text></div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			);
		}
	}

	_onClick = (info) => {
		console.log(this.state.viewport)
		const { x, y, object } = info;
		if (object) {
			this.setState({ x, y, expandedObjects: [object] });

			const newViewport = {
				...this.state.viewport,
				longitude: object.shape.coordinates[0],
				latitude: object.shape.coordinates[1],
				zoom: 19,
				minZoom: 8,
				maxZoom: 18,
				pitch: 60,
				bearing: 0,
				padding: [100, -100],
				transitionDuration: 600,
				transitionInterpolator: new FlyToInterpolator(),
				onDragStart: this._closePopup,
			}
			this.setState({ viewport: newViewport })

		} else {
			this._closePopup();
		}
	}

	_closePopup = () => {
		if (this.state.expandedObjects) {
			this.setState({ expandedObjects: null, hoveredObject: null });
		}
	}


	render() {
		const { viewport, categories, selectedRowKeys } = this.state
		return (
			<div style={{ display: 'flex' }}>
				<Select
					defaultValue="light"
					style={{
						width: '300px',
						position: 'absolute',
						zIndex: '9999'
					}}
					onChange={this.handleChange}
				>
					<Option value="light">Clair</Option>
					<Option value="dark">Sombre</Option>
				</Select>
				{categories.length !== 0 &&
					<OverlayCategory
						selectedRowKeys={selectedRowKeys}
						onSelectChange={this.onSelectChange}
						categories={categories}
					/>
				}
				<DeckGL
					layers={this._renderLayers()}
					initialViewState={viewport}
					viewState={viewport}
					controller
					{...viewport}
					onViewStateChange={this._onViewportChange}
					onClick={this._onClick}
					layerFilter={({ layer, viewport }) => {
						return layer.id !== 'bg' || viewport.id === 'minimap';
					}}
				>
					<ReactMapGL
						{...viewport}
						preventStyleDiffing={true}
						mapboxApiAccessToken={MAPBOX_TOKEN}
						mapStyle="mapbox://styles/sandymapb/ck3wsdgs91yce1ck0wrf06kh4"
					/>
					{this._renderTooltipOnClick()}
				</DeckGL>
			</div>
		);
	}
}

export default Poi;
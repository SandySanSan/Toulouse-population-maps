import React, { Component } from 'react'
import poiData from '../data/poi-toulouse.json'
import StaticMap from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { IconLayer } from '@deck.gl/layers';
import { MAPBOX_TOKEN, INITIAL_VIEW_STATE } from '../utils'
import atlas from '../images/atlas.png'
import { Tag, Typography } from 'antd';
import marker from '../images/adresse.png'
import ICON_MAPPING from './icons-locations'
import OverlayCategory from './OverlayCategory.js';

const { Text } = Typography;

class Poi extends Component {
	state = {
		viewport: {
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

	onSelectChange = selectedRowKeys => {
		this.setState({ selectedRowKeys }, () => this.onFilter());

	};

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

	_renderhoveredItems = () => {
		const { x, y, hoveredObject, expandedObjects } = this.state;

		if (expandedObjects) {
			return (
				<div className="tooltip interactive"
					style={{
						left: x, top: y, backgroundColor: 'white',
						position: 'absolute', zIndex: 9999, padding: '15px', borderRadius: '5px', width: '240px', paddingBottom: '40px'
					}}>
					{expandedObjects.map(({ nom, descriptif, adresse, categorie, shape, commune }) => {
						return (
							<div key={nom}>
								<p style={{ marginBottom: '15px' }}><Tag color="geekblue">{categorie}</Tag></p>
								<h3>{nom}</h3>
								<p>{descriptif}</p>
								<div style={{ display: 'flex' }}>
									<div><img src={marker} alt='' /></div>
									<div style={{ marginLeft: '20px' }}>
										<div><Text>{adresse.toUpperCase()}</Text></div>
										<div><Text>{commune.toUpperCase()}</Text></div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			);
		}

		if (!hoveredObject) {
			return null;
		}

		return (
			<div className="tooltip" style={{ left: x, top: y }}>
				<h5>
					{hoveredObject.nom}
				</h5>
			</div>
		);
	}

	_onClick = (info) => {
		const { x, y, object } = info;

		if (object) {
			this.setState({ x, y, expandedObjects: [object] });
		} else {
			this._closePopup();
		}
	}

	_closePopup = () => {
		if (this.state.expandedObjects) {
			this.setState({ expandedObjects: null, hoveredObject: null });
		}
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

	render() {
		const { viewport, categories, selectedRowKeys } = this.state
		return (
			<div style={{ display: 'flex' }}>
				{categories.length !== 0 && <OverlayCategory selectedRowKeys={selectedRowKeys} onSelectChange={this.onSelectChange} categories={categories} />}
				<DeckGL
					layers={this._renderLayers()}
					initialViewState={INITIAL_VIEW_STATE}
					controller
					{...viewport}
					onViewportChange={this._onViewportChange}
					onClick={this._onClick}
					layerFilter={({ layer, viewport }) => {
						return layer.id !== 'bg' || viewport.id === 'minimap';
					}}
				>
					<StaticMap
						preventStyleDiffing={true}
						mapboxApiAccessToken={MAPBOX_TOKEN}
						mapStyle="mapbox://styles/sandymapb/ck3wsdgs91yce1ck0wrf06kh4"
					/>
					{this._renderhoveredItems()}
				</DeckGL>
			</div>
		);
	}
}

export default Poi;
import React, { Component } from 'react'
import poiData from '../data/poi-toulouse.json'
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { IconLayer } from '@deck.gl/layers';
import { MAPBOX_TOKEN, INITIAL_VIEW_STATE } from '../utils'
import atlas from '../images/atlas.png'
import { Tag, Typography, Select, Row, Col, PageHeader } from 'antd';
import marker from '../images/adresse.png'
import ICON_MAPPING from './icons-locations'
import OverlayCategory from './OverlayCategory';
import { styleToolTipPoi } from '../style'

const { Text } = Typography
const { Option } = Select

const MAPBOX_DEFAULT_MAPSTYLES = [
	{ label: 'Streets V10', value: 'mapbox://styles/mapbox/streets-v10' },
	{ label: 'Outdoors V10', value: 'mapbox://styles/mapbox/outdoors-v10' },
	{ label: 'Light V9', value: 'mapbox://styles/mapbox/light-v9' },
	{ label: 'Dark V9', value: 'mapbox://styles/mapbox/dark-v9' },
	{ label: 'Satellite V9', value: 'mapbox://styles/mapbox/satellite-v9' },
	{
		label: 'Satellite Streets V10',
		value: 'mapbox://styles/mapbox/satellite-streets-v10'
	},
	{
		label: 'Navigation Preview Day V4',
		value: 'mapbox://styles/mapbox/navigation-preview-day-v4'
	},
	{
		label: 'Navitation Preview Night V4',
		value: 'mapbox://styles/mapbox/navigation-preview-night-v4'
	},
	{
		label: 'Navigation Guidance Day V4',
		value: 'mapbox://styles/mapbox/navigation-guidance-day-v4'
	},
	{
		label: 'Navigation Guidance Night V4',
		value: 'mapbox://styles/mapbox/navigation-guidance-night-v4'
	}
];

class Poi extends Component {
	state = {
		viewport: {
			...INITIAL_VIEW_STATE,
			width: '100%',
			height: window.innerHeight - 115,
		},
		categories: [],
		x: 0,
		y: 0,
		hoveredObject: null,
		expandedObjects: null,
		selectedRowKeys: [1, 2, 3],
		showPopup: false,
		style: 'mapbox://styles/mapbox/navigation-preview-night-v4',
	}

	componentDidMount() {
		this.processCategory()
		this.onFilter()
	}

	processCategory = () => {
		const categoriesArray = []
		poiData
			.map(poi => {
				return !categoriesArray.includes(poi.categorie) &&
					categoriesArray.push(poi.categorie)
			})
		const sorted = categoriesArray.sort((a, b) => a.localeCompare(b, 'fr', { ignorePunctuation: true }))
		this.setState({ categories: sorted },
			() => this.onFilter())
	}

	onFilter() {
		const { categories, selectedRowKeys } = this.state
		const filteredCat = categories && selectedRowKeys
			.map(row => categories[row])

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
		this.setState({ selectedRowKeys },
			() => this.onFilter());
		this.setState({
			viewport: {
				...INITIAL_VIEW_STATE,
				width: '100%',
				height: window.innerHeight - 115,
				transitionDuration: 600,
				transitionInterpolator: new FlyToInterpolator(),

			},
		})
	};

	onStyleChange = style => {
		this.setState({ style });
	};

	_onViewportChange = (viewport) => {
		this.setState({ viewport })
	}

	_onViewStateChange = viewport => {
		const newViewport = viewport.viewState
		this.setState({ viewport: newViewport });
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
				alphaCutoff: 0,
				autoHighlight: true,
				onHover: info => this.setState({
					hoveredObject: info.object,
					pointerX: info.x,
					pointerY: info.y
				})
			})
		]
	}

	_renderTooltipOnClick() {
		const { hoveredObject, pointerX, pointerY } = this.state || {};
		const { nom, descriptif, adresse, categorie, commune } = hoveredObject || {}

		return hoveredObject && (
			<div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY }}>
				<div key={nom} style={styleToolTipPoi}>
					<p><Tag color="geekblue">{categorie}</Tag></p>
					<h3>{nom}</h3>
					<p>{descriptif}</p>
					<div style={{ display: 'flex' }}>
						<div>
							<img src={marker} alt='' />
						</div>
						<div style={{ marginLeft: '20px' }}>
							<Text>
								<div>{adresse && adresse.toUpperCase()}</div>
								<div>{commune && commune.toUpperCase()}</div>
							</Text>
						</div>
					</div>
				</div>
			</div>
		);
	}

	_onClick = (info) => {
		const { x, y, object, coordinate } = info;

		if (object) {
			this.setState({ x, y, coordinate, expandedObjects: [object] });
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
				transitionDuration: 450,
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
			<Row>
				<Col span={19}>
					<DeckGL
						layers={this._renderLayers()}
						initialViewState={viewport}
						viewState={viewport}
						controller
						{...viewport}
						onViewStateChange={this._onViewStateChange}
						onClick={this._onClick}
						layerFilter={({ layer, viewport }) => {
							return layer.id !== 'bg' || viewport.id === 'minimap';
						}}
					>
						<ReactMapGL
							{...viewport}
							preventStyleDiffing={true}
							mapboxApiAccessToken={MAPBOX_TOKEN}
							mapStyle={this.state.style}						>
						</ReactMapGL>
					</DeckGL>
				</Col>
				<Col span={5}>
					<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
						<div>
							<PageHeader
								style={{
									border: '1px solid rgb(235, 237, 240)',
									zIndex: '3',
									width: '100%',
									backgroundColor: 'rgba(255, 255, 255, 0.6)'
								}}
								title="Points d'intérêt"
								subTitle="Localisation des points d'intérêt de Toulouse. Aménagements, Citoyenneté"
							/>
						</div>
						<div style={{ padding: '15px', width: '100%' }}>
							<p>Styles de la carte :</p>
							<Select
								value={this.state.style}
								style={{
									width: '100%',
								}}
								onChange={this.onStyleChange}
							>
								{MAPBOX_DEFAULT_MAPSTYLES.map(style => (
									<Option key={style.value} value={style.value}>
										{style.label}
									</Option>
								))}
							</Select>
						</div>
						<div style={{ padding: '15px', width: '100%' }}>
							<p>Légende :</p>
							{categories.length !== 0 &&
								<OverlayCategory
									selectedRowKeys={selectedRowKeys}
									onSelectChange={this.onSelectChange}
									categories={categories}
								/>
							}
						</div>
					</div>
				</Col>
				{this._renderTooltipOnClick()}
			</Row>
		);
	}
}

export default Poi;
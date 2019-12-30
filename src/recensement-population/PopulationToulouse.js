import React, { Component } from 'react'
import StaticMap from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { PolygonLayer } from '@deck.gl/layers'
import { styleToolTip } from '../style'
import { ResponsiveWaffle } from '@nivo/waffle'
import { scaleThreshold } from 'd3-scale';
import { Typography, PageHeader, Row, Col } from 'antd';
import DescriptionData from './DescriptionData'

const { Title } = Typography

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
	longitude: 1.433333,
	latitude: 43.600000,
	zoom: 11.2,
	minZoom: 11,
	maxZoom: 19,
	pitch: 10,
	bearing: 0,
};

const data2011 = require('../data/population-toulouse-2011.json');
const data2012 = require('../data/population-toulouse-2012.json');
const data2013 = require('../data/population-toulouse-2013.json')
const data2014 = require('../data/population-toulouse-2014.json')
const data2015 = require('../data/population-toulouse-2015.json')

const yearsData = [
	{ data: data2011, year: 2011 },
	{ data: data2012, year: 2012 },
	{ data: data2013, year: 2013 },
	{ data: data2014, year: 2014 },
	{ data: data2015, year: 2015 }
]

export const COLOR_SCALE = scaleThreshold()
	.domain([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6.0])
	.range([
		[65, 182, 196, 180],
		[127, 205, 187],
		[199, 233, 180],
		[237, 248, 177],
		[255, 255, 204],
		[255, 237, 160],
		[254, 217, 118],
		[254, 178, 76],
		[253, 141, 60],
		[252, 78, 42],
		[227, 26, 28],
		[189, 0, 38],
		[128, 0, 38]
	]);


class PopulationToulouse extends Component {
	state = {
		viewport: {
			width: '100%', height: window.innerHeight
		},
		data: [],
		dataAge: [],
		isExtruded: true,
	}

	componentDidMount() {
		this.setState({ data: data2011, currentYear: 2011 }, () => this.getTotalPop())
	}

	_onViewportChange({ viewport }) {
		this.setState({ viewport });
	}

	averageDataAge(total, count) {
		const percentage = ((count / total.population) * 100)
		return percentage
	}

	getAgeData(hoveredObject) {
		const dataAge = [
			{
				"id": "0-14 ans",
				"label": "0-14 ans",
				"value": this.averageDataAge(hoveredObject, hoveredObject.pop0014),
				"color": "#468df3"
			},

			{
				"id": "15-29 ans",
				"label": "15-29 ans",
				"value": this.averageDataAge(hoveredObject, hoveredObject.pop1529),
				"color": "#e8a838"
			},
			{
				"id": "30-44 ans",
				"label": "30-44",
				"value": this.averageDataAge(hoveredObject, hoveredObject.pop3044),
				"color": "#ba72ff"
			},
			{
				"id": "45-59 ans",
				"label": "45-59",
				"value": this.averageDataAge(hoveredObject, hoveredObject.pop4559),
				"color": "#000000"
			},
			{
				"id": "60-74 ans",
				"label": "60-74",
				"value": this.averageDataAge(hoveredObject, hoveredObject.pop6074),
				"color": "#a1cfff"
			},
			{
				"id": "75 ans et plus",
				"label": "75 et +",
				"value": this.averageDataAge(hoveredObject, hoveredObject.pop75p),
				"color": "#a1cfff"
			}

		]
		return dataAge
	}

	getTotalPop() {
		const { data } = this.state
		const total = data && data.reduce((totalP, quartier) => {
			return totalP + quartier.population
		}, 0)
		this.setState({ totalPop: total })
	}

	_renderTooltip() {
		const { hoveredObject } = this.state || {};

		return hoveredObject && (
			<div style={{ height: '80vh' }}>
				<div style={styleToolTip}>
					<div>
						<Title level={4}>{hoveredObject.libelleQuartier}</Title>
					</div>
					<p>Nombre d'habitants : {Math.round(`${hoveredObject.population}`)}</p>
					<ResponsiveWaffle
						data={this.getAgeData(hoveredObject)}
						total={100}
						rows={10}
						columns={20}
						margin={{ right: 5, left: 120 }}
						colors={{ scheme: 'nivo' }}
						borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
						animate={true}
						motionStiffness={90}
						motionDamping={11}
						legends={[
							{
								anchor: 'left',
								direction: 'column',
								justify: false,
								translateX: -110,
								translateY: 0,
								itemsSpacing: 4,
								itemWidth: 100,
								itemHeight: 20,
								itemDirection: 'left-to-right',
								itemOpacity: 1,
								itemTextColor: '#777',
								symbolSize: 20,
							}
						]}
					/>
				</div>
			</div>
		);
	}

	_renderLayers() {
		return [
			new PolygonLayer({
				id: 'polygon-layer',
				data: this.state.data,
				pickable: true,
				extruded: this.state.isExtruded,
				autoHighlight: true,
				highlightColor: [93, 100, 184],
				stroked: false,
				filled: true,
				wireframe: false,
				lineWidthMinPixels: 1,
				getPolygon: d => d.coordinates,
				getElevation: d => d.population / 4,
				getFillColor: d => COLOR_SCALE(((d.population / this.state.totalPop) * 100).toFixed(2)),
				getLineColor: [100, 100, 100],
				getLineWidth: 1,
				onHover: info => this.setState({
					hoveredObject: info.object,
					pointerX: info.x,
					pointerY: info.y
				}),
				transitions: {
					elevationScale: 3000
				}
			})]
	}

	toggleExtruded = (checked) => {
		this.setState({ isExtruded: !this.state.isExtruded })
	}

	handleYear = (e) => {
		const dataYear = e.target.value
		this.setState({ data: dataYear })
	}

	render() {
		const { viewport } = this.state
		return (
			<Row>
				<Col xs={24} lg={19}>
					<DeckGL
						layers={this._renderLayers()}
						initialViewState={INITIAL_VIEW_STATE}
						controller
						{...viewport}
						onViewportChange={this._onViewportChange}
					>
						<StaticMap
							preventStyleDiffing
							mapboxApiAccessToken={MAPBOX_TOKEN}
							mapStyle="mapbox://styles/sandymapb/ck3bz48b71p891clftf18pvna"
						/>
					</DeckGL>
				</Col>
				<Col xs={24} md={24} lg={5}>
					<PageHeader
						style={{
							border: '1px solid rgb(235, 237, 240)',
							position: 'absolute',
							zIndex: '3',
							width: '100%',
							backgroundColor: 'rgba(255, 255, 255, 0.6)'
						}}
						title="Population des Grands Quartiers"
						subTitle="Données du recensement de la population toulousaine à l'échelle des grands quartiers de 2011 à 2015"
					>
						<DescriptionData
							toggleExtruded={this.toggleExtruded}
							yearsData={yearsData}
							handleYear={this.handleYear} />
					</PageHeader>
				</Col>
				{this._renderTooltip()}
			</Row>
		);
	}
}

export default PopulationToulouse;
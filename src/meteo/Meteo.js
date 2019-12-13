import React, { Component } from 'react'
import axios from 'axios'
import { STATIONS } from '../utils'
// import CardStation from './CardStation';
import StaticMap from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import coordStations from '../data/stations-coord-toulouse.json'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
	longitude: 1.433333,
	latitude: 43.600000,
	zoom: 11.2,
	minZoom: 11,
	maxZoom: 19,
	pitch: 10,
	bearing: 0,
	padding: [100, -100]
};

class Meteo extends Component {
	state = {
		infos: [],
		isLoading: false,
		HEAT_DATA: [],
		viewport: INITIAL_VIEW_STATE
	}

	componentDidMount() {
		this.getMeteoData()
	}


	// processHeatData() {
	// 	const HEAT_DATA = this.state.infos.map(station => ({ coordinates: [station[0].longitude, station[0].latitude], temp: station[0].temp }))
	// 	this.setState({ HEAT_DATA })
	// }

	getMeteoData() {
		this.setState({ isLoading: true })
		STATIONS.map(async url => {
			try {
				const response = await axios.get(`https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=${url}&rows=1&sort=record_timestamp`)
				const meteoInfo = response.data.records
				const newInfos = meteoInfo !== null && meteoInfo.map(data => ({
					recordid: data.recordid,
					forceRafale: data.fields.force_rafale_max,
					directionVent: data.fields.direction_du_vecteur_de_vent_max_en_degres,
					temp: data.fields.temperature_en_degre_c,
					id: data.datasetid,
					humidite: data.fields.humidite,
					timestamp: data.record_timestamp,
					typeStation: data.fields.type_de_station,
					coordinates: coordStations.filter(coord => ((coord.id.toString() === data.datasetid.slice(0, 2)) && coord.coordinates !== undefined) ? coord.coordinates : null)
				}))
				const infos = [...this.state.infos, newInfos]
				this.setState({ infos }, () => console.log(this.state.infos[0][0].coordinates[0].coordinates))
			} catch (error) {
				console.log(error)
			}
		})
		this.setState({ isLoading: false })

	}

	_onViewportChange({ viewport }) {
		this.setState({ viewport });
	}

	_renderLayers() {
		const { infos } = this.state
		// const dataLayerHeat = infos && infos.map(data => data[0].coordinates[0])
		const newData = infos.map(data => ({ coordinates: data[0].coordinates[0], temp: data[0].temp }))
			.filter(data => data && data.coordinates !== undefined)

		console.log(newData)
		return [
			new HeatmapLayer({
				id: 'heatmapLayer',
				data: newData && newData,
				getPosition: d => d.coordinates.coordinates,
				getWeight: d => d.temp
			})
		]

	}

	render() {
		const { viewport } = this.state
		return (
			// <div style={{ display: 'flex', justifyContent: 'center' }}>
			// 	{infos && infos.map(info =>
			// 		<div style={{ margin: '15px' }} key={info[0].id}>
			// 			<CardStation info={info[0]} />
			// 		</div>
			// 	)}
			// </div>
			<div style={{ display: 'flex', height: '95vh' }}>

				<DeckGL
					layers={this._renderLayers()}
					initialViewState={INITIAL_VIEW_STATE}
					controller
					{...viewport}
					onViewportChange={this._onViewportChange}
				>
					<StaticMap
						preventStyleDiffing={true}
						mapboxApiAccessToken={MAPBOX_TOKEN}
						mapStyle="mapbox://styles/sandymapb/ck3bz48b71p891clftf18pvna"
					/>
				</DeckGL>
			</div>
		)

	}
}
export default Meteo;
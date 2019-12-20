import React, { Component } from 'react'
import axios from 'axios'
import { STATIONS } from '../utils'
import CardStation from './CardStation';
import StaticMap from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { IconLayer } from '@deck.gl/layers';
import IconClusterLayer from './icon-cluster-layer';
import icon from '../images/map-pin2.svg'
import coordStations from '../data/stations-coord-toulouse.json'
import { Row, Col, Typography } from 'antd'

const { Title, Text } = Typography

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
	longitude: 1.444247,
	latitude: 43.604462,
	zoom: 10,
	minZoom: 5,
	maxZoom: 19,
	pitch: 10,
	bearing: 0,
	width: window.innerWidth / 2,
	height: window.innerHeight - 120,
};

class Meteo extends Component {
	state = {
		infos: [],
		isLoading: false,
		viewport: INITIAL_VIEW_STATE,
		currentStation: 0,
		hoveredObject: null,
		expandedObjects: null,
		x: 0,
		y: 0
	}

	componentDidMount() {
		this.getMeteoData()
	}

	getMeteoData() {
		this.setState({ isLoading: true })
		STATIONS.map(async url => {
			try {
				const response = await axios.get(`https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=${url}&rows=4&sort=record_timestamp`)
				const meteoInfo = response.data.records
				const newInfos = meteoInfo !== null && meteoInfo.map(data => ({
					recordid: data.recordid,
					forceRafaleMax: data.fields.force_rafale_max,
					forceMoyenneVent: data.fields.force_moyenne_du_vecteur_vent,
					directionVent: data.fields.direction_du_vecteur_de_vent_max_en_degres,
					temp: data.fields.temperature_en_degre_c,
					id: data.datasetid,
					humidite: data.fields.humidite,
					pluie: data.fields.pluie,

					pression: data.fields.pression,
					timestamp: data.record_timestamp,
					typeStation: data.fields.type_de_station,
					coordinates: coordStations.filter(coord => ((coord.id.toString() === data.datasetid.slice(0, 2)) && coord.coordinates !== undefined) ? coord.coordinates : null)
				}))
				const infos = [...this.state.infos, newInfos]
				this.setState({ infos })
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

		return [
			new IconLayer({
				id: 'icon-layer',
				data: infos && infos,
				getIcon: d => ({
					url: icon,
					width: 128,
					height: 128,
					anchorY: 128
				}),
				getSize: 4,
				pickable: true,
				sizeScale: 15,
				getPosition: d => d[0].coordinates[0].coordinates,
				onHover: info => this.setState({
					hoveredObject: info.object,
					pointerX: info.x,
					pointerY: info.y
				}),
			})]
	}

	_renderTooltip() {
		const { hoveredObject, pointerX, pointerY } = this.state || {};
		return hoveredObject && (
			<div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY }}>
				{hoveredObject[0] && hoveredObject[0].id}
			</div>
		);
	}

	_onClick = (info) => {
		const { x, y, object } = info;
		// console.log(object[0].id)
		const currentId = (element) => object && element[0].id === object[0].id;
		let idStation = this.state.infos.findIndex(currentId)
		if (idStation === -1)
			return
		this.setState({ currentStation: idStation })
	}

	render() {
		const { infos, isLoading, viewport, currentStation } = this.state
		const current = infos[`${currentStation}`]

		return (
			<div>
				<Row>
					<Col lg={11} s={24} xs={24}>
						<div style={{ padding: '20px' }}>
							<Title level={2}>
								Stations Météo de la métropole Toulousaine
							</Title>
							<Text>
								<div>Jeux de données issus de capteurs faisant partie d'un réseau de stations
										météo situées sur la métropole Toulousaine en vue d'étudier le phénomène
								d'Ilot de Chaleur Urbain (ICU).</div>
								<div>Créateur : Toulouse Métropole</div>
								<div>Contributeur : Direction de l'Environnement</div>
								<div>Fréquence de mise à jour : Tous les quarts d'heure</div></Text>
						</div>
						<div>
							{current &&
								<CardStation
									info={current[0]}
									key={current[0].id}
									initialLoading={isLoading}
								/>}
						</div>
					</Col>
					<Col lg={13} s={24} xs={24}>
						<DeckGL
							layers={this._renderLayers()}
							initialViewState={INITIAL_VIEW_STATE}
							controller
							{...viewport}
							onViewportChange={this._onViewportChange}
							//  onViewStateChange={this._closePopup}
							onClick={this._onClick}
						>
							<StaticMap
								preventStyleDiffing={true}
								mapboxApiAccessToken={MAPBOX_TOKEN}
							/>
						</DeckGL>
						{this._renderTooltip()}
					</Col>
				</Row>
			</div >

		)

	}
}
export default Meteo;
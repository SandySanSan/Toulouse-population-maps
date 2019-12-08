import React, { Component } from 'react'
import axios from 'axios'
import { Card } from 'antd';

class Meteo extends Component {
	state = {
		infos: []
	}

	componentDidMount() {
		this.getMeteoData()
	}

	async getMeteoData() {

		try {
			const response = await axios.get(`https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=07-station-meteo-avenue-de-grande-bretagne&sort=record_timestamp`)
			console.log(response)
			const meteoInfo = response.data.records
			const infos = meteoInfo.length && meteoInfo.map(data => ({
				recordid: data.fields.recordid,
				forceRafale: data.fields.force_rafale_max,
				directionVent: data.fields.direction_du_vecteur_de_vent_max_en_degres,
				temp: data.fields.temperature_en_degre_c,
				id: data.datasetid,
				humidite: data.fields.humidite,
				timestamp: data.record_timestamp

			}))
			this.setState({ infos })

		} catch (error) {
			console.log(error)
		}
	}

	render() {
		return (<div>{this.state.infos.map(info =>
			<div style={{ margin: '15px' }}>
				<Card title={info.id} bordered={false} style={{ width: 300 }}>
					<p>{info.forceRafale}°</p>
					<p>Température : {info.temp}°C</p>
					<p>Humidité : {info.humidite}%</p>
					<p>Date : {info.timestamp}</p>
				</Card>
			</div>
		)}
		</div>)

	}
}
export default Meteo;
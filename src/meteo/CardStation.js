import React from 'react'
import { Card } from 'antd';


const CardStation = ({ info }) => (
	<Card title={info.id} bordered={false} style={{ width: 300 }}>
		<p>Température : {info.temp}°C</p>
		<p>Humidité : {info.humidite}%</p>
		<p>Direction du vecteur de vent : {info.forceRafale}°</p>
		<p>Date : {info.timestamp}</p>
		<p>Type de station : {info.typeStation}</p>
	</Card>)

export default CardStation




import React from 'react'
import { Card, Col, Typography, Tooltip, Tag, Row } from 'antd';
import CardToolTip from './CardToolTIp';
import thermo from '../images/Thermometer-50.png'
import wet from '../images/Cloud-Drizzle-Alt.png'
import wind from '../images/Wind.png'
import pluie from '../images/Cloud-Hail-Alt.png'
import pression from '../images/Cloud-Download.png'
import TempStations from './TempStations'
import moment from 'moment'
import { data } from './previousData.js'


var idLocale = require('moment/locale/fr');
moment.locale("fr", idLocale)

const { Title, Text } = Typography

function CardStation({ info, initialLoading }) {

	const textHumidite = <span>Valeur d'humidité en pourcentage.</span>
	const textTemp = <span>Température moyenne des 15 dernières minutes</span>
	const textWInd = <span>Force du vecteur de vent (norme). En km/h.</span>
	const textIss = <span>Integrated Sensor Suite (ISS) regroupant un capteur de température, humidité, anémomètre, pluviomètre, capteur de pression.</span>
	const textPluie = <span>Quantité de précipitation en mm.</span>
	const textPression = <span>Valeur de pression</span>

	const titleStation = info.id.split('-').join(' ').slice(3).toUpperCase()

	const title =
		// <div style={{ height: '80px', display: 'flex', width: '100%', justifyContent: 'space-around' }}>
		<div>
			<Row>
				<div>
					<Title level={3} type='warning'>{titleStation}</Title>
				</div>
			</Row>
			<Row>
				<Col span={12}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div>
							<Text type="secondary">Dernier relevé</Text>
						</div>
						<div>
							<Text type="secondary">{moment(info.timestamp).format('Do MMM YYYY, LT')}</Text>
						</div>
					</div>
				</Col>
				<Col>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div>
							<Text type="secondary">Type de station</Text>
						</div>
						<div>
							<Tooltip placement="right" title={textIss}>
								<Tag>{info.typeStation}</Tag>
							</Tooltip>
						</div>
					</div>
				</Col>
			</Row>
		</div>


	return (
		<div>
			<Row>
				<Col className="gutter-row" span={24} >
					<Card title={title} bordered={false} style={{ margin: '15px' }} loading={initialLoading}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<CardToolTip temp={`${info.temp} °C`} img={thermo} text={textTemp} />
							<CardToolTip temp={`${info.humidite} %`} img={wet} text={textHumidite} />
							<CardToolTip temp={`${info.forceMoyenneVent} km/h`} img={wind} text={textWInd} />
							<CardToolTip temp={`${info.pluie} mm`} img={pluie} text={textPluie} />
							<CardToolTip temp={`${info.pression} Pa`} img={pression} text={textPression} />

						</div>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col style={{ height: '300px' }}>
					<TempStations />
				</Col>
			</Row>
		</div>
	)
}

export default CardStation




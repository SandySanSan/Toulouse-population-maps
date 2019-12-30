import React from 'react'
import quartiersTls from './images/population-toulouse-quartier.png'
import thumbPoi from './images/poi-thumbnail.png'
import { Link } from 'react-router-dom'
import { Card } from 'antd';
const { Meta } = Card;

const cardsDataThumbs = [
	{
		img: `${quartiersTls}`,
		title: 'Population des Grands Quartiers',
		description: 'Données du recensement de la population toulousaine.',
		link: '/toulouse-population'
	},
	{
		img: `${thumbPoi}`,
		title: 'Points d\'intérêt de la ville',
		description: 'Aménagement, Tourisme, Citoyenneté.',
		link: '/toulouse-poi'
	},
	{
		img: `${quartiersTls}`,
		title: 'Stations météo',
		description: 'Données des stations météo de la Métropole de Toulouse',
		link: '/toulouse-meteo'
	},

]

const CardsData = () => {
	return (
		<div style={{ display: 'flex', marginTop: '20px' }}>
			{cardsDataThumbs.map(card => (
				<div style={{ padding: '10px' }} key={card.title}>
					<Link to={card.link}>
						<Card
							hoverable
							style={{ width: '25vw' }}
							cover={<img alt={card.title} src={card.img} />}
						>
							<Meta title={card.title} description={card.description} />
						</Card>
					</Link>
				</div>
			))
			}
		</div>
	);
}

export default CardsData;
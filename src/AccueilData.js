import React, { Fragment } from 'react'
import { Carousel, Typography } from 'antd';
import './accueil-style.scss'
import CardsData from './CardsData';
const { Title } = Typography


const dataCarousel = [
	{
		title: 'Population des Grands Quartiers',
		desc: 'Données du recensement de la population toulousaine à l\'échelle des grands quartiers de 2011 à 2015',
		classBg: 'background-pop-quartier title-flex'
	},
	{
		title: 'Points d\'intérêt ',
		classBg: 'background-poi'
	}
]

const AccueilData = () => {
	return (
		<Fragment>
			<div className='container'>
				<div className='container-carousel'>
					<Carousel autoplay effect="fade">
						{dataCarousel.map(data => <div className={data.classBg}>
							<div>
								<Title level={3} className='title-carousel'>{data.title}</Title>
								<Title level={4} className='title-carousel'>{data.desc}</Title>
							</div>
						</div>)}
					</Carousel>
				</div>
				<div>
					<CardsData />
				</div>
			</div>
		</Fragment >
	);
}

export default AccueilData;
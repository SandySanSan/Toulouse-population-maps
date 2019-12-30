import React from 'react'
import { Descriptions, Switch } from 'antd';
import PannelYears from './PannelYears'

const DescriptionData = ({ handleYear, toggleExtruded, yearsData }) => {


	const dataDescriptions = [
		{
			label: 'Années',
			content: <PannelYears
				handleYear={handleYear}
				yearsData={yearsData}
			/>
		},
		{
			label: 'Elévation',
			content: <Switch defaultChecked onChange={toggleExtruded} />
		},
		{
			label: 'Thème',
			content: 'Statistiques'
		},
		{
			label: 'Mots-clé',
			content: 'population, âge'
		},
		{
			label: 'Licence',
			content: 'Licence Ouverte (Etalab)'
		},
		{
			label: 'Producteur',
			content: 'Mairie de Toulouse'
		},
		{
			label: 'Référence',
			content: <a href='https://www.insee.fr/fr/statistiques' target='_blank' rel="noopener noreferrer">INSEE</a>
		}
	]

	return (
		<Descriptions column={1}>
			{dataDescriptions.map(data =>
				<Descriptions.Item
					key={data.label}
					label={data.label}>
					{data.content}
				</Descriptions.Item>)
			}
		</Descriptions>
	);
}

export default DescriptionData;
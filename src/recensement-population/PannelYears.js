import React from 'react'
import { Radio, Switch } from 'antd';
import { styleYearPanel, styleContainerYearPanel } from '../style'

export default function PannelYears({ handleYear, yearsData, toggleExtruded }) {

	return (
		<div style={styleContainerYearPanel}>
			<div style={styleYearPanel}>
				<div style={{ padding: '15px' }}>
					<Radio.Group defaultValue={yearsData[0].data} size="medium">
						{yearsData.map(year => <Radio.Button value={year.data} onChange={handleYear}>{year.year}</Radio.Button>)}
					</Radio.Group>
				</div>
				<div style={{ padding: '15px' }}>
					<Switch onChange={toggleExtruded} />
				</div>
			</div>
		</div>
	)

}
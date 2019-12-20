import React from 'react'
import { Typography, Tooltip } from 'antd';

const { Title } = Typography
const styleCase = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	border: '1px solid #dbdbdb',
	padding: '12px',
	margin: '10px',
	borderRadius: '10px'
}

const CardToolTip = ({ text, img, temp }) => {
	return (
		<div style={styleCase}>
			<Tooltip placement="bottom" title={text}>
				<div>
					<img src={img} alt='degrés' width='50px' height='auto' />
				</div>
				<div>
					<Title level={4}>{temp}</Title>
				</div>
			</Tooltip>
		</div>
	);
}

export default CardToolTip;
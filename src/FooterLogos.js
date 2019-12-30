import React from 'react'
import logoTm from './images/tm-logo.png'
import openData from './images/opendatafrance.png'


const FooterLogos = () => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div style={{ margin: '10px' }}>
				<img src={logoTm} alt='Toulouse Métropole' width='100px' />
			</div>
			<div>
				<img src={openData} alt='Open Data' width='100px' />
			</div>
		</div>
	);
}

export default FooterLogos;
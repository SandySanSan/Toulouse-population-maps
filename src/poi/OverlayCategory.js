import React, { Component } from 'react'
import { Table } from 'antd';
import dog from '../images/dog-green.png'
import school from '../images/school.png'
import pool from '../images/swimming.png'
import heart from '../images/heart.png'
import school2 from '../images/school2.png'
import sanisette from '../images/sanisette.png'
import shop from '../images/marche.png'
import skate from '../images/skate.png'
import { styleLegends, iconsPoiStyle } from '../style';

const columns = [
	{
		// title: 'Catégorie',
		dataIndex: 'categorie',
	}, {
		dataIndex: 'icon',
	},
];

//icons legend
const icons = [
	<img src={dog} style={iconsPoiStyle} alt='caniparc' />,
	<img src={school2} style={iconsPoiStyle} alt='école' />,
	<img src={school} style={iconsPoiStyle} alt='école' />,
	<img src={shop} style={iconsPoiStyle} alt='marché' />,
	<img src={sanisette} style={iconsPoiStyle} alt='sanisette' />,
	<img src={heart} style={iconsPoiStyle} alt='défibrillateur' />,
	<img src={pool} style={iconsPoiStyle} alt='piscine' />,
	<img src={skate} style={iconsPoiStyle} alt='skatepark' />,
]

class OverlayCategory extends Component {
	state = {
		data: []
	};

	componentDidMount() {
		this.getData()
	}

	getData = () => {
		const data = [];
		for (let i = 0;i < this.props.categories.length;i++) {
			data.push({
				key: i,
				categorie: this.props.categories[i],
				value: this.props.categories[i],
				icon: icons[i]
			});
		}
		this.setState({ data })
	}

	handleChange = (value) => {
		console.log(`selected ${value}`);
	}

	render() {

		const { selectedRowKeys, onSelectChange } = this.props;
		const rowSelection = {
			selectedRowKeys,
			onChange: onSelectChange,
		};

		return (
			<div style={styleLegends}>

				<div>
					<Table
						rowSelection={rowSelection}
						columns={columns}
						dataSource={this.state.data}
						pagination={false}
						bordered={false}
						size='small' />
				</div>
			</div>
		);
	}
}

export default OverlayCategory;
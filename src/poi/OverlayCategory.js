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
	<img src={school2} style={{ width: '35px', heigth: 'auto' }} alt='école' />,

	<img src={dog} style={{ width: '35px', heigth: 'auto' }} alt='caniparc' />,
	<img src={pool} style={{ width: '35px', heigth: 'auto' }} alt='piscine' />,
	<img src={heart} style={{ width: '35px', heigth: 'auto' }} alt='défibrillateur' />,
	<img src={school} style={{ width: '35px', heigth: 'auto' }} alt='école' />,

	<img src={sanisette} style={{ width: '35px', heigth: 'auto' }} alt='sanisette' />,
	<img src={shop} style={{ width: '35px', heigth: 'auto' }} alt='marché' />,
	<img src={skate} style={{ width: '35px', heigth: 'auto' }} alt='skatepark' />,

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

	render() {

		const { selectedRowKeys, onSelectChange } = this.props;
		const rowSelection = {
			selectedRowKeys,
			onChange: onSelectChange,
		};
		return (
			<div style={{ width: '300px', backgroundColor: 'white', position: 'absolute', display: 'flex', right: '15px', marginTop: '15px', padding: '15px', borderRadius: '5px', zIndex: '9999' }}>
				<Table rowSelection={rowSelection}
					columns={columns} dataSource={this.state.data} pagination={false} bordered={false} size='small' />
			</div>
		);
	}
}

export default OverlayCategory;
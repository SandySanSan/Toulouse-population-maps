import React, { Component } from 'react'
import { Table } from 'antd';


const columns = [

	{
		title: 'Catégorie',
		dataIndex: 'categorie',
	}, {
		dataIndex: 'icon',
	},
];




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
				value: this.props.categories[i]
			});
		}
		this.setState({ data })
	}



	render() {

		const { selectedRowKeys, onSelectChange } = this.props;
		const rowSelection = {
			selectedRowKeys,
			onChange: onSelectChange,
			hideDefaultSelections: true,
			// selections: [
			// 	{
			// 		key: 'all-data',
			// 		text: 'Select All Data',
			// 		onSelect: () => {
			// 			this.setState({
			// 				selectedRowKeys: [...Array(11).keys()], // 0...45
			// 			});
			// 		},
			// 	},
			// 	{
			// 		key: 'odd',
			// 		text: 'Select Odd Row',
			// 		onSelect: changableRowKeys => {
			// 			let newSelectedRowKeys = [];
			// 			newSelectedRowKeys = changableRowKeys.filter((key, index) => {
			// 				if (index % 2 !== 0) {
			// 					return false;
			// 				}
			// 				return true;
			// 			});
			// 			this.setState({ selectedRowKeys: newSelectedRowKeys });
			// 		},
			// 	},
			// 	{
			// 		key: 'even',
			// 		text: 'Select Even Row',
			// 		onSelect: changableRowKeys => {
			// 			let newSelectedRowKeys = [];
			// 			newSelectedRowKeys = changableRowKeys.filter((key, index) => {
			// 				if (index % 2 !== 0) {
			// 					return true;
			// 				}
			// 				return false;
			// 			});
			// 			this.setState({ selectedRowKeys: newSelectedRowKeys });
			// 		},
			// 	},
			// ],
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
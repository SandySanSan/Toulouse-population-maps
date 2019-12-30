import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import "antd/dist/antd.css";


const { SubMenu } = Menu;

export default class MenuMaps extends Component {

	state = {
		collapsed: false,
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		return (
			<Menu
				style={{ height: '100%' }}
				mode="inline"
				theme="dark"
			>
				<SubMenu
					key="sub1"
					title={
						<span>
							<Icon type="team" />
							<span>Population</span>
						</span>
					}
				>
					<Menu.ItemGroup key="g1">
						<Menu.Item key="1">
							<Link to='/toulouse-population'>Grands Quartiers</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Link to='/toulouse-poi'>Points d'intérêt</Link>
						</Menu.Item>
					</Menu.ItemGroup>
				</SubMenu>
				<SubMenu
					key="sub2"
					title={
						<span>
							<Icon type="cloud" theme='filled' />
							<span>Environnement</span>
						</span>
					}
				>
					<Menu.ItemGroup key="g2">
						<Menu.Item key="3">
							<Link to='/toulouse-meteo'>
								Stations Météo
							</Link>
						</Menu.Item>
					</Menu.ItemGroup>
				</SubMenu>
			</Menu>
		);
	}
}
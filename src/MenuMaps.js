import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import "antd/dist/antd.css";


const { SubMenu } = Menu;

export default class MenuMaps extends Component {

	handleClick = e => {
		console.log('click ', e);
	};

	render() {
		return (
			<Menu
				onClick={this.handleClick}
				style={{ height: '100%' }}
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode="inline"
				theme="dark"
			>
				<SubMenu
					key="sub1"
					title={
						<span>
							<Icon type="mail" />
							<span>Population</span>
						</span>
					}
				>
					<Menu.ItemGroup key="g1">
						<Menu.Item key="1"><Link to='/toulouse-population'>Répartition</Link></Menu.Item>
						<Menu.Item key="interet"><Link to='/toulouse-poi'>Points d'intérêt</Link></Menu.Item>

					</Menu.ItemGroup>

				</SubMenu>
				<SubMenu
					key="sub2"
					title={
						<span>
							<Icon type="appstore" />
							<span>Environnement</span>
						</span>
					}
				>
					<SubMenu key="sub3" title="Météo">
						<Menu.Item key="7"><Link to='/toulouse-meteo'>Stations Météo</Link></Menu.Item>
						<Menu.Item key="8">Prévisions</Menu.Item>
					</SubMenu>
				</SubMenu>

			</Menu>
		);
	}
}
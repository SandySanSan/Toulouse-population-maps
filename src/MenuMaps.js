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
							<span>Recensement</span>
						</span>
					}
				>
					<Menu.ItemGroup key="g1">
						<Menu.Item key="1"><Link to='/toulouse-population'>Population</Link></Menu.Item>
						<Menu.Item key="2">Logement</Menu.Item>
						<Menu.Item key="3">Activité</Menu.Item>

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
					<Menu.Item key="5">Arbres d'alignement</Menu.Item>
					<SubMenu key="sub3" title="Météo">
						<Menu.Item key="7">Stations Météo</Menu.Item>
						<Menu.Item key="8">Prévisions</Menu.Item>
					</SubMenu>
				</SubMenu>
				<SubMenu
					key="sub4"
					title={
						<span>
							<Icon type="setting" />
							<span>Citoyenneté</span>
						</span>
					}
				>
					<Menu.Item key="interet"><Link to='/toulouse-poi'>Points d'intérêt</Link></Menu.Item>
				</SubMenu>
			</Menu>
		);
	}
}
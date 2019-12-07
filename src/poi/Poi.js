import React, { Component } from 'react'
import poiData from '../data/poi-toulouse.json'
import StaticMap from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { IconLayer } from '@deck.gl/layers';
import { MAPBOX_TOKEN, INITIAL_VIEW_STATE } from '../utils'
import atlas from '../images/atlas.png'

const ICON_MAPPING = {
	dogBrown: { x: 0, y: 0, width: 95, height: 96, mask: false },
	dogGreen: { x: 96, y: 0, width: 95, height: 96, mask: false },
	pool: { x: 186, y: 0, width: 95, height: 96, mask: false },
	skate: { x: 278, y: 0, width: 95, height: 96, mask: false },
	heart: { x: 372, y: 0, width: 95, height: 96, mask: false },
	shop: { x: 465, y: 0, width: 95, height: 96, mask: false },
	toilets: { x: 557, y: 0, width: 95, height: 96, mask: false },

};

class Poi extends Component {
	state = {
		viewport: {
			width: '100%',
			height: window.innerHeight - 115
		},
		categories: [],
		x: 0,
		y: 0,
		hoveredObject: null,
		expandedObjects: null
	}


	componentDidMount() {
		this.processCategory()
	}


	_renderLayers() {
		return [
			new IconLayer({
				id: 'icon-layer',
				data: poiData,
				pickable: true,
				iconAtlas: atlas,
				iconMapping: ICON_MAPPING,
				getIcon: d => {
					if (d.categorie.includes('Distributeur')) {
						return 'dogBrown'
					}
					if (d.categorie.includes('Caniparc')) {
						return 'dogGreen'
					}
					if (d.categorie.includes('Piscine')) {
						return 'pool'
					}
					if (d.categorie.includes('Skate')) {
						return 'skate'
					}
					if (d.categorie.includes('Marché')) {
						return 'shop'
					}
					if (d.categorie.includes('Sanisette')) {
						return 'toilets'
					}
				},
				sizeScale: 10,
				getPosition: d => d.shape.coordinates,
				getSize: d => 5,
				anchorY: 'bottom',
				onHover: info => this.setState({
					hoveredObject: info.object,
					pointerX: info.x,
					pointerY: info.y
				})
				// getColor: d => [Math.sqrt(d.exits), 140, 0],
				// onHover: ({object, x, y}) => {
				//   const tooltip = `${object.name}\n${object.address}`;
				//   /* Update tooltip
				// 	 http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
				//   */
				// }
			})
		]
	}

	_onHover = (info) => {
		if (this.state.expandedObjects) {
			return;
		}

		const { x, y, object } = info;
		this.setState({ x, y, hoveredObject: object });
	}

	_onClick = (info) => {
		const { x, y, object } = info;

		if (object) {
			this.setState({ x, y, expandedObjects: [object] });
		} else {
			this._closePopup();
		}
	}
	_closePopup = () => {
		if (this.state.expandedObjects) {
			this.setState({ expandedObjects: null, hoveredObject: null });
		}
	}

	_renderhoveredItems = () => {
		const { x, y, hoveredObject, expandedObjects } = this.state;

		if (expandedObjects) {
			return (
				<div className="tooltip interactive"
					style={{
						left: x, top: y, backgroundColor: 'white',
						position: 'absolute', zIndex: 9999, padding: '20px', borderRadius: '5px', width: '300px'
					}}>
					{expandedObjects.map(({ nom, descriptif, adresse, categorie, shape }) => {
						return (
							<div key={nom}>
								<h5>{descriptif}</h5>
								<div>Adresse: {adresse}</div>
								<div>Catégorie: {categorie}</div>
							</div>
						);
					})}
				</div>
			);
		}

		if (!hoveredObject) {
			return null;
		}

		return (
			<div className="tooltip" style={{ left: x, top: y }}>
				<h5>
					{hoveredObject.name} {hoveredObject.year ? `(${hoveredObject.year})` : ''}
				</h5>
			</div>
		);
	}


	// tableau des catégories
	processCategory = () => {
		const categories = []
		poiData
			.map(poi => {
				return !categories.includes(poi.categorie) && categories.push(poi.categorie)
			})
		this.setState({ categories })
	}


	render() {
		const { viewport } = this.state
		return (
			<div style={{ display: 'flex' }}>
				<DeckGL
					layers={this._renderLayers()}
					initialViewState={INITIAL_VIEW_STATE}
					controller
					{...viewport}
					onViewportChange={this._onViewportChange}
					onClick={this._onClick}

				>
					<StaticMap
						preventStyleDiffing={true}
						mapboxApiAccessToken={MAPBOX_TOKEN}
						mapStyle="mapbox://styles/sandymapb/ck3bz48b71p891clftf18pvna"
					/>
					{this._renderhoveredItems()}
				</DeckGL>
			</div>
		);
	}
}

export default Poi;
import React, { Component } from 'react'
import poiData from '../data/poi-toulouse.json'
import StaticMap from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { IconLayer } from '@deck.gl/layers';
import { MAPBOX_TOKEN, INITIAL_VIEW_STATE } from '../utils'
import atlas from '../images/atlas.png'

const ICON_MAPPING = {
	dogBrown: { x: 0, y: 0, width: 95, height: 96, mask: false },
	dogGreen: { x: 96, y: 0, width: 95, height: 96, mask: false }

};

class Poi extends Component {
	state = {
		viewport: {
			width: '100%',
			height: window.innerHeight - 115
		},
		categories: []
	}

	_renderLayers() {
		return [
			new IconLayer({
				id: 'icon-layer',
				data: poiData,
				pickable: true,
				// iconAtlas and iconMapping are required
				// getIcon: return a string
				iconAtlas: atlas,
				iconMapping: ICON_MAPPING,
				getIcon: d => 'dogGreen',

				sizeScale: 10,
				getPosition: d => d.shape.coordinates,
				getSize: d => 5,
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

	componentDidMount() {
		this.processCategory()
	}


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
				>
					<StaticMap
						preventStyleDiffing={true}
						mapboxApiAccessToken={MAPBOX_TOKEN}
						mapStyle="mapbox://styles/sandymapb/ck3bz48b71p891clftf18pvna"
					/>
				</DeckGL>
			</div>
		);
	}
}

export default Poi;
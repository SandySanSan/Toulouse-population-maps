import React, { Component } from 'react'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { PolygonLayer } from '@deck.gl/layers'
import { styleToolTip } from './style'

let data = require('../data/population-toulouse-2012.json');
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
	longitude: 1.433333,
	latitude: 43.600000,
	width: 400,
	height: 400,
	zoom: 11.2,
	minZoom: 10,
	maxZoom: 16,
	pitch: 20,
	bearing: 0
};


class Population2012 extends Component {
	state = {
		viewport: {
			width: '100%',
			height: window.innerHeight - 130,
		}
	}

	_renderTooltip() {
		const { hoveredObject, pointerX, pointerY } = this.state || {};
		return hoveredObject && (
			<div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX + 15, top: pointerY }}>
				<div style={styleToolTip}>
					<p>Quartier :</p>
					<p>{hoveredObject.libelleQuartier}</p>
				</div>
			</div>
		);
	}

	_renderLayers() {
		return [
			new PolygonLayer({
				id: 'polygon-layer',
				data,
				pickable: true,
				extruded: true,
				autoHighlight: true,
				stroked: false,
				filled: true,
				wireframe: true,
				lineWidthMinPixels: 1,
				getPolygon: d => d.coordinates,
				getElevation: d => d.population / 5,
				getFillColor: d => [d.population / 60, 140, 0],
				getLineColor: [100, 100, 100],
				getLineWidth: 1,
				onHover: info => this.setState({
					hoveredObject: info.object,
					pointerX: info.x,
					pointerY: info.y
				})

			})]

	}

	render() {




		return (
			<div style={{ 'left': '200px' }}>
				<DeckGL
					layers={this._renderLayers()}
					initialViewState={INITIAL_VIEW_STATE}
					controller
					{...this.state.viewport}

				>
					<StaticMap
						preventStyleDiffing={true}
						mapboxApiAccessToken={MAPBOX_TOKEN}
						mapStyle="mapbox://styles/mapbox/light-v9"
					/>
				</DeckGL>
				{this._renderTooltip()}
			</div>
		);
	}
}

export default Population2012;
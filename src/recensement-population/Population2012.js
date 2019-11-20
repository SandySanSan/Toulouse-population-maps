import React, { Component, Fragment } from 'react'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { GeoJsonLayer, PolygonLayer } from '@deck.gl/layers'
import { LightingEffect, AmbientLight, _SunLight as SunLight } from '@deck.gl/core'
import { scaleThreshold } from 'd3-scale'
let data = require('../data/population2012-tls.json');

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const INITIAL_VIEW_STATE = {
	longitude: 1.433333,
	latitude: 43.600000,
	zoom: 12.5,
	minZoom: 6,
	maxZoom: 16,
	pitch: 50,
	bearing: 0
};

class Population2012 extends Component {
	state = {
	}


	componentDidMount() {
		this.getCoordinates()
	}

	getCoordinates = () => {
		const coordinates = data.map(quartier => ({ coordinates: quartier.fields.geo_shape.coordinates }))
		console.log(data)
	}

	_renderTooltip() {
		const { hoveredObject, pointerX, pointerY } = this.state || {};
		return hoveredObject && (
			<div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX + 15, top: pointerY }}>
				{hoveredObject.fields.libgq}
			</div>
		);
	}

	render() {

		const layer = new PolygonLayer({
			id: 'polygon-layer',
			data,
			pickable: true,
			extruded: true,
			stroked: true,
			filled: true,
			wireframe: true,
			lineWidthMinPixels: 1,
			getPolygon: d => d.fields.geo_shape.coordinates,
			getElevation: d => d.fields.p12_pop / 10,
			getFillColor: d => [d.fields.p12_pop / 60, 140, 0],
			getLineColor: [80, 80, 80],
			getLineWidth: 1,
			onHover: info => this.setState({
				hoveredObject: info.object,
				pointerX: info.x,
				pointerY: info.y
			})

		});



		return (
			<Fragment>
				<DeckGL
					layers={layer}
					initialViewState={INITIAL_VIEW_STATE}
					controller
				>
					<StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} />
				</DeckGL>
				{this._renderTooltip()}
			</Fragment>
		);
	}
}

export default Population2012;
export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

export const INITIAL_VIEW_STATE = {
	longitude: 1.433333,
	latitude: 43.600000,
	zoom: 12,
	minZoom: 8,
	maxZoom: 18,
	pitch: 60,
	bearing: 0,
	padding: [100, -100]
};

export const STATIONS = [
	'00-station-meteo-valade',
	'01-station-meteo-meteopole',
	'04-station-meteo-ile-empalot',
	'05-station-meteo-piscine-nakache',
	'07-station-meteo-avenue-de-grande-bretagne',
	'08-station-meteo-basso-cambo',
	'08-station-meteo-basso-cambo',
	'15-station-meteo-union',
	'19-station-meteo-mondouzil',
	'25-station-meteo-tournefeuille',
	'61-station-meteo-blagnac-centre',
	'62-station-meteo-parc-maourine',
]

export const nameStations = STATIONS.map(station => station.slice(0, 17))
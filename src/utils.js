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

export const DATA_POI_URL = `https://data.toulouse-metropole.fr/api/records/1.0/search/?dataset=07-station-meteo-avenue-de-grande-bretagne&sort=record_timestamp`

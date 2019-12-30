
export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

export const INITIAL_VIEW_STATE = {
	longitude: 1.433333,
	latitude: 43.600000,
	zoom: 12,
	minZoom: 8,
	maxZoom: 18,
	pitch: 0,
	bearing: 0,
	padding: [100, -100],
	width: '100%',


};

export const STATIONS = [
	'00-station-meteo-valade',
	'01-station-meteo-meteopole',
	'02-station-meteo-marengo',
	'03-station-meteo-busca',
	// '04-station-meteo-ile-empalot',
	// '05-station-meteo-piscine-nakache',
	// '07-station-meteo-avenue-de-grande-bretagne',
	// '08-station-meteo-basso-cambo',
	// '09-station-meteo-la-salade',
	// '10-station-meteo-castelginest',
	// '11-station-meteo-soupetard',
	// '12-station-meteo-montaudran',
	// '13-station-meteo-pech-david',
	// '14-station-meteo-centre-pierre-potier',
	// '15-station-meteo-union',
	// '17-station-meteo-fenouillet',
	// '18-station-meteo-brax',
	// '19-station-meteo-mondouzil',
	// '22-station-meteo-colomiers-za-perget',
	// '23-station-meteo-pibrac-bouconne',
	// '24-station-meteo-colomiers-zi-enjacca',
	// '25-station-meteo-tournefeuille', // fichier cassé
	// '27-station-meteo-saint-cyprien',
	// '28-station-meteo-carmes',
	// '36-station-meteo-purpan',
	// '37-station-meteo-universite-paul-sabatier',
	// '38-station-meteo-parc-jardin-des-plantes',
	// '40-station-meteo-thibaud-eiffage',
	// '41-station-meteo-avenue-de-casselardit',
	// '42-station-meteo-parc-compans-cafarelli',
	// '49-station-meteo-cote-pavee',
	// '51-station-meteo-lardenne',
	// '53-station-meteo-ponsan',
	// '61-station-meteo-blagnac-centre',
	// '62-station-meteo-parc-maourine',
]

export const nameStations = STATIONS.map(station => station.slice(0, 17))

const fs = require('fs')

const stationsJson = require('./stations-meteo-en-place.json')
const stationsData = stationsJson.map(station => ({
	name: station.fields.good_name,
	coordinates: station.geometry.coordinates,
	id: station.fields.id_good
}))

const station = JSON.stringify(stationsData, null, 2);
fs.writeFileSync('stations-coord-toulouse.json', station)

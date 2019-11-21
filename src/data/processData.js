const fs = require('fs')

const data2012 = require('./population2012-tls.json')

const dataPop2012 = data2012
	.map(quartier => ({
		coordinates: quartier.fields.geo_shape.coordinates,
		libelleQuartier: quartier.fields.libgq,
		population: quartier.fields.p12_pop
	}))
const population2012 = JSON.stringify(dataPop2012, null, 2);
fs.writeFileSync('population-toulouse-2012.json', population2012)

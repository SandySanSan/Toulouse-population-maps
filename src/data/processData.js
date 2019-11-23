const fs = require('fs')

const data2012 = require('./population-tls-2012.json')

const dataPop2012 = data2012
	.map(quartier => ({
		libelleQuartier: quartier.fields.libgq,
		population: quartier.fields.p12_pop,
		pop0014: quartier.fields.p12_pop0014,
		pop1529: quartier.fields.p12_pop1529,
		pop3044: quartier.fields.p12_pop3044,
		pop4559: quartier.fields.p12_pop4559,
		pop6074: quartier.fields.p12_pop6074,
		pop75p: quartier.fields.p12_pop75p,
		coordinates: quartier.fields.geo_shape.coordinates,

	}))
const population2012 = JSON.stringify(dataPop2012, null, 2);
fs.writeFileSync('population-toulouse-2012.json', population2012)

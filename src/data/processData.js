const fs = require('fs')

const data2011 = require('./population-tls-2011.json')

const dataPop2011 = data2011
	.map(quartier => ({
		libelleQuartier: quartier.fields.libgq,
		population: quartier.fields.p11_pop,
		pop0014: quartier.fields.p11_pop0014,
		pop1529: quartier.fields.p11_pop1529,
		pop3044: quartier.fields.p11_pop3044,
		pop4559: quartier.fields.p11_pop4559,
		pop6074: quartier.fields.p11_pop6074,
		pop75p: quartier.fields.p11_pop75p,
		coordinates: quartier.fields.geo_shape.coordinates,

	}))
const population2011 = JSON.stringify(dataPop2011, null, 2);
fs.writeFileSync('population-toulouse-2011.json', population2011)

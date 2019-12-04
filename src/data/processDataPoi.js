const fs = require('fs')

const poiJson = require('./points-dinteret.json')

const poiData = poiJson
	.filter(poi => /Sanisette|Marché|wifi|Patinoire|Piscine|Caniparc|Skatepark|déjections/.test(poi.fields.categorie))
	.map(poi => ({
		nom: poi.fields.nom,
		descriptif: poi.fields.descriptif,
		adresse: poi.fields.adresse,
		id: poi.fields.poi_id,
		shape: poi.fields.geo_shape,
		categorie: poi.fields.categorie

	}))


const poi = JSON.stringify(poiData, null, 2);
fs.writeFileSync('poi-toulouse.json', poi)

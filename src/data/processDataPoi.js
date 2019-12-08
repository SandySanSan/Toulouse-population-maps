const fs = require('fs')

const poiJson = require('./points-dinteret.json')

const poiData = poiJson
	.filter(poi => /Sanisette|Marché|Piscine|Caniparc|Skatepark|Ecole|Défibrillateur/.test(poi.fields.categorie))
	.filter(poi => /Toulouse|TOULOUSE/.test(poi.fields.commune))
	.map(poi => ({
		nom: poi.fields.nom,
		descriptif: poi.fields.descriptif,
		adresse: poi.fields.adresse,
		id: poi.fields.poi_id,
		shape: poi.fields.geo_shape,
		categorie: poi.fields.categorie,
		commune: poi.fields.commune

	}))


const poi = JSON.stringify(poiData, null, 2);
fs.writeFileSync('poi-toulouse.json', poi)

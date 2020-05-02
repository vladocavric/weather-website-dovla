const request = require('request');
const mapboxToken = process.env.MAPBOXTOKEN;
const geocode = (place, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxToken}-ThAw&limit=1`;
    request({url, json: true}, (err, res) => {
        if (err) {
            callback(err, undefined)
        } else if (res.body.features.length === 0) {
            callback(undefined, 'we did not find pelace withi this name')
        } else {
            const geoData = {
                lat: res.body.features[0].center[1],
                lon: res.body.features[0].center[0],
                city: res.body.features[0].place_name,
            }
            callback(undefined, geoData)
        }
    })
}

module.exports = geocode;
const request = require('request')
const myMapboxKey = 'pk.eyJ1IjoibGFhdG9ra2EiLCJhIjoiY2s4dTBtcGhqMDN2dDNobHNteGZ2eTZqMCJ9.e3ZSm3YPe3VBanZyUyuQZQ'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${myMapboxKey}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Check your search terms!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode



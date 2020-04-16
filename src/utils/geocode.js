const request = require ('request');



const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1Ijoia2VyZW5nYSIsImEiOiJjazhvZTZrZXIwM3prM2ZwczlicHRuazZwIn0.MgpTjWdJUNikhvM9G1y8Lg`;
    request({ url, json: true}, (error, {body} ) => {
        if (error) {
            callback('unable to connect to location');
        } else if (body.message || body.features.length ===0 ) {
            callback('Something went wrong. Please try again',undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
};


module.exports = geocode;

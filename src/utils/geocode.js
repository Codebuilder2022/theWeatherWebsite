const request = require('request')

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2F1c2hpa2siLCJhIjoiY2tlZnZjdHduMGFlbTJzdGI1dG44Z2NrdyJ9.FhRywJdNVVUE3X-Q8mhW3Q'
    request({ url:url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to Connect to location Services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }else{

            callback("", {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geoCode
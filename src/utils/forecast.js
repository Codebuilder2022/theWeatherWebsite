const request = require('request')

const forecast = (latitude, longtitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=b71d962d81378ca9bbe873a1f56d8e56&query='+ latitude +',' + longtitude + '&units=m'
    
    request({ url, json:true}, (error, {body} ) => {
        if(error){
            callback('Unable to connect to location Services!', undefined)
        }else if(body.error){
            callback('Unable to find location.', undefined)
        }else{
            // callback("", '\n'+ body.location.localtime + ' '+
            // body.current.weather_descriptions+ '\n' +
            // body.current.weather_icon +
            // '\n '+ body.current.temperature+ '\n' +
            // 'It feels like '+ body.current.feelslike + ' degrees out.')

            callback("", {
                temperature: body.current.temperature,
                description: body.current.weather_descriptions,
                time: body.location.localtime,
            })
        }
    })
}

module.exports = forecast
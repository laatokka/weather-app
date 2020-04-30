const request = require('request')

//Put here your api key to WeatherStack:
const weatherStackApi = ""

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${weatherStackApi}&query=${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Something went wrong in retreiving the location...', undefined)
        } else {
            const data = body.current
            const weather = {
                forecast: data.weather_descriptions[0],
                temperature: data.temperature,
                rainChance: data.precip,
                feelsLike: data.feelslike
            }

            console.log(data)
            callback(undefined, weather)

        }
    })
}

module.exports = forecast


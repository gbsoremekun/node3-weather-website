const request = require('request')

const forecast = (latitude, longitude, callback ) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=a9db57ca0b6d25b64ab457fbd3304679&query=' + latitude + ',' + longitude + '&units=f'
    
    request({ url, json: true}, (error, { body }) => {

    if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            const weatherDesc = body.current.weather_descriptions[0]
            const humidity = body.current.humidity
            callback(undefined,`${weatherDesc}. It is currently ${temp} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}%`)
        }
    })

}

module.exports = forecast
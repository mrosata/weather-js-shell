/**
 * Get the weather for the local area using the Open Weather API
 * API.
 *
 * Sign up for a free key:
 *    http://openweathermap.org/appid
 *
 */
const request = require("request")

const api = {
  key: 'WEATHER_API_KEY',
  long: 'WEATHER_API_LONG',
  lat: 'WEATHER_API_LAT'
}

// Variables for building the API request
let weatherKey = process.env[api.key]
let areaLong = process.env[api.long] || -71.4058
let areaLat = process.env[api.lat] || 42.0935
let apiEndPoint = 'api.openweathermap.org/data/2.5/weather'


request({
    uri: `http://${apiEndPoint}?lon=${areaLong}&lat=${areaLat}&APPID=${weatherKey}`,
  },

  function(err, resp, body) {
    if (err) {
      console.warn(err)
      console.exit(1)
    }

    let weather = JSON.parse(body)
    reportWeather(weather)

  })


/**
 * Parse the weather report into a
 * string and print to standard output.
 *
 * @param data - weather api response
 */
function reportWeather(data) {
  let reports = [].concat(data.weather)
    reports = data.weather
      .map(w => `${w.main} ${w.description}`)
      .join(', ')

  let report =
        `Local Weather: ${data.weather[0].description} \n` +
        `Current Temp: ${data.main.temp}\n` +
        `High: ${data.main.temp_min} Low: ${data.main.temp_min} ` +
        `Humidity: ${data.main.humidity}\n` +
        `Wind speed: ${data.wind.speed}`

  console.log(report)
}


/**
 * Get the weather for the local area using the Open Weather API
 * API.
 *
 * Sign up for a free key:
 *    http://openweathermap.org/appid
 *
 */
const request = require('request'),
      chalk = require('chalk')


const label = (text) =>
  chalk.bgBlack.yellow.bold(text)
const regular = (text) =>
  chalk.bgBlack.white(text)
const colorTemp = (temp) => {
  if (temp < 20)
    return chalk.bold.bgBlue.white(temp)
  else if (temp < 32)
    return chalk.bold.bgWhite.blue(temp)
  else if (temp < 60)
    return chalk.bold.blue(temp)
  else if (temp < 72)
    return chalk.bgBlack.yellow(temp)
  else if (temp < 82)
    return chalk.bold.magenta(temp)
  else if (temp < 90)
    return chalk.red(temp)
  else if (temp < 100)
    return chalk.bold.bgWhite.red(temp)
  else
    return chalk.bold.bgMagenta.red(temp)
}
const windSpeed = (speed) => {
  if (speed < 3)
    return chalk.white(speed)
  else if (speed < 5)
    return chalk.bold.yellow(speed)
  else if (speed < 10)
    return chalk.bold.magenta(speed)
  else if (speed < 20)
    return chalk.bold.bgMagenta.red(speed)
  else
    return chalk.bold.bgYellow.red(speed)
}

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
    uri: `http://${apiEndPoint}?lon=${areaLong}&lat=${areaLat}&units=imperial&APPID=${weatherKey}`,
  },

  function(err, resp, body) {
    if (err) {
      console.warn(err)
      console.exit(1)
    }

    let weather = JSON.parse(body)
    console.log(reportWeather(weather))
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

  return '' +
    `${label('Local Weather: ')}${regular(reports)} \n` +
    `${label('Current Temp: ')}${regular(data.main.temp)}\n` + 
    `${label('High: ')}${colorTemp(data.main.temp_min)} `  +
    `${label('Low: ')}${colorTemp(data.main.temp_min)} ` +
    `${label('Humidity: ')}${colorTemp(data.main.humidity)}\n` +
    `${label('Wind speed: ')}${windSpeed(data.wind.speed)}`
}

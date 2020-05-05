const request = require('request');
const owapikey = process.env.OWAPIKEY;
const forecast = (lat, lon, callback) =>{
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${owapikey}`;
    const smallUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    request({url, json: true}, (err, res) => {
        if(err){
            callback(err, undefined)
        } else {
            const data = {
                smallUrl,
                data: res
            }
            // console.log(smallUrl)
            callback(undefined, data)

        }
    })
}

module.exports = forecast;
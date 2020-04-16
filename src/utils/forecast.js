const request = require ('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2f04e44a0a8771de18374a16334f92b5&units=metric`;
    request({url, json: true}, (error, {body}) => {
     if (error) {
         callback('Unable to connect to weather forecast.');
     } else if (body.message) {
         callback('Something went wrong. Please try again');
     } else {
        callback(undefined, `It is currently ${body.main.temp} degrees out. Looks like ${body.weather[0].description}.`);
     }
 });
};

module.exports = forecast;

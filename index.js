const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// render HTML
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
});

// Run Logic
app.post('/', function(req, res){

    const apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    const appId = "8f4b4662df3d8a9aa95c7d52a3535d96";
    const cityName = req.body.cityName;
    const url = apiEndpoint + "appid=" + appId + "&q=" + cityName+ "&units=metric";
    https.get(url, function(apiResponse){
        console.log(apiResponse)
        apiResponse.on("data", function(data){   // run this function once data is received
            const weatherData = JSON.parse(data) // convert data to JSON type

            // fetch required data
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            // send response
            res.write("<h1> The temperature in Mumbai is " + temp + "<sup>o</sup>C</h1>");
            res.write("<p> The weather description is " + weatherDescription + "</p>");
            res.write("<img src=" + iconURL + ">");
            res.send();
        })
    })
})

// run the app on the local host port 3000
app.listen(3000, function(){
    console.log('The Server is up and running!')
})
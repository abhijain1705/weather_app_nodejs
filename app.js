const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const port = 9080
const app = express()

var tempInput = ""
var countryInput = ""
var imgURl = ""
var cityInput = ""

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("app", {
        temperature: "Temp°C",
        city : "City",
        country: "Cn",
        imgSrc: ""
    })
})

app.post("/", (req, res) => {
    cityInput = req.body.cityName
    var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=29c207f82c7822a2b27aabc787140e6d&units=metric`
    https.get(weatherURL, (response) => {
        console.log(response.statusCode)
        response.on("data", function(data) {
            var weatherData = JSON.parse(data)
            tempInput = weatherData.main.temp
            countryInput = weatherData.sys.country
            var imgIcon = weatherData.weather[0].icon
            imgURl = `https://openweathermap.org/img/wn/${imgIcon}@2x.png`
            res.render("app", {
                temperature: tempInput + "°C",
                city : cityInput,
                country: countryInput,
                imgSrc: imgURl
            })
        })
    })
})

app.listen(port , function(req, res) {
    console.log(`Server is listening ${port}`)
})
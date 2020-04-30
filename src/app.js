//Some Basic Express server
//Begin...
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utilities/geocode')
const forecast = require('./utilities/forecast')

const app = express()

//Define paths for Express configuration
const viewsPath = path.join(__dirname, "../templates/views")
const publicDirectory = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "M L"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Helping those in need",
        name: "M L"
    })
})

app.get('/help/*', (req, res) => {
    res.render("404_page", {
        title: "Help article not found.",
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About M",
        name: "M L"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send("No location provided.")
    }

    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location
            })

        })  

    })

})

app.get('*', (req, res) => {
    res.render("404_page", {
        title: "Page not found",
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

//... End
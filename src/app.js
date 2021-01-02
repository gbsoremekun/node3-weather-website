const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lou Soremekun'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lou Soremekun'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'For help please contact Lou Soremekun',
        title: 'Help',
        name: 'Lou Soremekun'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    const address = req.query.address
    
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            }) 
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error    
                })
            }

            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })   
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: 'Help article not found',
        title: 'Error',
        name: 'Lou Soremekun'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        message: 'Page not found',
        title: 'Error',
        name: 'Lou Soremekun'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})



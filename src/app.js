const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicPath =path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))

app.get('', (req,res)=>{
    res.render('index', {
        "title": "Find your weather..",
        "name": "CodeBuilder"
    })

})

app.get('/about', (req,res)=>{
    res.render('about',{
        "title":"Kaushik Kumaran",
        "name": "CodeBuilder"
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        "title":"Find help here.",
        "name":"CodeBuilder"
    })
})

app.get('/weather', (req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error: 'Please provide an Address!'
        })
    }
    
    geoCode(req.query.address, (error, { latitude , longtitude, location} = {} ) => {
        if(error){
        return res.send({
            error
        })
        }

        forecast(latitude, longtitude, (error, {temperature, description, time} = {}) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                location: location ,
                forecastTemp : temperature,
                forecastDescription : description,
                forecastTime: time,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404.hbs', {
    "errorTitle":"Oops! The page you requested does not exist.",
    "errorMessage":"Help page not found."
    })
})


app.get('*', (req, res)=>{
    res.render('404', {
        "errorTitle":"Oops! The page you requested does not exist.",
        "errorMessage":"Page not found. :("
        })
})

app.listen(3000, () =>{
    console.log("Server is up and running.")
})



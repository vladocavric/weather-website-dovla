const path = require('path')
const express = require('express');
const app = express();
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//=================================================================

app.set('views', path.join(__dirname, '../templates/views')) // ovako podesavamo put do views fodera ako se nalazi na nekom drugom mestu ili ako mu menjamo ime
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
app.set('view engine', 'hbs');
// app.set('view engine', 'ejs'); // ovo se koristi ako su template-i ejs, isto tako mogu da budu i tweeg itd
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static('public'));  - ovaj gore metod je sigurniji

//=================================================================

//=================================================================
// ROUTES

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        autor: 'Vlado Čavrić'
    })
});

// app.post('/', (req, res) => {
//     console.log(req.body)
    // let address = req.body.address
    // res.redirect('/help', {adress: address})
    // console.log(address)
// });


app.get('/novo', (req, res) => {
    res.render('novo', {
        title: 'Novo',
        autor: 'Vlado Čavrić'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        autor: 'Vlado Čavrić'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        autor: 'Vlado Čavrić'
    })
});

app.get('/weatherfromcords', (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon
    if (!req.query.lat || !req.query.lon) {
        return res.send({
            error: 'You mast provide a latitude and longitude'
        })
    }
    forecast(lat, lon, (err, data) => {
        if (err) {
            res.send(err)
        } else if (data) {
            res.send({
              
                forcast: data.data.body.main,
                city: data.data.body.name,
                // city2: geoData.city,
                // address: req.query.address,
                url: data.smallUrl
            })
            
        } else {
            res.send({geoData})
            // console.log(geoData)
        }
    })

});

app.get('/weather', (req, res) => {
    // let forcast = {
    //     temp: 26,
    //     maxTemp: 35,
    //     minTemp: 20,
    //     wind: 10,
    //     cloudy: 'clear',
    //     addresse: req.query.address,
    //     chacnceOfRain: 10
    // }
    const place = req.query.address;
    if (!req.query.address) {
        return res.send({
            error: 'You mast provide a address'
        })
    }
    geocode(place, (err, geoData) => {
        if (err) {
            res.send({
                error: 'Something went wrong'
            })
        } else {
            forecast(geoData.lat, geoData.lon, (err, data) => {
                if (err) {
                    res.send(err)
                } else if (data) {
                    res.send({
                        forcast: data.data.body.main,
                        city: data.data.body.name,
                        city2: geoData.city,
                        address: req.query.address,
                        url: data.smallUrl
                    })
                    
                } else {
                    res.send({geoData})
                    // console.log(geoData)
                }
            })
        }
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You mast provide a search term'
        })
    }
    res.send({products: []})
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        class: 'not-found',
        message: 'help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        class: 'not-found',
        message: 'page not found'
    })
});

//=================================================================

const port = process.env.PORT || 3005;
console.log(port)
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`ovo cudo radi na portu ${port}`)
    }
})

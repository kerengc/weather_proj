const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;

//define path for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const instance = '<h1>headergal</h1>';

//set handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
//hbs.registerPartial('header', fs.readFileSync('/Users/keren/WebstormProjects/keren/node-course/webserver/templates/partials/header.hbs', 'utf8'));

///Users/keren/WebstormProjects/keren/node-course/webserver/templates/partials


//setup static directory to serve
app.use(express.static(publicDir));



// how to use app.get -> app.get('route', function with 2 arguements - request (what is received)  and response (what should be rendered and sent back));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'KGC'
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'KGC'
    });
});

app.get('/help', (req, res) => {
   res.render('help', {
       message: 'this is to help you',
       title: 'Help',
       name: 'KGC'
   })
});

app.get('/weather',(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error});
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            return res.send({
               address: req.query.address,
               location,
               forecast: forecastData
            })
        })
    });
});




// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({products: []});
// });


app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'KGC',
        message: 'Help article not found'
    }
    )
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'KGC',
        message: 'Page not found'
    });
});

app.listen(port, () => {
    console.log(`listening on ${port}`)
});


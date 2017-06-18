const express = require('express');
const hbs = require('hbs');

var app = express();

//Setup for partials (used for footers & headers in multiple files)
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>  { //only done after next is called.
    var now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`);
    next();
});

// Helper for the partials
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!'
    });
});



app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to make request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

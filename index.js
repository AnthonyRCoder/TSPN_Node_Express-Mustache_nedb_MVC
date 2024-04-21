const express = require('express');
const app = express();
require('dotenv').config() // loads data from .env file


const cookieParser = require('cookie-parser')
app.use(cookieParser())

// Middleware
app.use(express.urlencoded({ extended: true}));
const path = require('path');
const public = path.join(__dirname,'public');
app.use(express.static(public));


app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

//const router = require('./routes/guestbookRoutes');
const itemRoutes = require('./routes/itemRoutes');
// Mount routes
app.use('/', itemRoutes);
//app.use('/', router);


app.listen(process.env.PORT ||3000, () => {
    console.log('Server started. Ctrl^c to quit.');
    })  

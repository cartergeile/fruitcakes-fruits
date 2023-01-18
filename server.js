////////////////////////////
// Import dependencies //
///////////////////////////
const express = require('express') // import the express framework
// we dont need mongoose dependency anymore
// just comment it out
// const mongoose = require('mongoose') // import the mongoose library
const morgan = require('morgan') // import the morgan request logger
require('dotenv').config() // load my env files's variables
const path = require('path') // import path module
const FruitRouter = require('./controllers/fruitControllers') 
const middleware = require('./utils/middleware')

////////////////////////////////////
// Create our Express App Object //
///////////////////////////////////
const app = express()

////////////////////////////////////
// Middleware                    //
///////////////////////////////////
// middleware runs before all the routes
// every request is processed through middleware before mongoose can do anything with it
// our middleware is now processed by a function in the utils directory. this function takes one argument, app, and processes requests through our middleware
middleware(app)


////////////////////////////////////
// Routes                        //
///////////////////////////////////
app.get('/', (req,res) => {
  res.send('Server is live, ready for requests')
})

// this is now where we register our routes, this is how server.js knows to send the correct response
// app.use, when we register a route, needs two args
// first arg -> base URL
// second arg -> file to use
app.use('/fruits', FruitRouter)

////////////////////////////////////
// Server Listener               //
///////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END
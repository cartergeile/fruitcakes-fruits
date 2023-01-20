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
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')


////////////////////////////////////
// Create our Express App Object //
///////////////////////////////////
// this was fine for building an API that sends and recieves json
//const app = express()
// but now, our app is going to be full-stack, that means handling front and back end from the same server(in this case)
// so were utilizing and npm package `liquid-express-views` to add the 'view' layer to our MVC framework
// in short, we need to update out app object and tell it to use that package as stated by the documentation
const app = require('liquid-express-views')(express())
// what liquid-express-views really does for us, is make it easy to path to our .liquid files(which will serve our html). this package says to look inside 'views, folder for the files with the .liquid name

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
// HOME ROUTE
app.get('/', (req,res) => {
  const {username, loggedIn, userId} = req.session
  res.render('home.liquid', {username, loggedIn, userId} )
})

// this is now where we register our routes, this is how server.js knows to send the correct response
// app.use, when we register a route, needs two args
// first arg -> base URL
// second arg -> file to use
app.use('/fruits', FruitRouter)
app.use('/comments', CommentRouter)
app.use('/users', UserRouter)

// this renders our error page
// gets the error from a url req query
app.get('/error', (req, res) => {
  const error = req.query.error || 'This page does not exist'
  const {username, loggedIn, userId} = req.session
  res.render('error.liquid', { error, ...req.session })
})

// this catch all route will redirect a user to the error page
app.all('*', (req, res) => {
  res.redirect('/error')
})
////////////////////////////////////
// Server Listener               //
///////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END
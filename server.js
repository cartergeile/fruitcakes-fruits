////////////////////////////
// Import dependencies //
///////////////////////////
const express = require('express') // import the express framework
const mongoose = require('mongoose') // import the mongoose library
const morgan = require('morgan') // import the morgan request logger
require('dotenv').config() // load my env files's variables
const path = require('path') // import path module

////////////////////////////
// Import our  Models    //
///////////////////////////
const Fruit = require('./models/fruit')

////////////////////////////
// Database Connection   //
///////////////////////////
// this is where we will set up our inputs for our database connect function
const DATABASE_URL = process.env.DATABASE_URL
// here is our DB config object
const CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// establish our database connection
mongoose.connect(DATABASE_URL, CONFIG)

// Tell mongoose what to do with certian events
// what happens when we open, disconnect, or get an error
mongoose.connection
  .on('open', () => console.log('Connected to Mongoose'))
  .on('close', () => console.lo('Disconnected from Mongoose'))
  .on('error', (err) => console.lo('An error occured: \n', err))


////////////////////////////////////
// Create our Express App Object //
///////////////////////////////////
const app = express()

////////////////////////////////////
// Middleware                    //
///////////////////////////////////
// middleware runs before all the routes
// every request is processed through middleware before mongoose can do anything with it
app.use(morgan('tiny')) // this is for request logging, the 'tiny' arg declares what size of morgan log to use
app.use(express.urlencoded({ extended: true })) // this parses urlEncoded request bodies(useful for POST and PUT requests)
app.use(express.static('public')) // this serves static files from the 'public' folder
app.use(express.json()) // parses incoming request payloads with JSON


////////////////////////////////////
// Routes                        //
///////////////////////////////////
app.get('/', (req,res) => {
  res.send('Server is live, ready for requests')
})

// we'e going to build a seed route
// this will seed the database for us with a few starter resources
// two ways we will talk about seeding the database
// First -> seed route, they work, but not best practice
// Second -> seed script, they work and ARE BEST PRACTICE
app.get('/fruits/seed', (req, res) => {
  // array of starter resources(fruits)
  const startFruits = [
    {name: 'Orange', color: 'orange', readyToEat: true },
    {name: 'Grape', color: 'purple', readyToEat: true },
    {name: 'Banana', color: 'green', readyToEat: false },
    {name: 'Strawberry', color: 'red', readyToEat: false },
    {name: 'Coconut', color: 'brown', readyToEat: true },
  ]
  // then we delete every fruit in the database(all instances of this resource)
  Fruit.deleteMany({})
    .then(() => {
  // then we'll seed(create) our starter fruits
    Fruit.create(startFruits)
      // tell our db what to do with success and failures
      .then(data => {
      res.json(data)
      })
    .catch(err => console.log('The following error occured: \n', err))  
    })
})

////////////////////////////////////
// Server Listener               //
///////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END
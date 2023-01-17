////////////////////////////
// Import dependencies //
///////////////////////////
const express = require('express') // import the express framework
const mongoose = require('mongoose') // import the mongoose library
const morgan = require('morgan') // import the morgan request logger
require('dotenv').config() // load my env files's variables

////////////////////////////
// Database Connection //
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
// Server Listener               //
///////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))

// END
// move database connection from server.js to here
////////////////////////////
// Import dependencies //
///////////////////////////
require('dotenv').config() // load my env files's variables
const mongoose = require('mongoose') // import the mongoose library

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


////////////////////////////
// Export connection     //
///////////////////////////
module.exports = mongoose
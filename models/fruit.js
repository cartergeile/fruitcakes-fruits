/////////////////////////////////////////////
// Schema and model for the fruit resource //
/////////////////////////////////////////////
// this is the old mongoose import
// const mongoose = require('mongoose') // import mongoose
// now we want our mongoose object to relate to our db
// so were gonna bring in mon goose connection from our utils
const mongoose = require('../utils/connection')

// we'll destructure the Schema and model functions from mongoose
const { Schema, model } = mongoose

// fruits schema
const fruitSchema = new Schema({
  name: String,
  color: String,
  readyToEat: Boolean
})

// make the fruit model
// the model method take sto arguments
// first -> what we call our model
// second -> Schema used to build the model
const Fruit = model('Fruit', fruitSchema)

//////////////////////
// Export our Model //
//////////////////////
module.exports = Fruit
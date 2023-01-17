/////////////////////////////////////////////
// Schema and model for the fruit resource //
/////////////////////////////////////////////
const mongoose = require('mongoose') // import mongoose

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
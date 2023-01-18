////////////////////////////
// Import dependencies //
///////////////////////////
const express = require('express')
const Fruit = require('../models/fruit')

////////////////////////////
// create router //
///////////////////////////
const router = express.Router()

////////////////////////////
// Routes                //
///////////////////////////

// we'e going to build a seed route
// this will seed the database for us with a few starter resources
// two ways we will talk about seeding the database
// First -> seed route, they work, but not best practice
// Second -> seed script, they work and ARE BEST PRACTICE
router.get('/seed', (req, res) => {
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

// index route -> displays all fruits
router.get('/', (req, res) => {
  // find all the fruits
  Fruit.find({})
  // send json if successful
  .then(fruits => { res.json({ fruits: fruits })})
  // catch errors if they occur
  .catch(err => console.log('The following error occured: \n', err))
})

// CREATE route
// create -> recieves a request body, and creates a new document in the database
router.post('/', (req, res) => {
  // here well have something called request body
  // inside this function, that will be called req.body
  // we want to pass our req.body to the create method
  const newFruit = req.body
  Fruit.create(newFruit)
    // send a 201 status, along with json response
    .then(fruit => {
      res.status(201).json({fruit: fruit.toObject()})
    })
    // catch errors
    .catch(err => console.log(err))
})

// PUT route
// Update -> updates a specific fruit
// put replaces the entire document with a new document from the req.body
// PATCH is able to update specific fields at specific times, but requires more code to ensure it works properly, so well use later
router.put('/:id', (req, res) => {
  // save the id to a variable for easy use later
  const id = req.params.id
  // svae the request body to a variable for reference later
  const updatedFruit = req.body
  // use mongoose method:
  // findByIdAndUpdate
  // eventually well change how this route works, for now well do everything in one shot
  Fruit.findByIdAndUpdate(id, updatedFruit, { new: true })
    .then(fruit => {
      console.log('the newly updated fruit', fruit)
      // update success message will just be a 204 - no content
      res.sendStatus(204)
      })
    .catch(err => console.log(err))
})

// DELETE route
// delete -> delete a specific fruit
router.delete('/:id', (req,res) => {
  //get id from the req
  const id = req.params.id
  // find and delete the fruit
  Fruit.findByIdAndRemove(id)
  // send 204 if succuss
    .then(() => {
      res.sendStatus(204)
    })
  // catch error
    .catch(err => console.log(err))
})

// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req,res) => {
  //get the id
  const id = req.params.id
  // use a mongoose method to find using that id
  Fruit.findById(id)
    .then(fruits => {
      res.json({ fruits: fruits })
    })
    .catch(err => console.log(err))
  // send the fruit json upon sucess
  // catch and errors
})

////////////////////////////
// Export Router         //
///////////////////////////
module.exports = router
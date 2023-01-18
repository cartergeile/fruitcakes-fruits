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


// index route -> displays all fruits
router.get('/', (req, res) => {
  // find all the fruits
  Fruit.find({})
  // send json if successful
  .then(fruits => { res.json({ fruits: fruits })})
  // catch errors if they occur
  .catch(err => {
    console.log(err)
    res.status(404).json(err)
  })
})

// CREATE route
// create -> recieves a request body, and creates a new document in the database
router.post('/', (req, res) => {
  // here well have something called request body
  // inside this function, that will be called req.body
  // we want to pass our req.body to the create method
  // we want to add an owner field to our fruit
  // luckily for us, we saved the user's id on the session object, so its really easy for us to access that data
  req.body.owner = req.session.userId
  const newFruit = req.body
  Fruit.create(newFruit)
    // send a 201 status, along with json response
    .then(fruit => {
      res.status(201).json({fruit: fruit.toObject()})
    })
    // catch errors
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
})


// GET ROUTE
// Index -> This is a user specific index route
// this will only show the logged in users fruits
router.get('/mine', (req, res) => {
  // find fruits by ownership, using the req.session info
  Fruit.find({ owner: req.session.userId })
  // if found, display fruits
  .then(fruits => {
    res.status(200).json({ fruits: fruits })
  })
  // otherwise throw an error
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
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
      .catch(err => {
        console.log(err)
        res.status(404).json(err)
      })
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
  .catch(err => {
    console.log(err)
    res.status(404).json(err)
  })
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
    .catch(err => {
      console.log(err)
      res.status(404).json(err)
    })
  // send the fruit json upon sucess
  // catch and errors
})

////////////////////////////
// Export Router         //
///////////////////////////
module.exports = router
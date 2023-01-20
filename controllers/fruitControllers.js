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
  const {username, loggedIn, userId} = req.session
  // find all the fruits
  Fruit.find({})
  // built in function that runs before the rest of the promise chain
  // function is populate, and its able to retrieve info from other documents in other collections
  .populate('owner', 'username')
  .populate('comments.author', '-password')
  // send json if successful
  .then(fruits => { 
    //res.json({ fruits: fruits })
    // now that we have liquid installed, were going to use render as a response for our controllers
    res.render('fruits/index', { fruits, username, loggedIn, userId })
  })
  // catch errors if they occur
  .catch(err => {
    console.log(err)
    res.status(404).json(err)
  })
})

// GET for the new page
// shows form to create new frui
router.get('/new', (req, res) => {
  res.render('fruits/new', { ...req.session })
})
// CREATE route
// create -> recieves a request body, and creates a new document in the database
router.post('/', (req, res) => {
  // here well have something called request body
  // inside this function, that will be called req.body
  // we want to pass our req.body to the create method
  // we want to add an owner field to our fruit
  // luckily for us, we saved the user's id on the session object, so its really easy for us to access that data
  // need js magic to change checkbox into boolean
  req.body.owner = req.session.userId
  req.body.readyToEat = req.bodyreadyToEat === 'on' ? true : false
  const newFruit = req.body
  Fruit.create(newFruit)
    // send a 201 status, along with json response
    .then(fruit => {
      res.status(201).json({ fruit: fruit.toObject() })
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
  const {username, loggedIn, userId} = req.session
  // find fruits by ownership, using the req.session info
  Fruit.find({ owner: req.session.userId })
  .populate('owner', 'username')
  .populate('comments.author', '-password')
  // if found, display fruits
  .then(fruits => {
    res.render('fruits/index', { fruits, username, loggedIn, userId })
  })
  // otherwise throw an error
  .catch(err => {
    console.log(err)
    res.status(400).json(err)
  })
})


// PUT route
// Update -> updates a specific fruit(only if fruit owner is updating)
router.put('/:id', (req, res) => {
  const id = req.params.id
  Fruit.findById(id)
    .then(fruit => {
      // if the owner of the fruit is the person who is logged in
      if (fruit.owner == req.session.userId) {
        // update and save the fruit
        // and send success message
        res.sendStatus(204)
        return fruit.updateOne(req.body)     
      } else {
        // otherwise send a 401 unauthorized status
        res.sendStatus(401)
      }
      
      
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
})


// DELETE route
// delete -> delete a specific fruit
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Fruit.findById(id)
    .then(fruit => {
      // if the owner of the fruit is the person who is logged in
      if (fruit.owner == req.session.userId) {
        // delete fruit
        // and send success message
        res.sendStatus(204)
        return fruit.deleteOne(req.body)     
      } else {
        // otherwise send a 401 unauthorized status
        res.sendStatus(401)
      }
      
      
    })
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
})

// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req,res) => {
  //get the id
  const id = req.params.id
  // use a mongoose method to find using that id
  Fruit.findById(id)
    .populate('comments.author', 'username')
    .then(fruit => {
      // res.json({ fruits: fruits })
      res.render('fruits/show.liquid', {fruit, ...req.session})
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
////////////////////////////
// Import dependencies //
///////////////////////////
const express = require('express')
const Fruit = require('../models/fruit')

////////////////////////////
// create router         //
///////////////////////////
const router = express.Router()

////////////////////////////
// Routes                //
///////////////////////////
// subdocs are not mongoose models, that means they dont have own collection, and they dont come with the same model methods that were used to (they have some of their own built in)
// this also means, that a subdoc is never going to be viewed without its parent document.  well never see a comment without seeing the fruit it was commented on first.

// this also means that when we make a subdocument, we MUST refer to the parent so mongoose knows where in mongodb to store this subdocument

// POST -> /comments/<someFruitId>
// only logged in users can post comments, becuase author field is required
// bs we have to refer to a fruit, well do that in the simplest way via route
router.post('/:fruitId', (req, res) => {
  // first get fruitId and save to a variable
  const fruitId = req.params.fruitId
  // then well protect this route against non-logged in users
  if (req.session.loggedIn) {
    // if logged in, make the logged inuser the author of the comment
    // this is exactly like how we added the owner to the fruits
    req.body.author = req.session.userId
  } else {
    res.sendStatus(401) // send 401-unauthorized
  }
  // saves the req.body to a variable for easy reference later
  const theComment = req.body
  // find a specific fruit
  Fruit.findById(fruitId)
    .then(fruit => {
      // create the comment(with a req.body)
      fruit.comments.push(theComment)
      // save the fruit
      return fruit.save()
    })
    // respond with a 201 and the fruit itself
    .then(fruit => {
      res.status(201).json({ fruit: fruit })
    })
    // catch and handle errors
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })  
})

// DELETE -> /comments/delete
router.delete('/:commentId')


// EXPORT ROUTER
module.exports = router
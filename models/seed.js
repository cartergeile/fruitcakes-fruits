////////////////////////////
// Import dependencies //
///////////////////////////
const mongoose = require('../utils/connection')
const Fruit = require('./fruit')

// Here, well add our seed script
// this will seed our database for us, just like seed route did
// the difference is, only an 'adminsitrative' type user can see it
// eventually run this node seed.js

/*-----------OLD SEED ROUTE -------------*/
// we'e going to build a seed route
// this will seed the database for us with a few starter resources
// two ways we will talk about seeding the database
// First -> seed route, they work, but not best practice
// Second -> seed script, they work and ARE BEST PRACTICE
// router.get('/seed', (req, res) => {
//   // array of starter resources(fruits)
//   const startFruits = [
//     {name: 'Orange', color: 'orange', readyToEat: true },
//     {name: 'Grape', color: 'purple', readyToEat: true },
//     {name: 'Banana', color: 'green', readyToEat: false },
//     {name: 'Strawberry', color: 'red', readyToEat: false },
//     {name: 'Coconut', color: 'brown', readyToEat: true },
//   ]
//   // then we delete every fruit in the database(all instances of this resource)
//   Fruit.deleteMany({})
//     .then(() => {
//   // then we'll seed(create) our starter fruits
//     Fruit.create(startFruits)
//       // tell our db what to do with success and failures
//       .then(data => {
//       res.json(data)
//       })
//     .catch(err => console.log('The following error occured: \n', err))  
//     })
// })

////////////////////////////
// Seed Script Code      //
///////////////////////////
// first, well save our db connection to a variable
const db = mongoose.connection

db.on('open', () => {
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
          console.log('here are the created fruits: \n', data)
          // once its done, we close the connection
          db.close()
        })
        .catch(err => console.log('The following error occured: \n', err))  
        // always close the connection
        db.close()
      })
    })
      .catch(err => {
        console.log(err)
        // always make sure to close the connection
        db.close()
      })
    


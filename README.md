# Full CRUD Full Stack App

- Use express to build a server
- Use Mongoose to comminicate with MongoDB
- Full CRUD functionality on fruits resource
- User Authentication
- The ability to add comments to fruits
- (Maybe gather data from a 3rd party API)

This app will start as an API, that recieves requests and sendsd JSON response, but eventually we will add view layers that will render htmnl in our browser

This is an MVC application.
We're using the MVC system for organizing our code.
This breaks our app down into these three parts.
MVC stands for 
- Models
- Views
- Controllers

Models - All of our data, what shape it's in and what resources we're using(models), and how our resources relate to one another

Views - All the different ways we can see our data, weather it's a JSON response, or an actual HTML response, this determines how our data can be viewed by the user.

Controllers - Tell us what we can do and connect our views and our models. We can think of our routes as our controllers, becuase they determine how a user can interact with our resources

## How we talk about what we're doing

We're using express framework to build a server, in which we are using mongoose to process our requests and run CRUD operations using a mongoDB database

What we're building is a REST api, that runs full CRUD operations on a single resource. (this will change, eventually)

## Describe REST and list the various routes

- REST stands for Representational State Transfer
- It's just a set of principles that describe how netwoeked resources are accessed and manipulated
- We have 7 RESTful routes that allow us basic operations for reading and manipulating a collection of data:

| **URL**          | **HTTP Verb**| **Action** |
|------------------|--------------|------------|
| /fruits/         | GET          | index  
| /fruits/:id      | GET          | show       
| /fruits/new      | GET          | new   
| /fruits          | POST         | create   
| /fruits/:id/edit | GET          | edit       
| /fruits/:id      | PATCH/PUT    | update    
| /fruits/:id      | DELETE       | destroy  

So far, we've used 5 RESTful routes to build our API

The two routes that we haven't used so far, are new and edit.
These are designed to display a page that renders a form, so that we can send a request body from the browser to our server.


## File organization, where are things happening?

Main entry file is still `server.js`
This is where we establish our connection with express, to the port 3000, which allows us to develop locally, on [localhost:3000](http://localhost:3000/).

`server.js` imports our `fruitControllers` from the controllers directory.

`fruitControllers` is where we set up our routes to utilize mongoose to interavt with fruit documents in our mongoDb.

the connection between fruits and mongoDb, starts with the file `utils/connection.js`, where we define and connect to our databse. The fruit model in `models/fruit.js` is where this connection happens.  Our fruitControllers import the model Fruit, and run mongoose model methods whenever we hit appropriate route

## Middleware

our middleware is now processed by a function in the utils directory. this function takes one argument, app, and processes requests through our middleware
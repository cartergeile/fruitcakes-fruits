/////////////////////////////////////////////
// Schema for the comment subdocument     //
/////////////////////////////////////////////
const mongoose = require('../utils/connection')

// All we need from mongoose, to build subdocuments
// is the schema constructor
// SUBDOCS ARE NOT MONGOOSE MODELS
// we'll destructure the Schema and model functions from mongoose
const { Schema } = mongoose

// comment schema
const commentSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// take note that there is no model function happening anywhere in thise file. Thats because subdocs are not mongoose models

// EXPORT SCHEMA
module.exports = commentSchema
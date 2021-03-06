/* /SERVER/MODELS/BOOKS.JS */
/* ABIRAMI KENNEDY        */
/* 300934720              */
/* MY FAVOURITE BOOKS     */

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);

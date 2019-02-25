// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /***********************
     * ADDED ADD CODE HERE *
     ***********************/

    res.render('books/details', {
      title: 'Add new book',
      books: book
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  //console.log(req.body); --Testing

    /***********************
     * ADDED ADD CODE HERE *
     ***********************/

    let newBook = book({
      "Title":req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });

  book.create(newBook, (err, book) => {
      if (err) {
          console.log(err);
          res.end(err);
      }
      else {
          //Refresh
          res.redirect('/books');
      }

  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /************************
     * ADDED EDIT CODE HERE *
     ************************/

     let id = req.params.id;
     //console.log(id); --Testing
     book.findById(id, (err,bookObj)=>{
      if(err){
        console.log(err);
        res.end(err);
      }
      else{
        //Edit page redirect
        res.render('books/details',{
          title: 'Edit a book',
          books: bookObj
        });
      }
     });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /************************
     * ADDED EDIT CODE HERE *
     ************************/

     let id=req.params.id;
     let updateBook = book({
       "_id":id,
       "Title":req.body.title,
       "Price": req.body.price,
       "Author": req.body.author,
       "Genre": req.body.genre
     })

     book.update({_id: id}, updateBook, (err)=> {
       if(err){
         console.log(err);
         res.end(err);
       }
       else {
         //Refresh
         res.redirect("/books")
       }
     })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /**************************
     * ADDED DELETE CODE HERE *
     **************************/

     let id = req.params.id;

     book.remove({_id: id}, (err) =>{
       if(err){
         console.log(err);
         res.end(err);
       }
       else{
         //Refresh
         res.redirect('/books');
       }
     })
});


module.exports = router;

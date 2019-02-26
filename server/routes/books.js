/* /SERVER/ROUTES/BOOKS.JS */
/* ABIRAMI KENNEDY        */
/* 300934720              */
/* MY FAVOURITE BOOKS     */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');


//Authorization to view book list
function requireAuth(req, res, next){
  //test - if user is logged in
  if(!req.isAuthenticated())
  {
    return res.redirect('/login');
  }
  
  next();
}

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      //Error log
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', requireAuth, (req, res, next) => {

    /***********************
     * ADDED ADD CODE HERE *
     ***********************/

    res.render('books/details', {
      title: 'Add new book',
      //Initiate book model to books collection
      books: book,
      displayName: req.user ? req.user.displayName : ''
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add',requireAuth, (req, res, next) => {

  //console.log(req.body); --Testing

    /***********************
     * ADDED ADD CODE HERE *
     ***********************/
    //Initiation
    let newBook = book({
      "Title":req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
  });

  book.create(newBook, (err, book) => {
      if (err) {
          //Error log
          console.log(err);
          res.end(err);
      }
      else {
          //Refresh the page
          res.redirect('/books');
      }

  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id',requireAuth, (req, res, next) => {

    /************************
     * ADDED EDIT CODE HERE *
     ************************/

     let id = req.params.id;
     //console.log(id); --Testing
     book.findById(id, (err,bookObj)=>{
      if(err){
        //Error log
        console.log(err);
        res.end(err);
      }
      else{
        //Edit page redirect
        res.render('books/details',{
          title: 'Edit a book',
          //Initiate bookObj model to books collection
          books: bookObj,
          displayName: req.user ? req.user.displayName : ''
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
     //Initiation
     let updateBook = book({
       "_id":id,
       "Title":req.body.title,
       "Price": req.body.price,
       "Author": req.body.author,
       "Genre": req.body.genre
     })

     book.update({_id: id}, updateBook, (err)=> {
       if(err){
         //Error log
         console.log(err);
         res.end(err);
       }
       else {
         //Refresh the page
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
         //Error log
         console.log(err);
         res.end(err);
       }
       else{
         //Refresh the page
         res.redirect('/books');
       }
     })
});


module.exports = router;

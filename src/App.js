import React from 'react';
// import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';

// Components
import BookSearch from './BookSearch';
import BookShelves from './BookShelves.jsx';

// Styling
import './App.css';

/**
 * Book App
 * @abstract   Highest level of the application
 * @param {void}  No parameters are passed in (URL only)
 */
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
        }));
      });
  }


  /**
  * Change the shelf the book is on updating the Db
  * @param {number} bookId The id of the book that should be moved to a different shelf
  * @param {number} newShelf The shelf the book should be moved to
  * @returns {void}
   */
    changeShelf = (updatedBook, newShelf) => {
      updatedBook.shelf = newShelf;
      BooksAPI.update(updatedBook, newShelf)
        .then((books) => {
          this.setState((prevState) => ({
            books: prevState.books.filter(book => book.id !== updatedBook.id).concat(updatedBook),
          }));
        });
    }





    render() {
      // console.log('App this.state.books:', this.state.books);
      return (
        <div className="app">
          {this.state.showSearchPage ? (
            <BookSearch />
        ) : (
          <div>
            { this.state.books && this.state.books.length > 0 &&
            <BookShelves
              books={this.state.books}
              changeShelf={this.changeShelf}
          /> }
        </div>
        )}
        </div>
      );
    }
}

export default BooksApp;

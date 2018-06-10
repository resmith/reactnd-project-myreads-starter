import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Components
import BookSearch from './BookSearch';
import BookShelves from './BookShelves.jsx';

// Styling
import './App.css';

/**
 * Book App
 * Kept the App thin to decrease load time
 * and prevent unloading unneccessary items (e.g. Books for Bookshelves when doing search)
 * @abstract   Highest level of the application
 * @param {void}  No parameters are passed in (URL only)
 */
class BooksApp extends Component {

    render() {
      // console.log('App this.state.books:', this.state.books);
      return (
        <div>
          <Route exact path='/' render={() => (<BookShelves />)}/>
          <Route exact path='/bookshelves' render={() => (<BookShelves />)}/>
          <Route exact path='/search' render={() => (<BookSearch />)}/>
        </div>
      );
    }
}

export default BooksApp;

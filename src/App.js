import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

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
  componentWillMount() {
    this.setState(() => ({
      booksOnShelves: [],
    }));

    BooksAPI.getAll()
      .then((booksOnShelves) => {
        const updatedBooksWithShelves = [];

        booksOnShelves.forEach((book) => {
          updatedBooksWithShelves.push({
            id: book.id,
            shelf: book.shelf,
          });
        });

        this.setState(() => ({
          booksOnShelves: updatedBooksWithShelves,
        }));
      });
  }

  changeShelf = (updatedBook, newShelf) => {
    const newUpdatedBook = {};
    newUpdatedBook.id = updatedBook.id;
    newUpdatedBook.shelf = newShelf;
    BooksAPI.update(updatedBook, newShelf)
      .then((result) => {
        this.setState((prevState) => ({
          booksOnShelves: prevState.booksOnShelves.filter(book => book.id !== updatedBook.id).concat(newUpdatedBook),
        }));
      });
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (<BookShelves changeShelf={this.changeShelf} booksOnShelves={this.state.booksOnShelves} />)}/>
        <Route exact path='/bookshelves' render={() => (<BookShelves changeShelf={this.changeShelf} booksOnShelves={this.state.booksOnShelves} />)}/>
        <Route exact path='/search' render={() => (<BookSearch changeShelf={this.changeShelf} booksOnShelves={this.state.booksOnShelves} />)}/>
      </div>
    );
  }
}

export default BooksApp;

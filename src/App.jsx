import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ReactTooltip from 'react-tooltip';

// Components
import BookSearch from './BookSearch.jsx';
import BookShelves from './BookShelves.jsx';
import BookShelf from './BookShelf.jsx';

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
        this.setState(() => ({
          booksOnShelves,
        }));
      });
  }

  changeShelf = (updatedBook, newShelf) => {
    const newUpdatedBook = Object.assign(updatedBook, { shelf: newShelf });
    // TODO: Determine priority of consistenycy need vs. speed
    // If consistency is important, put setState in the 'then' block of the API Update
    BooksAPI.update(updatedBook, newShelf)
      .then(() => {
      });
    this.setState(prevState => ({
      booksOnShelves: prevState.booksOnShelves.filter(book => book.id !== updatedBook.id).concat(newUpdatedBook),
    }));

  }

  render() {
    const bookShelves = [
      { title: 'Currently Reading', shelf: 'currentlyReading', shelfURL: '/bookshelf/currentlyReading' },
      { title: 'Want to Read', shelf: 'wantToRead', shelfURL: '/bookshelf/wantToRead' },
      { title: 'Read', shelf: 'read', shelfURL: '/bookshelf/read' },
    ];


    return (
      <div>
        <Route exact path="/" render={() => (
          <BookShelves
            bookShelves={bookShelves}
            booksOnShelves={this.state.booksOnShelves}
            changeShelf={this.changeShelf}
          />)}/>

        <Route exact path="/bookshelves" render={() => (
          <BookShelves
            bookShelves={bookShelves}
            booksOnShelves={this.state.booksOnShelves}
            changeShelf={this.changeShelf}
          />)}/>

        <Route exact path="/search" render={() => (
          <BookSearch
            changeShelf={this.changeShelf}
            booksOnShelves={this.state.booksOnShelves}
          />)}/>


        {/* Routes for the individual bookShelf */}
        {bookShelves.map(bookShelf => (
          <Route exact path={`${bookShelf.shelfURL}`} key={bookShelf.shelf} render={() => (
            <BookShelf
              key={bookShelf.shelf}
              shelfTitle={bookShelf.title}
              shelfURL={bookShelf.shelfURL}
              booksOnShelf={this.state.booksOnShelves.filter(book => book.shelf === bookShelf.shelf)}
              changeShelf={this.changeShelf}
              showBackButton={true}
            />
          )} />
        ))}

        <ReactTooltip />
      </div>
    );
  }
}

export default BooksApp;

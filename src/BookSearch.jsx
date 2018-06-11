import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';
import Button from './modules/Button';
import BookShelf from './BookShelf.jsx';

/**
 * Calls the invdividual "BookShelf" components, supplying which
 *    BookShelf should be rendered
 * @param {function}  changeShelf function
 * @returns {component} BookShelf[s] [called for each item in BookShelves arrary]
 */
class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: [],
      includeBooksOnShelf: false,
    };
  }

mergeBooksWithShelves = (books, booksOnShelves) => {
  // if (books === undefined || books.length === 0) { return []; }
  if (books && books.items && books.items.length === 0) { return []; }
  const newBooks = books.slice(0);

  let foundIndex = -1;
  booksOnShelves.forEach((book) => {
    foundIndex = newBooks.findIndex(newBook => (newBook.id === book.id));
    if (foundIndex > -1) {
      newBooks[foundIndex].shelf = book.shelf;
    }
  });

  return (newBooks);
}


  updateQuery = (event) => {
    const val = event.target.value;
    this.setState({ query: val });
    if (val && val.length > 0) {
      BooksAPI.search(val)
        .then((books) => {
          this.setState(() => ({
            books: this.mergeBooksWithShelves(books, this.props.booksOnShelves),
          }));
        });
    }
  }

  toggleOnShelfFilter = () => {
    this.setState(prev => ({
      includeBooksOnShelf: !prev.includeBooksOnShelf,
    }));
  }

  render() {
    // console.log('render state', this.state);
    const { changeShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Button
            title="Close"
            path="/bookshelves"
            cName="close-search"
            dataTip="Back to bookshelf"
          />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}
            />
          </div>
          <button
            className="toggle-filter"
            onClick={this.toggleOnShelfFilter}
            data-tip={this.state.includeBooksOnShelf ? 'Hide books on a shelf' :
            'Include books on a shelf'}
          />

        </div>
        <div className="search-books-results">
          { this.state.books && this.state.books.length > 0 &&
            this.state.includeBooksOnShelf &&
            <BookShelf
              key=""
              shelfTitle={this.state.query}
              booksOnShelf={this.state.books}
              changeShelf={changeShelf}
              showGlowingBorder={true}
            />
        }
        {/* TODO: When selecting a shelf for a book, this does not updateQuery
          and remove them dynamically. Thought about correcting it but I
          believe this is a better experience for the user. Confirm with
          product manager  */}
          { this.state.books && this.state.books.length > 0 &&
            this.state.includeBooksOnShelf === false &&
            <BookShelf
              key=""
              shelfTitle={this.state.query}
              booksOnShelf={this.state.books.filter(book => book.shelf === undefined || book.shelf === 'none')}
              changeShelf={changeShelf}
              showGlowingBorder={true}
            />}
        </div>
      </div>
    );
  }
}

BookSearch.propTypes = {
  booksOnShelves: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  })).isRequired,
  changeShelf: PropTypes.func.isRequired,
};


export default BookSearch;

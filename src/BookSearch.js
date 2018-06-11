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
  componentWillMount() {
    this.setState(() => ({
      query: '',
      books: [],
    }));

    BooksAPI.getAll()
      .then((booksOnShelves) => {
        const newBooksWithShelves = [];

        booksOnShelves.forEach((book) => {
          newBooksWithShelves.push({
            id: book.id,
            shelf: book.shelf,
          });
        });

        this.setState(() => ({
          booksOnShelves: newBooksWithShelves,
        }));
      });
  }

mergeBooksWithShelves = (books, booksOnShelves) => {
  console.log('mergeBooksWithShelves books,booksOnShelves: ', books,booksOnShelves);
  if (!books || books.length === 0) { return []; }
  const newBooks = books.slice(0);

  let foundIndex = -1;
  booksOnShelves.forEach((book) => {
    foundIndex = newBooks.findIndex((newBook) => (newBook.id === book.id));
    if (foundIndex > -1) {
      console.log('mergeBooksWithShelves hit! foundIndex', foundIndex);
      newBooks[foundIndex].shelf = book.shelf;
    }
  });

  console.log('mergeBooksWithShelves newBooks: ', newBooks);
  return (newBooks);
}


  updateQuery = (event) => {
    const val = event.target.value;
    console.log('updateQuery event.target.value:', val);
    this.setState({ query: val });
    if (val && val.length > 0) {
      BooksAPI.search(val)
        .then((books) => {
          this.setState(() => ({
            books: this.mergeBooksWithShelves(books, this.state.booksOnShelves),
          }));

        });
    }
  }

  render() {
    console.log('Booksearch this.state:', this.state);
    console.log('Booksearch this.props:', this.props);
    const { changeShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* <Button title="Close" path={'/bookshelves'} cName="close-search"  /> */}
          <Button title="Close" path={'/bookshelves'} cName="close-search"  />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={ this.updateQuery }
            />
          </div>

        </div>
        <div className="search-books-results">
          { this.state.books && this.state.books.length > 0 &&
          <BookShelf
            key=''
            shelfTitle=''
            booksOnShelf={this.state.books}
            changeShelf={changeShelf}
          />}
        </div>
      </div>

    )
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

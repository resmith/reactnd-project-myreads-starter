import React, { Component } from 'react';
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
  }

  updateQuery = (event) => {
    const val = event.target.value;
    console.log('updateQuery event.target.value:', val);
    this.setState({ query: val });
    if (val && val.length > 0) {
      BooksAPI.search(val)
        .then((books) => {
          console.log('updateQuery books:', books);
          this.setState(() => ({ books }));
        });
    }

  }

  changeShelf = (updatedBook, newShelf) => {
    const newUpdatedBook = updatedBook;
    newUpdatedBook.shelf = newShelf;
    BooksAPI.update(updatedBook, newShelf)
      .then((result) => {
        this.setState((prevState) => ({
          books: prevState.books.filter(book => book.id !== updatedBook.id).concat(newUpdatedBook),
        }));
      });
  }

  render() {
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
            books={this.state.books}
            changeShelf={this.changeShelf}
          />}
        </div>
      </div>

    )
  }
}

export default BookSearch;

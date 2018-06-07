import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf.jsx';


/**
 * Calls the invdividual "BookShelf" components, supplying which
 *    BookShelf should be rendered
 * @param {function}  changeShelf function
 * @returns {component} BookShelf[s] [called for each item in BookShelves arrary]
 */
class BookShelves extends Component {
  render() {
    const { books, changeShelf } = this.props;
    const bookShelves = [
      { title: 'Currently Reading', shelf: 'currentlyReading' },
      { title: 'Want to Read', shelf: 'wantToRead' },
      { title: 'Read', shelf: 'read' },
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelves.map(bookShelf => (
              <BookShelf
                key={bookShelf.title}
                shelfTitle={bookShelf.title}
                books={books.filter(book => book.shelf === bookShelf.shelf)}
                changeShelf={changeShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    );
  }
}

BookShelves.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  })).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelves;

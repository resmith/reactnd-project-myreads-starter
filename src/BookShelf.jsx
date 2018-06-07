import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';
import Book from './Book';

/**
 * Renders a singular bookshelf
 * @constructor
 * @props {object} book - The book including title, smallThumbnail, author
 * @props {function} changeShelf - Function for changing the shelf the book is on
 */
class BookShelf extends Component {
  state = {
    books: [],
  }
  componentDidMount() {
    // console.log('BookShelfCcomponentDidMount  this.props:', this.props);
    // const { query } = this.props;

    BooksAPI.getAll()
    // BooksAPI.search(query)
      .then((books) => {
        this.setState(() => ({
          books,
        }));
      });
  }

  render() {
    // console.log('BookShelf props:', this.props);
    const { title, shelf, changeShelf } = this.props;
    const filteredBooks = this.state.books.filter(book => book.shelf === shelf);

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map(book => (
              <li key={book.id}>
                <Book book={book} changeShelf={changeShelf} />
              </li>
                    ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelf;

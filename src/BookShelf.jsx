import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

/**
 * Renders a singular bookshelf
 * TODO: Prefer to query for the books here to avoid large props being passed
 *      down to here
 * @constructor
 * @props {object} book - The book including title, smallThumbnail, author
 * @props {function} changeShelf - Function for changing the shelf the book is on
 */
class BookShelf extends PureComponent {
  render() {
    const { books, shelfTitle, changeShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  changeShelf={changeShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.defaultProps = {
  shelfTitle: '',
  books: [{ id: '', title: '', shelf: '' }],
  changeShelf: function() {return ''},
};

BookShelf.propTypes = {
  shelfTitle: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  })),
  changeShelf: PropTypes.func,
};

export default BookShelf;

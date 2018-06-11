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
    console.log('BookShelf props:', this.props);
    const { booksOnShelf, shelfTitle, changeShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle} {booksOnShelf.count}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnShelf.map(book => (
              <li key={book.id}>
                <Book
                  bookOnShelf={book}
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
  booksOnShelf: [{ id: '', title: '', shelf: '' }],
};

BookShelf.propTypes = {
  shelfTitle: PropTypes.string,
  booksOnShelf: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  })),
  changeShelf: PropTypes.func,
};

export default BookShelf;

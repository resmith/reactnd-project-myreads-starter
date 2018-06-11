import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import Button from './modules/Button';
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
    const {
      booksOnShelf, shelfTitle, shelfURL, changeShelf,
      showBackButton, showGlowingBorder,
    } = this.props;

    return (
      <div className="bookshelf">
        { showBackButton &&
          <div>
            <div className="list-books-title" >
              <h1>MyReads</h1>
            </div>
            <Button
              title="Back"
              path="/bookshelves"
              cName="close-search2"
              dataTip="Back to bookshelf"
              style={{ display: 'inline' }}
            />
          </div>
        }
        <h2 className="bookshelf-title">
          { shelfURL &&
          <Link to={`${shelfURL}`}>{shelfTitle}({booksOnShelf.length})</Link>
          }
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { booksOnShelf && booksOnShelf.length > 0 &&
              booksOnShelf.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    changeShelf={changeShelf}
                    showGlowingBorder={showGlowingBorder}
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
  shelfURL: '',
  booksOnShelf: [{ id: '', title: '', shelf: '' }],
  showBackButton: false,
  showGlowingBorder: false,
};

BookShelf.propTypes = {
  shelfTitle: PropTypes.string,
  shelfURL: PropTypes.string,
  booksOnShelf: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  })),
  showBackButton: PropTypes.bool,
  showGlowingBorder: PropTypes.bool,
  changeShelf: PropTypes.func,
};

export default BookShelf;

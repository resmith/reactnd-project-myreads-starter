import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BookSelectShelf from './BookSelectShelf.jsx';

/**
 * Renders a book.
 * @constructor
 * @props {object} book - The book including title, smallThumbnail, author
 * @props {function} changeShelf - Function for changing the shelf the book is on
 */
class Book extends PureComponent {
  render() {
    const { book, changeShelf, showGlowingBorder } = this.props;
    const thumbnailUrl = book.imageLinks ? book.imageLinks.smallThumbnail : '';

    // if (!this.props.book || this.props.book.length === 0) {
    //   return;
    // }
    //

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
             width: 128,
             height: 193,
             backgroundImage: `url(${thumbnailUrl})`,
            }}
          />
          <div className="book-shelf-changer">
            { book.id &&
            <BookSelectShelf
              book={book}
              currentShelf={book.shelf ? book.shelf : ''}
              showGlowingBorder={showGlowingBorder}
              changeShelf={changeShelf}
            />
            }
          </div>
        </div>
        <div className="book-title">{book.title ? book.title : ''}</div>
        <div className="book-authors">
          {book.authors && book.authors.map((author, index) => (
            <i key={author}>{index > 0 ? ',' : '' } {author}</i>
                  ))}
        </div>
      </div>
    );
  }
}

Book.defaultProps = {
  showGlowingBorder: false,
};

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  changeShelf: PropTypes.func.isRequired,
  showGlowingBorder: PropTypes.bool,
};

export default Book;

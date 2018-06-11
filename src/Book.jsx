import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookSelectCategory from './BookSelectCategory.jsx';

/**
 * Renders a book.
 * @constructor
 * @props {object} book - The book including title, smallThumbnail, author
 * @props {function} changeShelf - Function for changing the shelf the book is on
 */
class Book extends Component {
  render() {
    console.log('Book this.props:', this.props);
    console.log('Book this.state:', this.state);
    const { book, changeShelf } = this.props;
    const thumbnailUrl = book.imageLinks ? book.imageLinks.smallThumbnail : '';

    // if (!this.props.book || this.props.book.length === 0) {
    //   return;
    // }

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
            <BookSelectCategory
              book={book}
              currentShelf={book.shelf ? book.shelf : ''}
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

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Book;

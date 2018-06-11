import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import BookSelectCategory from './BookSelectCategory.jsx';

/**
 * Renders a book.
 * @constructor
 * @props {object} book - The book including title, smallThumbnail, author
 * @props {function} changeShelf - Function for changing the shelf the book is on
 */
class Book extends PureComponent {
  componentWillMount() {
    this.setState(() => ({
      book: {},
    }));

    if (this.props.bookOnShelf && this.props.bookOnShelf.id) {
      BooksAPI.get(this.props.bookOnShelf.id)
        .then((book) => {
          this.setState(() => ({
            book,
          }));
        });
    }
  }

  render() {
    console.log('Book this.props:', this.props);
    console.log('Book this.state:', this.state);
    const { changeShelf } = this.props;
    const book = this.state.book ? Object.assign(this.state.book) : {};
    const thumbnailUrl = book.imageLinks ? book.imageLinks.smallThumbnail : '';
    // console.log('Book thumbnailUrl:', thumbnailUrl);

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
        <div className="book-title">{this.state.book.title ? this.state.book.title : ''}</div>
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
  bookOnShelf: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  }).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Book;

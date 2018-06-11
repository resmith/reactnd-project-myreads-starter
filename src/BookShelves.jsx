import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';
import Button from './modules/Button';
import BookShelf from './BookShelf.jsx';

/**
 * Calls the individual "BookShelf" components, supplying which
 *    BookShelf should be rendered
 * @param {function}  changeShelf function
 * @returns {component} BookShelf[s] [called for each item in BookShelves arrary]
 */
class BookShelves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      books: [],
      includeBooksOnShelf: false,
    };
  }

  componentWillMount() {
    this.setState(() => ({
      booksOnShelves: [],
    }));

    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
        }));
      });
  }

  render() {
    console.log('BookShelves this.props:', this.props);
    const { booksOnShelves, changeShelf } = this.props;

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
                booksOnShelf={this.state.books.filter(book => book.shelf === bookShelf.shelf)}
                changeShelf={changeShelf}
              />
            ))}
          </div>
        </div>
        <Button
          title="Add Book"
          path="/search"
          cName="open-search"
          dataTip="Add Books"
        />
      </div>
    );
  }
}

BookShelves.propTypes = {
  booksOnShelves: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  })).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelves;

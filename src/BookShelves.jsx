import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from './modules/Button';
import BookShelf from './BookShelf.jsx';

/**
 * Calls the individual "BookShelf" components, supplying which
 *    BookShelf should be rendered
 * @param {function}  changeShelf function
 * @returns {component} BookShelf[s] [called for each item in BookShelves arrary]
 */
class BookShelves extends PureComponent {

  render() {
    const { bookShelves, booksOnShelves, changeShelf } = this.props;

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
                shelfURL={bookShelf.shelfURL}
                booksOnShelf={booksOnShelves.filter(book => book.shelf === bookShelf.shelf)}
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
  bookShelves: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    shelfURL: PropTypes.string.isRequired,
  })).isRequired,
  booksOnShelves: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
  })).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelves;

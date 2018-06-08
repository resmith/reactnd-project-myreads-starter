import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf.jsx';

// const Button = withRouter(({ history }) => (
//   <button
//     type="button"
//     className="open-search"
//     onClick={() => { history.push('/search'); }}
//   >
//     Add Books
//   </button>
// ));

const Button = () => (
  <Route render={({ history }) => (
    <div className="open-search">
      <a onClick={() => { history.push('/search'); }} >
        Add Books
      </a>
    </div>
  )} />
)

/**
 * Calls the invdividual "BookShelf" components, supplying which
 *    BookShelf should be rendered
 * @param {function}  changeShelf function
 * @returns {component} BookShelf[s] [called for each item in BookShelves arrary]
 */
class BookShelves extends Component {
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books,
        }));
      });
  }

  changeShelf = (updatedBook, newShelf) => {
    const newUpdatedBook = updatedBook;
    newUpdatedBook.shelf = newShelf;
    BooksAPI.update(updatedBook, newShelf)
      .then((result) => {
        this.setState((prevState) => ({
          books: prevState.books.filter(book => book.id !== updatedBook.id).concat(newUpdatedBook),
        }));
      });
  }



  render() {
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
              this.state && this.state.books && this.state.books.length > 0 &&
              <BookShelf
                key={bookShelf.title}
                shelfTitle={bookShelf.title}
                books={this.state.books.filter(book => book.shelf === bookShelf.shelf)}
                changeShelf={this.changeShelf}
              />
            ))}
          </div>
        </div>
        <Button />
      </div>
    );
  }
}

export default BookShelves;

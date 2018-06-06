import React from 'react'
import * as BooksAPI from './BooksAPI';

// Components
import BookSearch from './BookSearch';
import BookShelves from './BookShelves';

// Styling
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
  BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  changeShelf = (bookId, newShelf) => {
  BooksAPI.update(bookId, newShelf)
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch />
        ) : (
            <BookShelves />
        )}
      </div>
    )
  }
}

export default BooksApp

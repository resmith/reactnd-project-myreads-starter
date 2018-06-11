import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders a book.
 * @constructor
 * @props {object} book - The book including title, smallThumbnail, author
 * @props {function} changeShelf - Function for changing the shelf the book is on
 */
class BookSelectCategory extends Component {
  componentWillMount() {
    this.setState(() => ({
      book: this.props.book,
    }));
  }

  selectOptionchange = (event) => {
    const { changeShelf } = this.props;
    const newShelf = event.target.value;
    changeShelf(this.state.book, newShelf);
    const updatedBook = Object.assign(this.state.book, { shelf: newShelf });
    this.setState(() => ({
      book: updatedBook,
    }));

  }

  render() {
    const selectOptions = [
      { val: 'txt', text: 'Move to...' },
      { val: 'currentlyReading', text: 'Currently Reading' },
      { val: 'wantToRead', text: 'Want to Read' },
      { val: 'read', text: 'Read' },
      { val: 'none', text: 'None' },
    ];
    return (
      <select onChange={this.selectOptionchange} >
        { selectOptions.map(selectOption => (
          <option
            key={selectOption.val}
            value={selectOption.val}
            disabled={selectOption.val === this.state.book.shelf}
          >
            {selectOption.text}
          </option>
        ))}
      </select>
    );
  }
}

BookSelectCategory.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookSelectCategory;
// onChange="if (this.selectedIndex) changeShelf(this.bookId,selectOptions[this.selectedIndex] );"

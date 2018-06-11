# MyReads Project

## Project
Udacity's MyReads Project for React Fundamentals course.

## Purpose
Provide an application that allows users to put books on a shelf
  The shelves are: "CurrentlyReading","wantToRead","wantToRead"

## TOC
  * [`Installation`](#Installation)
  * [`URL -> Components`](#URL -> Components)
  * [`Application Structure`](#Application Structure)
  * [`Project Specification`](#Project Specification)
  * [`Additional Functionality Added`](#Additional Functionality Added)


PROJECT SPECIFICATION

### `Installation`
1. Clone/Copy
2. npm install
3. npm start

Dependencies:
Dependent on Udacity BooksApi (see src/BooksAPI.js)

### `URL -> Components`
```bash
URL             ->    Component
/               ->  Bookshelves
/bookshelves    ->  Bookshelves
/search         ->  BookSearch
/bookshelf/[shelf]    ->  Bookshelf
  shelf= 1 of [currentlyreading, read, ...]
  e.g. /bookshelf/currentlyreading
```

### `Application Structure`
```bash
App                 Source
├── BookShelves     BooksAPI url:
  ├── BookShelf     source: props.shelf
        ├──  Book     source: props.book
          ├──  BookSelectShelf     source: props.book

├── Search          
      ├──  BookShelf    source: props.book
        ├──  Book     source: props.book
          ├──  BookSelectShelf     source: props.book

├── BookShelf     source: props.shelf
      ├──  Book     source: props.book
        ├──  BookSelectShelf     source: props.book
```

### `Components Purpose`
```bash
  *** App     Main driver. Calls the top level Components
          State of the BooksOnShelves is maintained there
          Send down via props
          Contains function changeShelf to modify book.shelf
              for both the state and the API update

  *** Top Level Components
  BookShelves   - Shows all the bookshelves and the books on them
                  input: BooksOnShelves
                  calls: BookShelf for each bookshelf

  Search        - Used to search for books to add them to BookShelves
                  input: BooksOnShelves
                  calls BookAPI.search based on query user Provided
                  Gets back list of books
                  Calls BookShelf component (with shelfTitle='')

  BookShelf       Is called from BookShelves and Search
                  inputs: Books, shelfTitle


  ***  Common Components
    BookShelf       Shows a bookShelf and the books on it
                    Is called from BookShelves and Search
                    calls the component Books

    Books           Renders the books
                    Is called from BookShelf
                    passed in the Book objects
                    calls selectShelf component

    BookSelectShelf Allows user to select shelf for the book
                  calls changeShelf to make the change and passed
                  down via props
```

##  `Project Specification`
###   Application Setup
- [x] Is the application easy to install and start?
- [x] The application was created with create-react-app and requires only  npm install and npm start to get it installed and launched?  Was created with starter code  
- [x] Does the application include README with clear installation and launch instructions?    
- [x] An updated README that describes the project and has instructions for installing and launching the project is included.   


###   Main Page
- [x] Does the main page show three categories (or “bookshelves”) for books (currently reading, want to read, and read)?    
- [x] The main page shows 3 shelves for books, and each book is shown on the correct shelf.  
- [x] Does the main page allow users to move books between shelves?  
- [x] The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. The functionality of moving a book to a different shelf works correctly.  
- [x] Does information persist between page refreshes?  
- [x] When the browser is refreshed, the same information is displayed on the page.  


### Search Page
Does the search page have a search input that lets users search for books?
- [x] 1) The search page has a search input field.
- [x] 2) The search page behaves correctly:
- [x] a) As the user types into the search field, books that match the query are displayed on the page.
- [x] b) Search results are not shown when all of the text is deleted out of the search input box.
- [x] c) Invalid queries are handled and prior search results are not shown.
- [x] d) The search works correctly when a book does not have a thumbnail or an author. (To test this, try searching for "poetry" and "biography").
- [x] e) The user is able to search for multiple words, such as “artificial intelligence.”

- [x] Do the search results allow a user to categorize a book as “currently reading”, “want to read”, or “read”?
- [x] Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
- [x] If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well. The option "None" should be selected if a book has not been assigned to a shelf.
- [x] Do selections made on the search page show up on the main page?
- [x] When an item is categorized on the search page and the user navigates to the main page, it appears on that shelf in the main page.


### Routing
- [x] Does the main page link to the search page?
- [x] The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.
- [x] Does the search page link back to the main page?
- [x] The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.


### Code Functionality
- [x] Does the project code handle state management appropriately?
- [x] Component state is passed down from parent components to child components. The state variable is not modified directly - setState() function is used correctly.
- [x] Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations.
- [x] Is JSX formatted properly?
- [x] All JSX code is formatted properly and functional.


## Additional Functionality Added
- [x]  On the BookShelves page, can click on a shelf heading and takes you to page for just that BookShelf
- [x] Filter added to Search to toggle between showing and hiding books that have a shelf assigned

## Thanks
Thanks to https://icons8.com for the https://icons8.com/icon/18636/slider

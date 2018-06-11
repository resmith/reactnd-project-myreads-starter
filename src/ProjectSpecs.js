PROJECT SPECIFICATION
MyReads: A Book Lending App

*** Application Setup
CRITERIA MEETS SPECIFICATIONS
Is the application easy to install and start?

The application was created with create-react-app and requires only npm install and npm start to get it installed and launched.

Does the application include README with clear installation and launch instructions?

An updated README that describes the project and has instructions for installing and launching the project is included.


*** Main Page
Y Does the main page show three categories (or “bookshelves”) for books (currently reading, want to read, and read)?
Y The main page shows 3 shelves for books, and each book is shown on the correct shelf.
Y Does the main page allow users to move books between shelves?
Y The main page shows a control that allows users to move books between shelves. The control should be tied to each book instance. The functionality of moving a book to a different shelf works correctly.
Y Does information persist between page refreshes?
Y When the browser is refreshed, the same information is displayed on the page.


*** Search Page
Does the search page have a search input that lets users search for books?
Y 1) The search page has a search input field.
Y 2) The search page behaves correctly:
Y a) As the user types into the search field, books that match the query are displayed on the page.
Y b) Search results are not shown when all of the text is deleted out of the search input box.
Y c) Invalid queries are handled and prior search results are not shown.
Y d) The search works correctly when a book does not have a thumbnail or an author. (To test this, try searching for "poetry" and "biography").
Y e) The user is able to search for multiple words, such as “artificial intelligence.”

Y Do the search results allow a user to categorize a book as “currently reading”, “want to read”, or “read”?
Y Search results on the search page allow the user to select “currently reading”, “want to read”, or “read” to place the book in a certain shelf.
Y If a book is assigned to a shelf on the main page and that book appears on the search page, the correct shelf should be selected on the search page. If that book's shelf is changed on the search page, that change should be reflected on the main page as well. The option "None" should be selected if a book has not been assigned to a shelf.
Y Do selections made on the search page show up on the main page?
Y When an item is categorized on the search page and the user navigates to the main page, it appears on that shelf in the main page.


*** Routing
Y Does the main page link to the search page?
Y The main page contains a link to the search page. When the link is clicked, the search page is displayed and the URL in the browser’s address bar is /search.
Y Does the search page link back to the main page?
Y The search page contains a link to the main page. When the link is clicked, the main page is displayed and the URL in the browser’s address bar is /.


*** Code Functionality
Y Does the project code handle state management appropriately?
Y Component state is passed down from parent components to child components. The state variable is not modified directly - setState() function is used correctly.
Y Books have the same state on both the search page and the main application page: If a book is on a bookshelf, that is reflected in both locations.
Y Is JSX formatted properly?
Y All JSX code is formatted properly and functional.


Additional Items completed
- On the BookShelves page, can click on a shelf heading and takes you to page for just that BookShelf
- filter added to Search to toggle between showing and hiding books that have a shelf assigned
-

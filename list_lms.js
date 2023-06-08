var bookList = document.getElementById('bookList');
var searchInput = document.getElementById('searchInput');
var categoryFilter = document.getElementById('categoryFilter');
var paginationContainer = document.getElementById('pagination');

var booksPerPage = 10;
var currentPage = 1;
var filteredBooks = [];


if (!localStorage.getItem('books')) {
  var books = generateBookList(100);
  localStorage.setItem('books', JSON.stringify(books));
} else {
  var books = JSON.parse(localStorage.getItem('books'));
}

populateBookList(books);

searchInput.addEventListener('input', filterBooks);
categoryFilter.addEventListener('change', filterBooks);

function generateBookList(count) {
  var categories = ['programming', 'environment', 'education', 'motivation'];
  var books = [];

  for (var i = 1; i <= count; i++) {
    var category = categories[Math.floor(Math.random() * categories.length)];
    var book = {
      title: generateRandomTitle(),
      author: generateRandomAuthor(),
      category: category,
      image: '',
      publicationDate: '',
      copiesAvailable: generateRandomCopiesAvailable()
    };

    books.push(book);
  }

  localStorage.setItem('books', JSON.stringify(books));

  return books;
}


function populateBookList(books) {
  filteredBooks = applyFilters(books);

  var totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  if (currentPage > totalPages) {
    currentPage = 1;
  }

  var startIndex = (currentPage - 1) * booksPerPage;
  var endIndex = startIndex + booksPerPage;
  var booksToDisplay = filteredBooks.slice(startIndex, endIndex);

  bookList.innerHTML = '';

  booksToDisplay.forEach(function(book) {
    var li = document.createElement('li');
    var imageElement = document.createElement('img');
    var infoContainer = document.createElement('div');
    var titleElement = document.createElement('h3');
    var authorElement = document.createElement('p');
    var publicationDateElement = document.createElement('p');

    imageElement.src = book.image;
    titleElement.textContent = book.title;
    authorElement.textContent = 'By: ' + book.author;
    publicationDateElement.textContent = 'Publication Date: ' + book.publicationDate;

    infoContainer.appendChild(titleElement);
    infoContainer.appendChild(authorElement);
    infoContainer.appendChild(publicationDateElement);

    li.appendChild(imageElement);
    li.appendChild(infoContainer);

    bookList.appendChild(li);
  });

  generatePaginationLinks(totalPages);
}

function generateRandomTitle() {
  var titles = [
    "The Pragmatic Programmer",
    "Clean Code",
    "JavaScript: The Good Parts",
    "Design Patterns",
    "The C Programming Language",
    "Cracking the Coding Interview",
    "Refactoring",
    "Head First Java",
    "Eloquent JavaScript",
    "Introduction to Algorithms"
    
  ];

  return titles[Math.floor(Math.random() * titles.length)];
}

function generateRandomAuthor() {
  var authors = [
    "Andrew Hunt, David Thomas",
    "Robert C. Martin",
    "Douglas Crockford",
    "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    "Brian W. Kernighan, Dennis M. Ritchie",
    "Gayle Laakmann McDowell",
    "Martin Fowler",
    "Kathy Sierra, Bert Bates",
    "Marijn Haverbeke",
    "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein"

  ];

  return authors[Math.floor(Math.random() * authors.length)];
}

function fetchBookDetails(book) {
  var searchUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + encodeURIComponent(book.title) + '&inauthor:' + encodeURIComponent(book.author);

  fetch(searchUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.items && data.items.length > 0) {
        var firstBook = data.items[0].volumeInfo;

        book.image = firstBook.imageLinks?.thumbnail || ''; 
        book.publicationDate = firstBook.publishedDate || ''; 
      } else {
        
        book.image = 'placeholder.jpg';
        book.publicationDate = 'N/A';
      }

      populateBookList(books); 
    })
    .catch(function(error) {
      console.log('Error fetching book details:', error);
     
      book.image = 'placeholder.jpg';
      book.publicationDate = 'N/A';
      populateBookList(books); 
    });
}

function populateBookDetailsWithApiData(books) {
  books.forEach(function(book) {
    fetchBookDetails(book);
  });
}


function filterBooks() {
  currentPage = 1; 
  populateBookList(books);
}

function applyFilters(books) {
  var searchText = searchInput.value.toLowerCase();
  var category = categoryFilter.value;

  return books.filter(function(book) {
    var titleMatch = book.title.toLowerCase().includes(searchText);
    var categoryMatch =
  category === 'all' ||
  category === 'programming' ||
  category === 'motivation' ||
  category === 'environment' ||
  category === 'education' ||
  book.category === category;

    return titleMatch && categoryMatch;
  });
}


function generatePaginationLinks(totalPages) {
  paginationContainer.innerHTML = '';

  for (var i = 1; i <= totalPages; i++) {
    var pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.classList.add('page-link');
    pageLink.textContent = i;

    if (i === currentPage) {
      pageLink.classList.add('active');
    }

    pageLink.addEventListener('click', function() {
      currentPage = parseInt(this.textContent);
      populateBookList(books);
    });

    paginationContainer.appendChild(pageLink);
  }
}

populateBookDetailsWithApiData(books);
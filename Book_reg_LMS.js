var storedBooks = JSON.parse(localStorage.getItem('books'));
var booksList = document.getElementById('books');

if (storedBooks) {
  storedBooks.forEach(function(book) {
    addBookToList(book);
  });
}

updateMostSoldBooks();

document.getElementById('addBookForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var titleInput = document.getElementById('titleInput');
  var authorInput = document.getElementById('authorInput');
  var title = titleInput.value;
  var author = authorInput.value;

  var book = {
    title: title,
    author: author,
    soldCount: 0
  };

  addBookToList(book);
  titleInput.value = '';
  authorInput.value = '';

  localStorage.setItem('books', JSON.stringify(Array.from(booksList.children).map(getBookData)));
  updateMostSoldBooks();
});

function addBookToList(book) {
  var li = document.createElement('li');
  var titleSpan = document.createElement('span');
  var authorSpan = document.createElement('span');
  var deleteButton = document.createElement('button');
  titleSpan.textContent = book.title;
  authorSpan.textContent = 'Written by ' + book.author;
  deleteButton.textContent = 'Delete';

  deleteButton.addEventListener('click', function() {
    li.remove();
    localStorage.setItem('books', JSON.stringify(Array.from(booksList.children).map(getBookData)));
    updateMostSoldBooks();
  });

  li.appendChild(titleSpan);
  li.appendChild(authorSpan);
  li.appendChild(deleteButton);

  booksList.appendChild(li);
}

function getBookData(item) {
  var title = item.querySelector('span:nth-of-type(1)').textContent;
  var author = item.querySelector('span:nth-of-type(2)').textContent.split('Written by ')[1];

  return {
    title: title,
    author: author
  };
}

function updateMostSoldBooks() {
  var storedBooks = JSON.parse(localStorage.getItem('books'));
  var sortedBooks = storedBooks.sort(function(a, b) {
    return b.soldCount - a.soldCount;
  });
  var mostSoldBooksList = document.getElementById('mostSoldBooks');
  if (mostSoldBooksList) {
    mostSoldBooksList.innerHTML = '';
  }

  mostSoldBooksList = document.createElement('ul');
  mostSoldBooksList.id = 'mostSoldBooks';
  var mostSoldBooks = sortedBooks.slice(0, 10);

  mostSoldBooks.forEach(function(book) {
    var li = document.createElement('li');
    var titleSpan = document.createElement('span');
    var authorSpan = document.createElement('span');
    titleSpan.textContent = book.title;
    authorSpan.textContent = 'Written by ' + book.author
    li.appendChild(titleSpan);
    li.appendChild(authorSpan);
    mostSoldBooksList.appendChild(li);
  });
  
  var bookListContainer = document.getElementById('bookList');
  bookListContainer.appendChild(mostSoldBooksList);
}

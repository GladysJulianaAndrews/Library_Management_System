
const renderBookList = () => {
    const table = document.getElementById("bookList");
    table.innerHTML = ''; 
  
    
    const storedBooks = localStorage.getItem("books");
    const books = storedBooks ? JSON.parse(storedBooks) : [];
  
    books.forEach((book, index) => {
      const row = document.createElement("tr");
      
      const titleCell = document.createElement("td");
      titleCell.textContent = book.title;
      row.appendChild(titleCell);
      
      const purchasedDateCell = document.createElement("td");
      purchasedDateCell.textContent = book.purchasedDate;
      row.appendChild(purchasedDateCell);
      
      const returnDateCell = document.createElement("td");
      returnDateCell.textContent = book.returnDate;
      row.appendChild(returnDateCell);
      
      const deleteCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteButton");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteBook(index);
      });
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);
      
      table.appendChild(row);
    });
  };
  
  
  const addBook = () => {
    const title = document.getElementById("titleInput").value;
    const purchasedDate = document.getElementById("dateInput").value;
    const returnDate = calculateReturnDate(purchasedDate);
  
    const book = { title, purchasedDate, returnDate };
  
    
    const storedBooks = localStorage.getItem("books");
    const books = storedBooks ? JSON.parse(storedBooks) : [];
  
    
    books.push(book);
  
    
    localStorage.setItem("books", JSON.stringify(books));
  
    
    document.getElementById("titleInput").value = "";
    document.getElementById("dateInput").value = "";
  
    
    renderBookList();
  };
  
  
  const deleteBook = (index) => {
    
    const storedBooks = localStorage.getItem("books");
    const books = storedBooks ? JSON.parse(storedBooks) : [];
  
    
    books.splice(index, 1);
  
    
    localStorage.setItem("books", JSON.stringify(books));
  
    
    renderBookList();
  };
  
  
  const calculateReturnDate = (purchasedDate) => {
    const dueDate = new Date(purchasedDate);
    dueDate.setDate(dueDate.getDate() + 20);
    return dueDate.toISOString().split("T")[0];
  };
  
  
  window.addEventListener("DOMContentLoaded", () => {
    renderBookList();
  });
  
 
  document.getElementById("addButton").addEventListener("click", addBook);
  
const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

document.getElementById('searchButton').addEventListener('click', function () {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    searchBooks(query);
  } else {
    alert('Please enter a search term.');
  }
});

function searchBooks(query) {
  fetch(`${API_URL}${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => displayResults(data.items))
    .catch((error) => console.error('Error fetching data:', error));
}

function displayResults(books) {
  const results = document.getElementById('results');
  results.innerHTML = ''; 

  if (!books || books.length === 0) {
    results.innerHTML = '<p>No books found.</p>';
    return;
  }

  books.forEach((book) => {
    const title = book.volumeInfo.title || 'No title available';
    const publishDate = book.volumeInfo.publishedDate || 'Date not found';
    const avgrating = book.volumeInfo.averageRating || 'Not rated yet';
    const ratingCount = book.volumeInfo.ratingsCount || 'No ratings yet';
    const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author';
    const description = book.volumeInfo.description || 'No description available';
    const link = book.volumeInfo.infoLink || '#';
    const thumbnail =
      book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail
        ? book.volumeInfo.imageLinks.thumbnail
        : 'https://via.placeholder.com/128x193.png?text=No+Image';

    const bookElement = document.createElement('div');
    bookElement.classList.add('book');

    bookElement.innerHTML = `
      <div class="book-content">
        <img src="${thumbnail}" alt="${title}">
        <div>
          <h3><a href="${link}" target="_blank">${title}</a></h3>
          <p><strong>Author(s):</strong> ${authors}</p>
          <p><strong>Published:</strong> ${publishDate}</p>
          <p><strong>Rating:</strong> ${avgrating} (${ratingCount} ratings)</p>
          <p>${description.substring(0, 200)}...</p>
        </div>
      </div>
    `;

    results.appendChild(bookElement);
  });
}

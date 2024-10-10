const movieInput = document.getElementById("movieInput");
const searchButton = document.getElementById("searchButton");
const movieList = document.getElementById("movieList");
const movieDetails = document.getElementById("movieDetails");
const prevPageButton = document.getElementById("prevPageButton");
const nextPageButton = document.getElementById("nextPageButton");

let currentPage = 1;
let currentQuery = '';

// API de recherche de films
const searchMovies = (query, page = 1) => {
    const url = `https://movies-api.julienpoirier-webdev.com/search/movies/${query}/${page}`;
    fetch(url)
        .then(response => response.json()) // Convertir la réponse en format JSON
        .then(data => {
            displayMovies(data.results); // Appeler une fonction pour afficher les films
            managePagination(data.page, data.total_pages); // Gérer la pagination
        })
        .catch(error => console.error('Erreur lors de la requête:', error)); // Gérer les erreurs
};

// Afficher la liste des films
const displayMovies = (movies) => {
  movieList.innerHTML = '';
  movies.forEach(movie => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie');

      const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/100x150?text=No+Image';

      movieItem.innerHTML = `
          <img src="${poster}" alt="${movie.title}">
          <div>
              <h3>${movie.title}</h3>
              <p>${movie.release_date}</p>
              <button onclick="showDetails(${movie.id})">Détails</button>
          </div>
      `;
      movieList.appendChild(movieItem);
  });
};


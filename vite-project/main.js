// Sélection des éléments DOM
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
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
            managePagination(data.page, data.total_pages);
        })
        .catch(error => console.error('Erreur lors de la requête:', error));
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

// Gérer la pagination
const managePagination = (page, totalPages) => {
    currentPage = page;
    prevPageButton.disabled = page === 1;
    nextPageButton.disabled = page === totalPages;
};

// Rechercher les films quand on clique sur "Rechercher"
searchButton.addEventListener('click', () => {
    const query = movieInput.value.trim();
    if (query) {
        currentQuery = query;
        currentPage = 1;
        searchMovies(query);
        movieDetails.style.display = 'none'; // Masquer les détails quand une nouvelle recherche est faite
    }
});

// Boutons de pagination
nextPageButton.addEventListener('click', () => {
    if (currentQuery) {
        searchMovies(currentQuery, currentPage + 1);
    }
});

prevPageButton.addEventListener('click', () => {
    if (currentQuery && currentPage > 1) {
        searchMovies(currentQuery, currentPage - 1);
    }
});

// Afficher les détails d'un film
const showDetails = (id) => {
    const url = `https://movies-api.julienpoirier-webdev.com/infos/movies/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovieDetails(data);
        })
        .catch(error => console.error('Erreur lors de la requête de détails:', error));
};

// Afficher les détails du film
const displayMovieDetails = (movie) => {
    movieDetails.style.display = 'block';
    movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Sortie:</strong> ${movie.release_date}</p>
        <p><strong>Description:</strong> ${movie.overview}</p>
        <p><strong>Note:</strong> ${movie.vote_average}/10</p>
        <button onclick="hideDetails()">Retour à la liste</button>
    `;
};

// Masquer les détails du film et revenir à la liste
const hideDetails = () => {
    movieDetails.style.display = 'none';
};










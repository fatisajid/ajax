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
        .then(response => response.json()) // Convertir la réponse en format JSON
        .then(data => {
            displayMovies(data.results); // Appeler une fonction pour afficher les films
            managePagination(data.page, data.total_pages); // Gérer la pagination
        })
        .catch(error => console.error('Erreur lors de la requête:', error)); // Gérer les erreurs
};











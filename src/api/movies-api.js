import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const apiKey = "ad3a977cd3271674fcaae0225d85ca39";

const fetchPopularMovies = ({ pageNamber }) => {
  return axios
    .get(`${baseURL}/movie/popular?api_key=${apiKey}&page=${pageNamber}`)
    .then(({ data }) => data)
    .catch((error) => error);
};
const fetchMovieDetails = (movieId) => {
  return axios
    .get(`${baseURL}/movie/${movieId}?api_key=${apiKey}`)
    .then(({ data }) => data)
    .catch((error) => error);
};

const fetchCast = (movieId) => {
  return axios
    .get(`${baseURL}/movie/${movieId}/credits?api_key=${apiKey}`)
    .then(({ data }) => data)
    .catch((error) => error);
};

const fetchReviews = (movieId) => {
  return axios
    .get(`${baseURL}/movie/${movieId}/reviews?api_key=${apiKey}`)
    .then(({ data }) => data)
    .catch((error) => error);
};

const fetchSearchMovies = ({ searchQuery = "" }) => {
  return axios
    .get(`${baseURL}/search/movie?query=${searchQuery}&api_key=${apiKey}`)
    .then(({ data }) => data)
    .catch((error) => error);
};

export default {
  fetchPopularMovies,
  fetchMovieDetails,
  fetchSearchMovies,
  fetchCast,
  fetchReviews,
};

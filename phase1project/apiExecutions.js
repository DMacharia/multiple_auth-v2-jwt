//api key and URLs
const API_KEY = "7d149566af8dd84bd3a1e75d071091be";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function generateURL(path) {
	const URL = `https://api.themoviedb.org/3${path}?api_key=7d149566af8dd84bd3a1e75d071091be`;
	return URL;
}

function requestMovies(url, onSuccess, onFailure) {
	fetch(url) //display movieposters
		.then((res) => res.json())
		.then(onSuccess)
		.catch(onFailure);
}

function searchMovie(value) {
	const path = "/search/movie"; //path specification
	const url = generateURL(path) + "&query=" + value;

	requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies() {
	const path = "/movie/upcoming";
	const url = generateURL(path);
	const render = renderMovies.bind({ title: "Upcoming Movies" });

	requestMovies(url, render, handleError);
}

function getTopRatedMovies() {
	const path = "/movie/top_rated";
	const url = generateURL(path);
	const render = renderMovies.bind({ title: "Top Rated Movies" });

	requestMovies(url, render, handleError);
}

function getPopularMovies() {
	const path = "/movie/popular";
	const url = generateURL(path);
	const render = renderMovies.bind({ title: "Popular Movies" });

	requestMovies(url, render, handleError);
}

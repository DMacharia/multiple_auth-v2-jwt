//DOM elements
const submitElement = document.getElementById("searchTab");
const inputElement = document.getElementById("inputValue");
const movieSearch = document.getElementById("movie-search");
const movieContainer = document.getElementById("movie-container");

function movieSection(movies) {
	const section = document.createElement("section");
	section.classList = "section";

	movies.map((movie) => {
		if (movie.poster_path) {
			const img = document.createElement("img");
			img.src = IMAGE_URL + movie.poster_path;
			img.setAttribute("data-movie-id", movie.id);

			section.appendChild(img);
		}
	});
	return section;
}

//create DOM elements
function createContainer(movies, title = "") {
	const movieElement = document.createElement("div"); //div to nest elements
	movieElement.setAttribute("class", "movie");

	const header = document.createElement("h2");
	header.innerText = title;

	const content = document.createElement("div");
	content.classList = "content";

	const contentClose = `<button id="content-close" aria-label="Close"></button>`;
	content.innerHTML = contentClose;

	const section = movieSection(movies);

	movieElement.appendChild(header);
	movieElement.appendChild(section);
	movieElement.appendChild(content);

	return movieElement;
}

function renderSearch(data) {
	movieSearch.innerHTML = ""; //new search clears old search
	const movies = data.results;
	const movieBlock = createContainer(movies); //assign variable for created elements
	movieSearch.appendChild(movieBlock); //appending movieBlock to movie-search Div
	console.log(data);
}

function renderMovies(data) {
	const movies = data.results;
	const movieBlock = createContainer(movies, this.title);
	movieContainer.appendChild(movieBlock);
}

function handleError(error) {
	console.log("Error: ", error);
}

submitElement.addEventListener("click", (e) => {
	e.preventDefault();
	const value = inputElement.value;
	searchMovie(value);

	inputElement.value = ""; // reset
});

function createIframe(video) {
	const iframe = document.createElement("iframe");
	iframe.src = `https://www.youtube.com/embed/${video.key}`;
	iframe.width = 360;
	iframe.height = 315;
	iframe.allowFullscreen = true;

	return iframe;
}

function createTrailerTemplate(data, content) {
	//TODO
	//dilay movie videos
	content.innerHTML = `<button id="content-close" aria-label="Close"></button>`;
	console.log("videos:", data);
	const videos = data.results;
	const length = videos.length > 4 ? 4 : videos.length;
	const iframeContainer = document.createElement("div");

        for (let i = 0; i < length; i++) {
            //loop over videos max 4
            const video = videos[i];
            const iframe = createIframe(video);
            iframeContainer.appendChild(iframe);
            content.appendChild(iframeContainer);
        } 
}

//trailer section
document.addEventListener("click", (e) => {
	const target = e.target;

	if (target.tagName.toLowerCase() === "img") {
		const movieId = target.dataset.movieId;
		console.log("movieId: ", movieId);
		const section = e.target.parentElement; //target parent section
		const content = section.nextElementSibling; //getting to content
		content.classList.add("content-display");

		const path = `/movie/${movieId}/videos`;
		const trailerURL = generateURL(path);

		fetch(trailerURL) //fetch movie trailer
			.then((res) => res.json())
			.then((data) => createTrailerTemplate(data, content)) //
			.catch((error) => console.log("error:", error));
	}

	if (target.id === "content-close") {
		//when we click an image we want to fetch movie videos
		const content = target.parentElement;
		content.classList.remove("content-display");
	}
});

document.addEventListener("DOMContentLoaded", () => {
	searchMovie("Thor");
	// searchMovieGenre();
	getUpcomingMovies();
	getTopRatedMovies();
	getPopularMovies();
});

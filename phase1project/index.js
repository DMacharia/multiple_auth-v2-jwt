//api key and URLs
const API_KEY = "7d149566af8dd84bd3a1e75d071091be";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function generateURL(path) {
	const URL = `https://api.themoviedb.org/3${path}?api_key=7d149566af8dd84bd3a1e75d071091be`;
	return URL;
}

//DOM elements
const submitElement = document.getElementById("searchTab");
const input = document.getElementById("inputValue");
const movieSearch = document.getElementById("movie-search");

function movieSection(movies) {
	return movies.map((movie) => {
		if (movie.poster_path)
			return `<img src = ${IMAGE_URL + movie.poster_path} 
            data-movie-id = ${movie.id}
            />`;
	});
}

//create DOM elements
function createContainer(movies) {
	const movieElement = document.createElement("div"); //div to nest elements
	movieElement.setAttribute("class", "movie");

	const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

	movieElement.innerHTML = movieTemplate;
	return movieElement;
}
function renderSearchMovies(data) {
	movieSearch.innerHTML = ""; //new search clears old search
	const movies = data.results;
	const movieBlock = createContainer(movies); //assign variable for created elements
	movieSearch.appendChild(movieBlock); //appending movieBlock to movie-search Div
	console.log(data);
}

submitElement.addEventListener("click", (e) => {
	e.preventDefault();
	const inputValue = input.value;
	path = "/search/movie"; //path specification
	const posterURL = generateURL(path) + "&query=" + inputValue;

	fetch(posterURL) //display movieposters
		.then((res) => res.json())
		.then(renderSearchMovies)
		.catch((error) => console.log("error:", error));

	input.value = ""; // reset
});

function createIframe(video) {
	const iframe = document.createElement("iframe");
	iframe.src = `https://www.youtube.com/embed/${video.key}`;
	iframe.width = 360;
	iframe.height = 315;
	iframe.allowFullscreen = true;

	return iframe;
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
			.then((data) => {
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
			})
			.catch((error) => console.log("error:", error));
	}

	if (target.id === "content-close") {
		//when we click an image we want to fetch movie videos
		const content = target.parentElement;
		content.classList.remove("content-display");
	}
});

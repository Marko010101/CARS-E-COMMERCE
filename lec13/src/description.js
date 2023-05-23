const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';

const main = document.getElementById("main");
const similar = document.getElementById("similar");

const movie = localStorage.getItem("movie");
const movieData = JSON.parse(movie);

const movieDesc = document.createElement("div");
movieDesc.id = "description";
movieDesc.classList.add("container");

movieDesc.innerHTML = `
    <img src="${IMG_PATH + movieData.backdrop_path}">
    <div class="row mt-3 heightt">
        <div class="col-4">
            <img src="${IMG_PATH + movieData.backdrop_path}">
        </div>
        <div class="col-8 back-color">
            <h3>movie title - ${movieData.title}</h3>
            <p>language - ${movieData.original_language}</p>
            <p>overview:</p>
            <p>${movieData.overview}</p>
            <p>IMDb - ${movieData.vote_average}</p>
        </div>
    </div>
`;

// Append movie description to the main element
main.appendChild(movieDesc);

// Move the similar div below the main div
main.parentNode.insertBefore(similar, main.nextSibling);

getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    const smallMovies = (movies = movies
        .sort(() => Math.random() - Math.random()).slice(0, 3));

        smallMovies.forEach((movie) => {
        const { title, original_language, overview, vote_average, poster_path } = movie;
        const voteAverage = movie.vote_average;
        let voteClass = "";

        if (voteAverage < 5) {
            voteClass = "red";
        } else if (voteAverage > 5 && voteAverage <= 7) {
            voteClass = "yellow";
        } else if (voteAverage > 7) {
            voteClass = "green";
        }

        const movieEl = document.createElement("div");
        movieEl.classList.add("col-3");
        movieEl.innerHTML = `
            <div class="p-3">
                <div class="movies">
                    <img src="${IMG_PATH + poster_path}">
                    <div class="movie-box">
                        <h3>movie title - ${title}</h3>
                        <p>language - ${original_language}</p>
                        <p>overview:</p>
                        <p>${overview}</p>
                    </div>
                    <span>
                        <p class="${voteClass}">IMDb - ${vote_average}</p>
                    </span>
                </div>
            </div>
        `;
        similar.appendChild(movieEl);

        movieEl.addEventListener("click", () => {
            localStorage.setItem("movie", JSON.stringify(movie));
            window.location = "movie.html";
        });
    });
}

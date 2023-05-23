const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");


getMovies(API_URL);

async function getMovies(url) {
  console.log(url);
  const res = await fetch(url);
  console.log(res);
  const data = await res.json();
  console.log(data.results);

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = " ";
  movies.forEach((movie) => {
    const {title,original_language, overview, vote_average, poster_path} = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("col-3"); 

    const voteAverage = movie.vote_average;
    let voteClass = "";

    if (voteAverage < 5) {
      voteClass = "red";
    } else if (voteAverage > 5 && voteAverage <= 7) {
      voteClass = "yellow";
    } else if (voteAverage > 7) {
      voteClass = "green";
    }

    movieEl.innerHTML = `
  <div class="p-3">
    <div class="movies">
      <img src="${IMG_PATH + poster_path}">
      <div class="movie-box">
      <h3>movie title - ${title}</h3>
      <p>language - ${original_language}</p>
      <p>overview:</p>
      <p> ${overview}</p>  
      </div>
      <span>
      <p class="${voteClass}">IMDb - ${vote_average}</p>
      </span>
    </div>
  </div>
    `;

    main.appendChild(movieEl);

    movieEl.addEventListener("click", () => {
      localStorage.setItem("movie", JSON.stringify(movie));
      Window.location = "movie.html"
  });
  });
}

form.addEventListener("submit", (e) =>{
  e.preventDefault();
  const searchTerm = search.value;
  
  console.log(searchTerm)

   if(searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm); 
   
    search.value = "";

    
   } else{
    window.location.reload;
   }
});


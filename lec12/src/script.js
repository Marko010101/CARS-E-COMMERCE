// const crypto = [
//     {
//         name: "bitcoin", 
//         price: 27000 +"$",  
//     },
//     {
//         name: "ethereum", 
//         price: 1900 +"$", 
//     },
//     {
//         name: "solana", 
//         price: 19.2 +"$",
//     }
// ];


// const container = document.getElementById("crypto_container");

// crypto.forEach((cryptos) => {
//     const cryptosHTML = `
//     <div class="crypto"></div>
//     <h2>${cryptos.name} </h2>
//     <p>price : $${cryptos.price}</p>
//     `;
//     container.innerHTML += cryptosHTML; 
// });

// let users = {}; 
// (users.name = "tom", 
// users.display = () => {
//     console.log(user.name);
// });


// function createUser (pName, pAge) {
//     return {
//         name : pName,
//         age : pAge,
//         displayInfo : function() {
//             document.write("name" + " " + this.name + " " + "age" + " " + this.age)
//         },
//         driveCar: function() {
//             document.write(" "+this.name+ " " + "drives"+ " " + car.name);
//         }
//     }
// }

// function createCar (mName, mYear) {
//     return{
//         name : mName,
//         year : mYear, 
//     };
// }

// const tom = createUser("tom", 25);

// tom.displayInfo();


// const car = createCar("Mazda", 1988);

// tom.driveCar(car);


const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.querySelector("#main");

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
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie"); 

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
      <div>
        <h3>movie title - ${movie.title}</h3>
        <h5>language - ${movie.original_language}</h5>
        <h4>overview:</h4>
        <p> ${movie.overview}</p>
        <h6 class="${voteClass}">IMDb - ${movie.vote_average}</h6>
        <img src="${IMG_PATH}${movie.poster_path}">
      </div>
    `;

    main.appendChild(movieEl);
  });
}


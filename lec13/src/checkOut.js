const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'     

getMovies(API_URL);


const seats = [
    { id: 1, price: "10" },
    { id: 2, price: "10" },
    { id: 3, price: "10" },
    { id: 4, price: "10" },
    { id: 5, price: "10" },
    { id: 6, price: "10" },
    { id: 7, price: "10" },
    { id: 8, price: "10" },
    { id: 9, price: "10" },
  ];
  
  seats.forEach(seat => {
    console.log(`Seat ID: ${seat.id}, Price: $${seat.price}`);
  });
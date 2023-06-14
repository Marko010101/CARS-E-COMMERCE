import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { ref as sRef } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
const firebaseConfig = {
  apiKey: "AIzaSyBt0Gal6oePzhLkHYPZevgp83qQLNBATMM",
  authDomain: "markos-project---1st.firebaseapp.com",
  projectId: "markos-project---1st",
  storageBucket: "markos-project---1st.appspot.com",
  messagingSenderId: "606433123430",
  appId: "1:606433123430:web:3b2dbd6e2e29dc310de1a7",
  measurementId: "G-3P6NPRETJ0",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const product_container = document.getElementById("product_container");
get(ref(database, "/products/cars/"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);

      const urlParams = new URLSearchParams(window.location.search);
      const carName = urlParams.get("name");
      const carId = urlParams.get("id");
      const dataArray = Object.values(data); // Convert data object to an array
      const car = dataArray.find(
        (car) => car.id == carId && car.model == carName
      );
      console.log(car);

      const productEl = document.createElement("container");
      productEl.innerHTML = `
        <div class="mt-5 product_info">
          <div class="name-desc text-center mb-4 mt-2"><b>model:</b> ${
            car.company
          } ${car.model}</div>
          <div class="row">
            <div class="col-6">
              <img class="description-image" src="${car.image || car.img}">
            </div> 
            <div class="col-6 row align-items-center mt-5">
              <div class="col-1"></div>   
              <div class="col-5 mb-css">
                <div class="product_price mt-1"><b>price:</b> ${
                  car.price
                } </div>
                <div class="product_price mt-1"><b>color:</b> ${car.color}</div>
                <div class="product_price mt-1"><b>year:</b> ${car.year}</div>
              </div>   
            </div>  
          </div>
        </div>
      `;
      product_container.appendChild(productEl);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
    alert(error);
  });

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
            } ${car.model}
            </div>
            <div class="row">
                  <div class="col-6">
                    <img class="description-image" src="${
                      car.image || car.img
                    }">
                  </div> 

              <div class="col-6 row align-items-center">
                <div class="col-1">
                </div>   
                <div class="col-5 mb-css">
                  <div class="mt-1"><b>price:</b> ${car.price} 
                  </div>
                  <div class="mt-1"><b>color:</b> ${car.color}</div>
                  <div class=" mt-1"><b>year:</b> ${car.year}</div>
                </div>   
              </div>  
            </div>
        </div>
      `;
      product_container.appendChild(productEl);

      function showCars(car) {
        const randomCars = car
          .sort(() => Math.random() - Math.random())
          .slice(0, 3);
        return randomCars;
      }

      // Usage
      const randomCarList = showCars(dataArray);

      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row", "justify-content-center");
      randomCarList.forEach((car) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-4");

        const newDiv = document.createElement("div");
        newDiv.classList.add("mt-3", "items-desc");

        newDiv.innerHTML = `
    <img class="random-image" id="description" src="${car.image || car.img}">
    <div class="product_info text-center mb-5">
      <div class="product_name mt-2"><b>model:</b> ${car.company} ${
          car.model
        }</div>
      <div class="mt-1"><b>year:</b> ${car.year}</div>
      <div class="mt-1"><b>color:</b> ${car.color}</div>
      <div class="mt-1"><b>price:</b> ${car.price}</div>
    </div>
  `;

        colDiv.appendChild(newDiv);
        rowDiv.appendChild(colDiv);

        newDiv.addEventListener("click", () => {
          const carModel = car.model;
          const carId = car.id;
          window.location.href = `description.html?name=${carModel}&id=${carId}`;
        });
      });

      product_container.appendChild(rowDiv);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
    alert(error);
  });

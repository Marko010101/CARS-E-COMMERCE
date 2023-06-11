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

const Loading = (state) => {
  if (state == true) {
    const loader = document.getElementById("loader");
    loader.classList.remove("d-none"); // Show the loader
  } else {
    const loader = document.getElementById("loader");
    loader.classList.add("d-none"); // Hide the loader
  }
  console.log(state);
};

const product_container = document.getElementById("product_container");
get(ref(database, "/products/cars/"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      Loading(true);
      const data = snapshot.val();
      console.log(data);

      // ...

      Object.keys(data).map((product) => {
        const productEl = document.createElement("div");
        productEl.classList.add("col-3");
        productEl.innerHTML = `
    <div class="mt-3">
        <img class="product_image" id="description" src="${
          data[product].image || data[product].img
        }" >
        <div class="product_info text-center mb-5">
            <div class="product_name mt-2"><b>model:</b> ${
              data[product].company
            } ${data[product].model}</div>
            <div class="product_price mt-1"><b>price:</b> ${
              data[product].price
            }</div>
            <div class="product_price mt-1"><b>color:</b> ${
              data[product].color
            }</div>
            <div class="product_price mt-1"><b>year:</b> ${
              data[product].year
            }</div>
            <button class="btn btn-primary mt-1">Add to Cart</button>
        </div>
    </div>
    `;

        product_container.appendChild(productEl);
        Loading(false);
        const description = productEl.querySelector("#description");
        description.addEventListener("click", () => {
          const carName = data[product].model;
          const carId = data[product].id;
          window.location.href = `description.html?name=${carName}&id=${carId}`;
        });
      });
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
    alert(error);
  });
// function addToCart(productId) {
//   let cart = [];

//   function addToCart() {
//     const productEl = event.target.parentNode;
//     const productName = productEl.querySelector(".product_name").innerText;
//     const productDescription =
//       productEl.querySelector(".product_price").innerText;
//     const product = {
//       name: productName,
//       description: productDescription,
//     };

//     cart.push(product);

//     alert("Product added to cart!");
//     console.log(cart);
//   }
// }

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {
  signOut,
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
import firebaseConfig from "./firebaseConfig.js";

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

const openCart = document.getElementById("openCart");

document.addEventListener("DOMContentLoaded", () => {
  const openCart = document.getElementById("openCart");

  openCart.addEventListener("click", () => {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  });

  const product_container = document.getElementById("product_container");
  get(ref(database, "/products/cars/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        Loading(true);
        const data = snapshot.val();
        console.log(data);

        const decrementValueid = document.querySelector("#decrementValueid");
        decrementValueid.addEventListener("click", function () {
          var value = parseInt(document.getElementById("number").value, 10);
          value = isNaN(value) ? 0 : value;
          if (value > 0) {
            value--;
            document.getElementById("number").value = value;
            const backColor = document.getElementById("number");
            const colorChange = backColor.value;
            const numberInput = parseInt(colorChange, 10);

            if (numberInput === 0) {
              backColor.style.backgroundColor = "red";
            } else if (numberInput >= 1 && numberInput <= 5) {
              backColor.style.backgroundColor = "yellow";
            } else if (numberInput >= 6) {
              backColor.style.backgroundColor = "green";
            }

            // Get the existing cart items from local storage
            var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

            // Remove the last item from the cart items array
            cartItems.pop();

            // Save the updated cart items to local storage
            localStorage.setItem("cart", JSON.stringify(cartItems));
          }
        });

        Object.keys(data).map((product) => {
          const productEl = document.createElement("div");
          productEl.classList.add("col-3");
          productEl.innerHTML = `
            <div class="mt-3 items">
              <img class="product_image" id="description" src="${
                data[product].image || data[product].img
              }">
              <div class="product_info text-center mb-5">
                <div class="product_name mt-2"><b>model:</b> ${
                  data[product].company
                } ${data[product].model}</div>
                <div class=" mt-1" ><b>year:</b> ${data[product].year}</div>
                <div class=" mt-1"><b>color:</b> ${data[product].color}</div>
                <div class="mt-1"><b>price:</b> ${data[product].price}</div>
                <button id="btn-cart${product}" type="button" class="btn btn-primary mt-1">Add to Cart</button>
              </div>
            </div>
          `;

          product_container.appendChild(productEl);
          Loading(false);

          const description = productEl.querySelector("#description");
          description.addEventListener("click", () => {
            const carModel = data[product].model;
            const carId = data[product].id;
            window.location.href = `description.html?name=${carModel}&id=${carId}`;
          });

          const addToCart = productEl.querySelector(`#btn-cart${product}`);
          addToCart.addEventListener("click", function () {
            var value = parseInt(document.getElementById("number").value, 10);
            value = isNaN(value) ? 0 : value;
            if (value < Object.keys(data).length) {
              value++;
              document.getElementById("number").value = value;

              const backColor = document.getElementById("number");
              const colorChange = backColor.value;
              const numberInput = parseInt(colorChange, 10);

              if (numberInput === 0) {
                backColor.style.backgroundColor = "red";
              } else if (numberInput >= 1 && numberInput <= 5) {
                backColor.style.backgroundColor = "yellow";
              } else if (numberInput >= 6) {
                backColor.style.backgroundColor = "green";
              }

              // Get the product details
              const selectedProduct = data[product];

              // Get the existing cart items from local storage or initialize an empty array
              var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

              // Add the selected product to the cart items
              cartItems.push(selectedProduct);

              // Save the updated cart items to local storage
              localStorage.setItem("cart", JSON.stringify(cartItems));

              // Update the cart items inside the cartItemsInside element
              const cartItemsInside =
                document.getElementById("cartItemsInside");
              const cartItemEl = document.createElement("div");
              cartItemEl.classList.add("col-2");
              cartItemEl.innerHTML = `
             <div class="cart-Inside">
                      <img class="car-image-cart " id="description" src="${
                        selectedProduct.image || selectedProduct.img
                      }">
                      <div class="text-center mb-2 Info-Cart mt-2">
                      <div class="car-info-inside"><b>model:</b> ${
                        selectedProduct.company
                      }${selectedProduct.model}
                      </div>
                      <div class="" ><b>year:</b> ${
                        selectedProduct.year
                      }</div>        
                      <div class=""><b>color:</b> ${selectedProduct.color}</div>

                      <div class=" mt-1"><b>price:</b> ${
                        selectedProduct.price
                      }</div>
                      
                      </div>
                          <input
                          type="button"
                          id="decrementValueid"
                          value="-"
                          class="minus-inside"
                        />
              </div>
              `;

              cartItemsInside.appendChild(cartItemEl);
            }
          });
        });

        document.getElementById("number").value = "0";
        document.getElementById("number").style.backgroundColor = "red";
        document.getElementById("counting");
      } else {
        console.log("No data available");
      }
    })

    .catch((error) => {
      console.error(error);
      alert(error);
    });

  if (localStorage.getItem("accessToken")) {
  } else {
    window.location.href = "register.html";
    alert(
      "To access the full functionality of our website, please register and create an account. We're excited to have you on board!"
    );
  }

  const buttonSignOut = document.getElementById("signOut");

  buttonSignOut.addEventListener("click", () => {
    const authh = getAuth();
    signOut(authh)
      .then(() => {
        localStorage.removeItem("accessToken");
        window.location.href = "index.html";
        alert("Logout successful. Thank you for using our services!");
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

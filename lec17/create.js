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

const productSubmit = document.getElementById("createProd");

productSubmit.addEventListener("click", (e) => {
  const company = document.getElementById("company").value;
  const model = document.getElementById("model").value;
  const year = document.getElementById("year").value;
  const color = document.getElementById("color").value;
  const img = document.getElementById("img").value;
  const price = document.getElementById("price").value;

  const uid = Math.floor(Math.random() * 100000000000000000);

  set(ref(database, "/products/cars/" + uid), {
    company: company,
    model: model,
    year: year,
    color: color,
    img: img,
    id: uid,
    price: price,
  })
    .then(() => {
      alert("Product Added");
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
});

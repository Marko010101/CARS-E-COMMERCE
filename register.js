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

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(email.value, password.value);
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Registration
      const user = userCredential.user;
      localStorage.setItem("accessToken", user.accessToken);
      console.log(user);
      alert("You have registered successfully!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

// Check if user is logged in and redirect if necessary
if (localStorage.getItem("accessToken")) {
  window.location.href = "admin.html";
}

const signEmail = document.getElementById("signemail");
const signPassword = document.getElementById("signpassword");
const signIn = document.getElementById("signIn");

signIn.addEventListener("submit", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, signEmail.value, signPassword.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.accessToken);
      localStorage.setItem("accessToken", user.accessToken);

      if (user) {
        window.location.href = "admin.html";
      } else {
        alert("Email or Password is incorrect");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("An error occurred during sign-in. Please try again.");
    });
});

if (localStorage.getItem("accessToken")) {
  window.location.href = "admin.html";
}

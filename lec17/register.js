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
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id",
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
      alert("You are registered!");

      // Redirect to admin.html after successful registration
      window.location.href = "admin.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

// Check if user is logged in and redirect if necessary
if (localStorage.getItem("accessToken")) {
  window.location.href = "admin.html";
} else {
  // If user is not logged in or registered, display an alert
  alert("You are not logged in!");
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
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

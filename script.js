import { handleRegister } from "./components/register.js";
import { handleLogin } from "./components/login.js";

const toggleSignIn = () => {
  const loginForm = document.querySelector(".login-form");
  const registerForm = document.querySelector(".register-form");
  if (loginForm.style.display !== "block") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }
};

const button = document.querySelectorAll(".toggle");
button.forEach((ele) => {
  ele.addEventListener("click", toggleSignIn);
});

const registerButton = document.querySelector(".register-button");
const loginButton = document.querySelector(".login-button");
registerButton.addEventListener("click", handleRegister);
loginButton.addEventListener("click", handleLogin);
const skipButtons = document.querySelectorAll(".skip");
skipButtons.forEach((b) => {
  b.addEventListener("click", () => {
    sessionStorage.setItem("skipped", true);
    window.location.replace("/components/static/home.html");
  });
});

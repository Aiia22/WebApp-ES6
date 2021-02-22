//Global variables
const mainNav = document.getElementById("nav1");
const searchNav = document.getElementById("nav2");
const register = document.getElementById("registerForm");
const login = document.getElementById("loginForm");
const username = document.getElementById("usernameR");
const email = document.getElementById("emailR");
const password = document.getElementById("passwordR");
const passwordCheck = document.getElementById("passwordCheckR");
const usernameL = document.getElementById("usernameL");
const emailL = document.getElementById("emailL");
const passwordL = document.getElementById("passwordL");

//Display SearchBox
function searchBoxNav(event) {
  event.preventDefault();
  let displaySearchNav = searchNav.style.display;
  let displayMainNav = mainNav.style.display;

  if (displaySearchNav === "block" && displayMainNav === "none") {
    searchNav.style.display = "none";
    mainNav.style.display = "block";
  } else {
    searchNav.style.display = "block";
    mainNav.style.display = "none";
  }
}

//Display log toggle
function logToggle(event) {
  event.preventDefault();
  document.querySelector(".overlay").classList.toggle("open");
}

function userLogReg(event) {
  event.preventDefault();
  let showRegisterToggle = register.style.display;
  let showLoginToggle = login.style.display;

  if (showRegisterToggle === "block" && showLoginToggle === "none") {
    register.style.display = "none";
    login.style.display = "block";
  } else {
    register.style.display = "block";
    login.style.display = "none";
  }
}

// Dipslay user menu
function accessMenu(event) {
  event.preventDefault();
  if (document.querySelector(".overlayMenu").className === "overlayMenu") {
    document.querySelector(".overlayMenu").classList.toggle("open");
  } else if (
    document.querySelector(".overlayMenu").className === "overlayMenu close"
  ) {
    document.querySelector(".overlayMenu ").classList.replace("close", "open");
  } else {
    document.querySelector(".overlayMenu").classList.replace("open", "close");
  }
}

// Log toggle --> register
register.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputsSignUp();
});

function checkInputsSignUp() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const passwordCheckValue = passwordCheck.value.trim();

  if (usernameValue === "") {
    setErrorFor(username, "Username is missing");
  } else {
    setSuccessFor(username);
  }
  if (emailValue === "") {
    setErrorFor(email, "Email is missing");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  } else {
    setSuccessFor(email);
  }
  if (passwordValue === "") {
    setErrorFor(password, "Password is missing");
  } else {
    setSuccessFor(password);
  }
  if (passwordCheckValue === "") {
    setErrorFor(passwordCheck, "Password is missing");
  } else if (passwordValue !== passwordCheckValue) {
    setErrorFor(passwordCheck, "Password does not match");
  } else {
    setSuccessFor(passwordCheck);
  }
  submitInputsSignUp();
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector("small");
  errorMessage.innerText = message;
  formControl.className = "form-controler error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-controler success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function submitInputsSignUp() {
  const usernameSuccess = username.parentElement;
  const emailSuccess = email.parentElement;
  const passwordSuccess = password.parentElement;
  const passwordCheckSuccess = passwordCheck.parentElement;

  if (
    usernameSuccess.className === "form-controler success" &&
    emailSuccess.className === "form-controler success" &&
    passwordSuccess.className === "form-controler success" &&
    passwordCheckSuccess.className === "form-controler success"
  ) {
    postFetchForSignUp();
  }
}

function postFetchForSignUp() {
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: usernameL.value,
      email: emailL.value,
      password: passwordL.value,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      localStorage.clear(); // If user signed in => clear it up

      localStorage.user = user; // Then store the user
      displayUserSetUp(user);
    });
}

// Log toggle --> login
function userLogin() {
  login.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailL.value,
        password: passwordL.value,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        fetch("http://localhost:3000/" + user.userId, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((user) => {
            localStorage.clear(); // If user signed in => clear it up
            localStorage.user = user; // Then store the user
            console.log(user);
            valideUser(user);
          });
      });
  });
}

function valideUser(user) {
  console.log(user, "valideUser avant");
  if (user) {
    document.querySelector(".overlay").classList.remove("open");
    displayUserSetUp(user);
  } else if (res === "Invalid username or password...") {
    alert("Login was unsuccessful, please check your email or password"); //***** issue!!!!!!
  }
  console.log(user, "valideUser après");
}

// Log toggle --> login/register (common functions)
function displayUserSetUp(user) {
  let username = user.name;
  let level = user.level;
  let tier = user.tier;
  console.log(username, "display username");
  if (username !== "undefined" || username !== "null") {
    document.getElementById("userN").innerHTML = username;
    //login.reset();
  } else {
    document.getElementById("userN").innerHTML = "Hello!";
    console.log("azert");
  }
  document.querySelector(".fa-caret-down").classList.add("visible");

  console.log(username, "display username");
}

//Login out
function logOut() {
  document.getElementById("userN").innerHTML = "";
  document.querySelector(".fa-caret-down").classList.remove("visible");
  document.querySelector(".overlayMenu").classList.replace("open", "close");
  localStorage.clear();
  console.log("logout");
}

//// alternative storage:

/* function storeInputsSignUp() {
  let userDataSignUp = {
    username: document.getElementById("usernameR").value,
    email: document.getElementById("emailR").value,
    password: document.getElementById("passwordR").value,
  };
  localStorage.setItem("userDataSignUp", JSON.stringify(userDataSignUp));
  DisplayUsername(document.getElementById("usernameR").value);
} */

// Log toggle --> login
/* function validateForm(event) {
  event.preventDefault();
  const emailLValue = emailL.value.trim();
  const passwordLValue = passwordL.value.trim();
  const userData = JSON.parse(window.localStorage.getItem("userDataSignUp"));
  console.log(userData);
  const email = userData.email.trim();
  const username = userData.username.trim();
  console.log(username);
  const password = userData.password.trim();

  if (emailLValue === email && passwordLValue === password) {
    userLogin();
  } else {
    alert("Login was unsuccessful, please check your email or password");
    return false;
  }
} */

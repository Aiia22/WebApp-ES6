//Global variables
const mainNav = document.getElementById('nav1');
const searchNav = document.getElementById('nav2');
const register= document.getElementById('registerForm');
const login= document.getElementById('loginForm');
const username = document.getElementById('usernameR');
const email = document.getElementById('emailR');
const password = document.getElementById('passwordR');
const passwordCheck = document.getElementById('passwordCheckR');
const usernameL = document.getElementById('usernameL');
const emailL = document.getElementById('emailL');
const passwordL= document.getElementById('passwordL');



//Display SearchBox
function searchBoxNav(event){
    event.preventDefault();
    let displaySearchNav=searchNav.style.display;
    let displayMainNav= mainNav.style.display;

    if(displaySearchNav === 'block'&& displayMainNav ==='none'){
        searchNav.style.display='none';
        mainNav.style.display='block';
    }else {
        searchNav.style.display='block';
        mainNav.style.display='none';
    }
}

//Display log toggle
function logToggle(event){
    event.preventDefault();
    document.querySelector(".overlay").classList.toggle("open");
}

function userLog(event){
    event.preventDefault();
    let showRegisterToggle = register.style.display;
    let showLoginToggle = login.style.display;

    if(showRegisterToggle === 'block' && showLoginToggle ==='none'){
        register.style.display = "none";
        login.style.display = "block";
    }else{
        register.style.display = "block";
        login.style.display = "none";
    }
}

// Dipslay user menu
 function accessMenu(event){
    event.preventDefault();
     if(document.querySelector(".overlayMenu").className === "overlayMenu"){
        document.querySelector(".overlayMenu").classList.add("open");
     }else if(document.querySelector(".overlayMenu").className === "overlayMenu close") {
        document.querySelector(".overlayMenu ").classList.replace("close","open");
     } else{
          document.querySelector(".overlayMenu").classList.replace("open","close");
         
     }
 }
  

// Log toggle --> register
register.addEventListener('submit', (e)=>{
    e.preventDefault();
    checkInputsSignUp();
});

function checkInputsSignUp(){
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordCheckValue = passwordCheck.value.trim();

    if (usernameValue === ''){
        setErrorFor(username, 'Username is missing');
    }else{
        setSuccessFor(username);
    }
     if (emailValue === ''){
        setErrorFor(email, 'Email is missing');
    }else if(!isEmail(emailValue)){
        setErrorFor(email, 'Email is not valid');
    }
    else{
        setSuccessFor(email);
    }
    if (passwordValue === ''){
        setErrorFor(password, 'Password is missing');
    }else{
        setSuccessFor(password);
    } 
     if (passwordCheckValue === ''){
        setErrorFor(passwordCheck, 'Password is missing'); 
    }else if(passwordValue !== passwordCheckValue){
        setErrorFor(passwordCheck, 'Password does not match');
    } 
    else{
        setSuccessFor(passwordCheck);
    }
    submitInputsSignUp();
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('small');
    errorMessage.innerText = message;
    formControl.className = 'form-controler error';
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-controler success'
}

function isEmail(email){
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function submitInputsSignUp(){
    const usernameSuccess = username.parentElement;
    const emailSuccess = email.parentElement;
    const passwordSuccess = password.parentElement;
    const passwordCheckSuccess = passwordCheck.parentElement;

    if(usernameSuccess.className === 'form-controler success' && emailSuccess.className === 'form-controler success' && passwordSuccess.className === 'form-controler success' && passwordCheckSuccess.className === 'form-controler success'){
        storeInputsSignUp();
        //postFetchForSignUp();
    }
}

 function storeInputsSignUp(){
    let userDataSignUp = {
        username: document.getElementById('usernameR').value,
        email: document.getElementById('emailR').value,
        password: document.getElementById('passwordR').value,
    }
    localStorage.setItem('userDataSignUp', JSON.stringify(userDataSignUp));
    DisplayUsername(document.getElementById('usernameR').value);
}

/*  function postFetchForSignUp() {
  let usernameL = document.getElementById("usernameL")
  let emailL = document.getElementById("emailL")
  let passwordL = document.getElementById("passwordL")
  
  fetch('http://localhost:3000/users', { 
    method: 'POST',
    headers: {
      'Content-Type':'Assets/JSON/application.json',
      'Accept':'Assets/JSON/application.json',
    },
    body: JSON.stringify({
      usernameLValue: usernameL.value,
      emailLValue: emailL.value,
      passwordLValue: passwordL.value
    })
  })
  .then(res=>res.json())
  .then(user => {
    localStorage.clear() // If user signed in => clear it up                                 
                         
    localStorage.id = user.id  // Then store the id 
    logOut()
  })
} */ 


// Log toggle --> login
login.addEventListener('submit', (e)=>{
   e.preventDefault();
    validateForm();
});

function validateForm(){
    const emailLValue = emailL.value.trim();
    const passwordLValue = passwordL.value.trim();
    const userData = JSON.parse(window.localStorage.getItem('userDataSignUp'));
    console.log(userData);
    const email = userData.email.trim();
    const username = userData.username.trim();
    console.log(username);
    const password = userData.password.trim();
    
    if(emailLValue  === email && passwordLValue === password){
        DisplayUsername(username)
    }else{
        alert("Login was unsuccessful, please check your email or password");
        return false;
    }
}

/* signInButton.addEventListener('click', e => {
  signIn()
  let form = signDiv.querySelector('.sign-in')
  let usernameInput = document.querySelector("#username")
  form.addEventListener('submit', e=>{
    e.preventDefault()
    fetch('http://localhost:3000/users') // We make a get fetch    // request where users are stored
    .then(res=>res.json()) 
    .then(usersArray => { 
      let user = usersArray.find(function(user){ 
          return user.username === usernameInput.value // Then we        // check if there is a user with a value given
        })
      if (user){
        signDiv.innerHTML = ""
        localStorage.id = user.id // If there is so, we then store // it
        logOut()
      }
    })
  })
}) */


// Log toggle --> login/register (common functions)
 function DisplayUsername(username){
    const name = username;
    if (name !== 'undefined'|| name !== 'null'){
        document.getElementById('user').innerHTML = name;
    }else{
        document.getElementById('user').innerHTML = "Hello!";
        console.log('azert');
    }
   document.querySelector(".fa-caret-down").classList.add("visible");
   document.querySelector(".overlay").classList.remove("open");
}

function logOut(){
    document.getElementById('user').innerHTML = "";
    document.querySelector(".fa-caret-down").classList.remove("visible");
    document.querySelector(".overlayMenu").classList.replace("open","close")
    //localStorage.clear() // clear localStorage 
}

 


//Global variables
const mainNav = document.getElementById('nav1');
const searchNav = document.getElementById('nav2');
const register= document.getElementById('registerForm');
const login= document.getElementById('loginForm');
const username = document.getElementById('usernameR');
const email = document.getElementById('emailR');
const password = document.getElementById('passwordR');
const passwordCheck = document.getElementById('passwordCheckR');


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

// Log toggle --> register
register.addEventListener('submit', (e)=>{
    e.preventDefault();
    checkInputs();
});

function checkInputs(){
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
    
    submitInputs();
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

function submitInputs(){
    const usernameSuccess = username.parentElement;
    const emailSuccess = email.parentElement;
    const passwordSuccess = password.parentElement;
    const passwordCheckSuccess = passwordCheck.parentElement;

    if(usernameSuccess.className === 'form-controler success' && emailSuccess.className === 'form-controler success' && passwordSuccess.className === 'form-controler success' && passwordCheckSuccess.className === 'form-controler success'){
        storeInputsSignUp();
    }
}

function storeInputsSignUp(){
    let userData = {
        username: document.getElementById('usernameR').value,
        email: document.getElementById('emailR').value,
        password: document.getElementById('passwordR').value,
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    console.log(userData);
}
 
//Global variables
const mainNav = document.getElementById('nav1');
const searchNav = document.getElementById('nav2');
const register= document.getElementById('registerForm');
const login= document.getElementById('loginForm');

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
    console.log("ghfdhrh");
    document.querySelector(".overlay").classList.toggle("open");
    console.log("ok") 
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


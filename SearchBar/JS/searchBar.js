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

// Hamburger menu ------------------------------------------------------------------------------------------------------
const hamburgerMenu = document.querySelector(".hamburger");

function toggleHamburger(event) {
    // Toggle hamburger--active class
    hamburgerMenu.classList.toggle("hamburger--active");

    // Toggle aria-expanded attribute
    const currentAriaExpanded = hamburgerMenu.getAttribute("aria-expanded")
    if (currentAriaExpanded == "false") {
        newAriaExpanded = "true"
    } else {
        newAriaExpanded = "false"
    }
    hamburgerMenu.setAttribute("aria-expanded", newAriaExpanded)
}
hamburgerMenu.addEventListener("click", toggleHamburger);


// Prevent adding focus styles when clicked with a mouse
let mouseDown = false;
hamburgerMenu.addEventListener("mousedown", function() {
    mouseDown = true
    // blur() in case of already being in focus
    // hamburgerMenu.blur();
});
hamburgerMenu.addEventListener("focus", function() {
    if (mouseDown) {
        hamburgerMenu.blur();     
    }
    // mouseDown = false
});
hamburgerMenu.addEventListener("blur", function() {mouseDown = false});


// Close hamburger menu when navigation link is clicked 
const menuLinks = document.querySelectorAll(".menu-link")
menuLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        toggleHamburger(event);
    })
})


// Toggle sticky header on scroll --------------------------------------------------------------------------------------
const header = document.querySelector(".header")
const headerLogo = document.querySelector(".header-logo")
const headerLogocut = document.querySelector(".header-logo-cut")

let last_known_scroll_position = 0;
let ticking = false;

function toggleStickyHeader(scroll_pos) {
    if (scroll_pos > 250) {
        header.classList.add("sticky-header")
    } else {
        header.classList.remove("sticky-header")
    }
}

// Scroll event throttling (https://developer.mozilla.org/pl/docs/Web/API/Document/scroll_event)
window.addEventListener('scroll', function() {
  last_known_scroll_position = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function() {
        toggleStickyHeader(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});



// IntersectionObserver ----
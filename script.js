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

// Used "for" loop instead of "forEach" to support IE
for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener("click", toggleHamburger)
}
// ---------------------------------------------------------------------------------------------------------------------

// Toggle sticky header on scroll --------------------------------------------------------------------------------------
const header = document.querySelector(".header")

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
  if (!ticking) {
    window.requestAnimationFrame(function() {
      toggleStickyHeader(pageYOffset);
      ticking = false;
    });

    ticking = true;
  }
});
// ---------------------------------------------------------------------------------------------------------------------

// Smooth scrolling ----------------------------------------------------------------------------------------------------

if (window.CSS && window.CSS.supports("scroll-behavior: smooth")) {
    // For browsers that support "scroll-behavior" do nothing and let the CSS rule work
} else {
    // For browsers that don't support "scroll-behavior" use the following polyfill

    function smoothScroll(targetElement) {
        const target = document.querySelector(targetElement)
        const targetPosition = target.getBoundingClientRect().top // relative to the top of viewport

        // Statement below prevents from scrolling when the page is already scrolled to the target
        if (Math.abs(targetPosition) < 1) {
            return
        }

        currentPosition = window.pageYOffset

        // Statement below prevents from scrolling further down when the page is already scrolled to the bottom
        // if (targetPosition > 0 && document.body.scrollHeight === currentPosition + window.innerHeight ) {
        //     return
        // }

        const animationTime = 300; // miliseconds
        let start;

        function step(timestamp) {
            if (start === undefined)
              start = timestamp;
            const elapsed = timestamp - start;
          
            // "Math.min()" and "Math.max()" are used here to make sure that the element stops at the target position
            if (targetPosition > 0) { // Scrolling down
                window.scrollTo(0, currentPosition + Math.min( targetPosition/animationTime * elapsed, targetPosition ))
            } else { // Scrolling up
                window.scrollTo(0, currentPosition + Math.max( targetPosition/animationTime * elapsed, targetPosition ))
            }
          
            if (elapsed <= animationTime) { // Stop the animation after 300 ms
                window.requestAnimationFrame(step);
            }
        }

        // Start scrolling
        window.requestAnimationFrame(step);
    }

    const menuLinks = document.querySelectorAll(".smooth-scroll-link")

    // Used "for" loop instead of "forEach" to support IE
    for (let i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", function(e) {
            e.preventDefault()
            smoothScroll(e.currentTarget.getAttribute("href"));
            e.currentTarget.blur()
        })
    }
}
// ---------------------------------------------------------------------------------------------------------------------

// IntersectionObserver ----
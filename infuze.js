// Ensure GSAP and ScrollTrigger are included in your project
gsap.registerPlugin(ScrollTrigger);

// Create the ScrollTrigger to animate the width of the gsap-video div
gsap.fromTo(".gsap-video", 
  {
    width: "185rem", // Initial width of the .gsap-video div
  },
  {
    width: "100%", // Final width when scrolled
    scrollTrigger: {
      trigger: ".gsap-video", // The element that triggers the animation
      start: "top 50%", // Start the animation when 80% of the .gsap-video is in view
      end: "bottom 80%", // End the animation when 20% of the bottom of .gsap-video is in view
      scrub: true, // Smoothly animates the width as the user scrolls
    },
    ease: "cubic-bezier(0.25, 0.8, 0.25, 1)" // Applying cubic-bezier easing
});


// Select all .para-txt and .sticky_features_img elements
const paraTexts = document.querySelectorAll('.para-txt');
const stickyImages = document.querySelectorAll('.sticky_features_img');

// Function to update the active image based on the index
function updateActiveImage(index) {
  // Remove the 'w--current' class from all images
  stickyImages.forEach(img => {
    img.classList.remove('w--current');
  });

  // Add the 'w--current' class to the image corresponding to the current index
  const activeImage = document.querySelector(`.sticky_features_img[data-call="side-visual${index}"]`);
  if (activeImage) {
    activeImage.classList.add('w--current');
  }
}

// Initial setup: add 'w--current' to the first image (side-visual1)
updateActiveImage(1);

// ScrollTrigger logic: when each .para-txt enters the viewport, update the active image
paraTexts.forEach((para, index) => {
  ScrollTrigger.create({
    trigger: para, // The .para-txt element will trigger the animation
    start: "top 70%", // Trigger when 80% of the .para-txt is in view
    end: "bottom 30%", // Trigger when the bottom of the .para-txt is out of view
    onEnter: () => {
      // When the para-txt enters the viewport, set the corresponding image as active
      updateActiveImage(index + 1); // index + 1 to match the side-visual numbering
    },
    onLeaveBack: () => {
      // When scrolling back, update to the previous image (if any)
      updateActiveImage(index + 1);
    },
    markers: false, // Optional: Set to true for debugging scroll positions
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector('.something');
  const spans = document.querySelectorAll('.something span');
  let currentIndex = 0;

  function changeText() {
      spans.forEach(span => span.classList.remove('present'));

      spans[currentIndex].classList.add('present');

      // Get computed padding values
      const computedStyle = window.getComputedStyle(container);
      const paddingLeft = parseFloat(computedStyle.paddingLeft);
      const paddingRight = parseFloat(computedStyle.paddingRight);

      // Calculate total width including text + padding
      const newWidth = spans[currentIndex].offsetWidth + paddingLeft + paddingRight;
      
      container.style.minWidth = `${newWidth}px`;
      container.style.maxWidth = `${newWidth}px`;

      currentIndex = (currentIndex + 1) % spans.length;
  }

  // Set initial state smoothly
  setTimeout(changeText, 100);
  setInterval(changeText, 1500); // Faster transition (from 2000ms to 1500ms)
});


document.addEventListener("DOMContentLoaded", function () {
  const hiddenTxt = document.querySelector('.hidden-txt');
  const sTxt = document.querySelector('.s_txt');

  function checkScroll() {
      const hiddenTxtRect = hiddenTxt.getBoundingClientRect();

      // Check if viewport bottom crosses hidden-txt bottom
      if (hiddenTxtRect.bottom < window.innerHeight) {
          sTxt.style.transform = "translate(0%, 0px)";
          sTxt.style.transition = "transform 0.8s ease-in-out"; // Smooth transition

          // Remove event listener after triggering once
          window.removeEventListener("scroll", checkScroll);
      }
  }

  // Listen for scroll events
  window.addEventListener("scroll", checkScroll);

  // Run once in case it's already in view on page load
  checkScroll();
});


document.addEventListener("DOMContentLoaded", function () {
  const parallaxSections = document.querySelectorAll(".parallax"); // Select all .parallax divs
  const slides = document.querySelectorAll(".slide");
  const page5 = document.getElementById("page5");

  // Add 'cb-active' class to the first .parallax div
  parallaxSections[0].classList.add("cb-active");

  // Check if GSAP is available
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#page5",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: function (self) {
          const progress = self.progress;

          // Switch between sections depending on scroll progress
          if (progress < 0.25) {
            updateActiveClass(0); // d-1
          } else if (progress < 0.5) {
            updateActiveClass(1); // d-2
          } else if (progress < 0.75) {
            updateActiveClass(2); // d-3
          } else {
            updateActiveClass(3); // d-4
          }
        },
      }
    });

    // Initial state for .slide width
    timeline.set(".slide", { width: "0%" });

    // Parallax and expanding animation
    timeline
      .to(".d-1", {
        width: "100%",
        duration: 1,
        onStart: function () {
          parallaxSections[0].classList.add("cb-active"); // First section gets the cb-active class
        },
        onComplete: function () {
          // No action needed for the first section, it stays active
        }
      })
      .to(".d-2", {
        width: "100%",
        duration: 1,
        onStart: function () {
          parallaxSections[1].classList.add("cb-active"); // Second section gets the cb-active class
        },
        onComplete: function () {
          parallaxSections[1].classList.remove("cb-active"); // Remove cb-active from the second section
        }
      })
      .to(".d-3", {
        width: "100%",
        duration: 1,
        onStart: function () {
          parallaxSections[2].classList.add("cb-active"); // Third section gets the cb-active class
        },
        onComplete: function () {
          parallaxSections[2].classList.remove("cb-active"); // Remove cb-active from the third section
        }
      })
      .to(".d-4", {
        width: "100%",
        duration: 1,
        onStart: function () {
          parallaxSections[3].classList.add("cb-active"); // Fourth section gets the cb-active class
        },
        onComplete: function () {
          parallaxSections[3].classList.remove("cb-active"); // Remove cb-active from the fourth section
        }
      });

    // Helper function to update the active section
    function updateActiveClass(index) {
      // Loop over each parallax section
      parallaxSections.forEach((section, i) => {
        if (i <= index) {
          section.classList.add("cb-active"); // Add cb-active class to the sections up to the current index
        } else {
          section.classList.remove("cb-active"); // Remove cb-active from sections after the current index
        }
      });
    }
  } else {
    // Vanilla JavaScript Scroll Event (fallback)
    window.addEventListener("scroll", function () {
      const pageRect = page5.getBoundingClientRect();
      const pageHeight = window.innerHeight;
      const scrollPos = Math.max(0, pageHeight - pageRect.top);
      const step = pageRect.height / slides.length;

      slides.forEach((slide, index) => {
        if (scrollPos > index * step) {
          slide.style.width = "100%";
          slide.style.transition = "width 0.8s ease-out"; // Smooth transition
        } else {
          slide.style.width = "0%";
        }
      });

      // Add or remove the .cb-active class based on the scroll position
      parallaxSections.forEach((section, index) => {
        const sectionRect = section.getBoundingClientRect();
        if (sectionRect.top <= window.innerHeight && sectionRect.bottom >= 0) {
          section.classList.add("cb-active"); // Add the class if the section is visible
        } else {
          section.classList.remove("cb-active"); // Remove the class if the section is not visible
        }
      });
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const splitTypes = document.querySelectorAll('.reveal-type');

  splitTypes.forEach((element) => {
      const bg = element.dataset.bgColor;
      const fg = element.dataset.fgColor;

      // Split the text into words first
      const words = element.textContent.trim().split(' ');
      element.innerHTML = '';  // Clear original text

      words.forEach(word => {
          // Create a wrapper span for each word to prevent line breaks
          const wordSpan = document.createElement('span');
          wordSpan.classList.add('word'); 
          wordSpan.style.whiteSpace = 'nowrap'; // Prevent breaking

          // Wrap each character inside the word span
          [...word].forEach(char => {
              const charSpan = document.createElement('span');
              charSpan.classList.add('char');
              charSpan.textContent = char;
              wordSpan.appendChild(charSpan);
          });

          // Add space between words
          element.appendChild(wordSpan);
          element.appendChild(document.createTextNode(' '));
      });

      // Animate each character separately
      const chars = element.querySelectorAll('.char');

      gsap.fromTo(chars,
          { color: bg }, // Initial color
          {
              color: fg,    // Final color
              duration: 0.3,
              stagger: 0.02,
              scrollTrigger: {
                  trigger: element,
                  start: 'top 80%',
                  end: 'top 40%',
                  scrub: true,
                  markers: false,
                  toggleActions: 'play play reverse reverse',
              }
          }
      );
  });
});


// Get references to the elements
const openMenu = document.querySelector('.open-menu');
const navbarScrollDown = document.querySelector('.navbar__scroll--down');
const cNavbar = document.querySelector('.c_navbar');

// Add event listeners for mouse enter and mouse leave on .open-menu
openMenu.addEventListener('mouseenter', () => {
  navbarScrollDown.classList.add('open');
});

openMenu.addEventListener('mouseleave', () => {
  // Only remove .open if the mouse is not over navbar__scroll--down or c_navbar
  if (!navbarScrollDown.matches(':hover') && !cNavbar.matches(':hover')) {
    navbarScrollDown.classList.remove('open');
  }
});

// Add event listeners for mouse enter and mouse leave on .navbar__scroll--down
navbarScrollDown.addEventListener('mouseenter', () => {
  navbarScrollDown.classList.add('open');
});

navbarScrollDown.addEventListener('mouseleave', () => {
  // Only remove the .open class when the mouse leaves .navbar__scroll--down
  navbarScrollDown.classList.remove('open');
});

// Add event listeners for mouse enter and mouse leave on .c_navbar
cNavbar.addEventListener('mouseenter', () => {
  navbarScrollDown.classList.add('open');
});

cNavbar.addEventListener('mouseleave', () => {
  // Do nothing, because we only want to remove .open when the mouse leaves navbar__scroll--down
});





// document.addEventListener("DOMContentLoaded", function () {
//   gsap.registerPlugin(ScrollTrigger);

//   let timeline = gsap.timeline({
//       scrollTrigger: {
//           trigger: "#page5",
//           start: "top top",
//           end: "bottom top",
//           scrub: 1,
//           pin: ".parallax-wrapper", 
//       }
//   });

//   timeline
//       .to(".d-1", { width: "100%", duration: 1 })
//       .to(".d-2", { width: "100%", duration: 1 })
//       .to(".d-3", { width: "100%", duration: 1 })
//       .to(".d-4", { width: "100%", duration: 1 });
// });





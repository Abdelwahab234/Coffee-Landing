nav = document.querySelector("body header .navlist");
menuIcon = document.querySelector("#menu-icon");
let acces = 0;
let save = null;

if (menuIcon) {
    menuIcon.onclick = function(){
        if(nav) {
            nav.classList.toggle("active");
        }
        console.log("im here" , this.classList);
    }
}

// Loader Logic (Use DOMContentLoaded and a fallback)
function removeLoader() {
    const loader = document.getElementById("loader");
    if(loader && !loader.classList.contains("loaded")) {
        loader.classList.add("loaded");
        setTimeout(() => {
            loader.style.display = "none";
        }, 500); // Wait for transition to finish
    }
}

// Try to remove loader as soon as DOM is ready
window.addEventListener("DOMContentLoaded", removeLoader);
// Fallback if load event fires
window.addEventListener("load", removeLoader);
// Fallback timeout just in case it gets stuck
setTimeout(removeLoader, 3000);

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

// Timeline Glow Logic
window.addEventListener('scroll', () => {
    const timeline = document.querySelector('.timeline');
    const progressBar = document.querySelector('.timeline-progress');
    const items = document.querySelectorAll('.timeline-item');
    
    if (timeline && progressBar) {
        const timelineRect = timeline.getBoundingClientRect();
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate progress
        let progress = (windowHeight / 2 - timelineTop) / timelineHeight;
        progress = Math.max(0, Math.min(1, progress));
        
        progressBar.style.height = `${progress * 100}%`;
        
        items.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            // Node glows exactly when the line reaches its vertical center
            if (itemRect.top + 10 <= windowHeight / 2) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
});

// Custom Electron Mouse Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows exact mouse position immediately, centered (6px width/height -> -3px)
    if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
    }
});

// Smooth animation loop for the ring
function animateCursor() {
    // Easing for smooth following
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    // Ring centered (35px width/height -> -17.5px)
    if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX - 17.5}px, ${ringY - 17.5}px, 0)`;
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

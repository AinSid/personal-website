// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transition = 'opacity 0.5s, transform 0.5s';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    observer.observe(section);
});

// Add dynamic header effect
const h1 = document.querySelector('h1');
const letters = h1.textContent.split('');
h1.textContent = '';
letters.forEach((letter, i) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.transition = 'all 0.3s';
    span.style.display = 'inline-block';
    span.style.opacity = '0';
    span.style.transform = 'translateY(20px)';
    h1.appendChild(span);
    setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
    }, 100 * i);
});

// Add hover effect for header
h1.addEventListener('mouseenter', () => {
    const spans = h1.querySelectorAll('span');
    spans.forEach((span, i) => {
        setTimeout(() => {
            span.style.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
            span.style.transform = 'translateY(-5px)';
            setTimeout(() => {
                span.style.color = '';
                span.style.transform = 'translateY(0)';
            }, 300);
        }, i * 50);
    });
});

// Remove the alert and add a more subtle interaction
h1.addEventListener('click', function() {
    const colors = ['#3B82F6', '#60A5FA', '#93C5FD'];
    document.body.style.transition = 'background-color 0.5s';
    document.body.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    setTimeout(() => {
        document.body.style.backgroundColor = '#121212';
    }, 500);
});

// Cursor effect (similar to sajjadzafar.com)
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animate() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    
    requestAnimationFrame(animate);
}

animate();

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.work-item').forEach(item => {
    observer.observe(item);
});

// Make emojis draggable
document.querySelectorAll('.floating-emoji').forEach(emoji => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    emoji.addEventListener('mousedown', dragStart);
    emoji.addEventListener('mousemove', drag);
    emoji.addEventListener('mouseup', dragEnd);
    emoji.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === emoji) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, emoji);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }
});

// Add hover animation for skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const emoji = item.querySelector('span:first-child');
        emoji.style.transform = 'scale(1.2) rotate(10deg)';
        setTimeout(() => {
            emoji.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
});

function showProjectDetails(card) {
    const popup = card.querySelector('.project-popup');
    popup.style.display = 'flex';

    // Close when clicking the X button
    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.onclick = function(e) {
        e.stopPropagation();  // Prevent the click from bubbling to the card
        popup.style.display = 'none';
    }

    // Close when clicking outside the popup content
    popup.onclick = function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    }
}

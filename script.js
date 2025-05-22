// DOM Elements
const partnerCards = document.querySelectorAll('.partner-card');
const modalOverlay = document.getElementById('modal-overlay');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close-btn');

// Open modal function
function openModal(modalId) {
    // Hide all modals first
    modals.forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('active');
    });
    
    // Show the selected modal
    const modal = document.getElementById(`${modalId}-modal`);
    modalOverlay.style.display = 'block';
    modal.style.display = 'block';
    
    // Add a small delay before adding the active class for animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    modals.forEach(modal => {
        modal.classList.remove('active');
        
        // Add a small delay before hiding the modal for animation
        setTimeout(() => {
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
        }, 300);
    });
    
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
}

// Event Listeners
partnerCards.forEach(card => {
    card.addEventListener('click', () => {
        const partnerId = card.getAttribute('data-partner');
        openModal(partnerId);
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
});

// Close modal when clicking outside
modalOverlay.addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Prevent modal close when clicking inside modal content
document.querySelectorAll('.modal-content').forEach(content => {
    content.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Add touch swipe detection for mobile to close modal
let touchStartY = 0;
let touchEndY = 0;

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, false);
    
    modal.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, false);
});

function handleSwipe() {
    // If swiped down more than 100px, close the modal
    if (touchEndY - touchStartY > 100) {
        closeModal();
    }
}

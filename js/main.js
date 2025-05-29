// Main JavaScript for Nature Lens Photography Portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('bg-white', 'shadow-md');
            header.classList.remove('bg-opacity-90', 'shadow-sm');
        } else {
            header.classList.add('bg-opacity-90', 'shadow-sm');
            header.classList.remove('shadow-md');
        }
    });
    
    // Featured Slider functionality (if on home page)
    const featuredSlider = document.querySelector('.featured-slider');
    if (featuredSlider) {
        const sliderTrack = document.querySelector('.slider-track');
        const slides = document.querySelectorAll('.slider-slide');
        const prevButton = document.getElementById('prev-slide');
        const nextButton = document.getElementById('next-slide');
        const indicators = document.querySelectorAll('.slider-indicator');
        
        let currentSlide = 0;
        const slideCount = slides.length;
        let slideInterval;
        const autoPlayDelay = 5000; // 5 seconds between slides
        
        // Initialize slider
        function initSlider() {
            // Set initial position
            goToSlide(0);
            
            // Start autoplay
            startAutoPlay();
            
            // Add event listeners
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
            
            // Setup indicators
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    goToSlide(index);
                    resetAutoPlay();
                });
            });
            
            // Add click event to slide images for modal popup
            const slideImages = document.querySelectorAll('.slider-slide img');
            slideImages.forEach(img => {
                img.addEventListener('click', function() {
                    openSlideModal(this);
                });
            });
            
            // Pause autoplay on hover
            featuredSlider.addEventListener('mouseenter', stopAutoPlay);
            featuredSlider.addEventListener('mouseleave', startAutoPlay);
        }
        
        // Go to specific slide
        function goToSlide(index) {
            // Update current slide index
            currentSlide = index;
            
            // Handle edge cases
            if (currentSlide < 0) currentSlide = slideCount - 1;
            if (currentSlide >= slideCount) currentSlide = 0;
            
            // Transform slider track
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, i) => {
                if (i === currentSlide) {
                    indicator.classList.add('active', 'bg-gray-800');
                    indicator.classList.remove('bg-gray-300');
                } else {
                    indicator.classList.remove('active', 'bg-gray-800');
                    indicator.classList.add('bg-gray-300');
                }
            });
        }
        
        // Go to next slide
        function nextSlide() {
            goToSlide(currentSlide + 1);
            resetAutoPlay();
        }
        
        // Go to previous slide
        function prevSlide() {
            goToSlide(currentSlide - 1);
            resetAutoPlay();
        }
        
        // Start autoplay
        function startAutoPlay() {
            stopAutoPlay(); // Clear any existing interval
            slideInterval = setInterval(nextSlide, 2000);
        }
        
        // Stop autoplay
        function stopAutoPlay() {
            clearInterval(slideInterval);
        }
        
        // Reset autoplay (call after user interaction)
        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }
        
        // Initialize the slider
        initSlider();
    }
    
    // Initialize modal if it exists on any page
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.getElementById('modal-close');
    
    // Function to open modal with an image (used by both slider and gallery)
    function openSlideModal(img) {
        if (modal && modalImage) {
            // Get parent elements to find title and description
            const slideContainer = img.closest('.slider-slide');
            let title = '';
            let description = '';
            
            if (slideContainer) {
                const titleEl = slideContainer.querySelector('h3');
                const descEl = slideContainer.querySelector('p');
                if (titleEl) title = titleEl.textContent;
                if (descEl) description = descEl.textContent;
            }
            
            // Use the full-size image from raw folder if available
            modalImage.src = img.getAttribute('data-full') || img.src;
            modalImage.alt = img.alt;
            
            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = description;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Add event listener to modal image to open in new tab
            modalImage.addEventListener('click', function() {
                window.open(modalImage.src, '_blank');
            });
        }
    }
    
    // Close modal when close button is clicked
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Gallery functionality (if on gallery page)
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalClose = document.getElementById('modal-close');
        const prevButton = document.getElementById('prev-image');
        const nextButton = document.getElementById('next-image');
        
        let currentIndex = 0;
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // Setup gallery items to open in modal
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                openModal(item);
            });
        });
        
        // Open modal with selected gallery item
        function openModal(item) {
            const img = item.querySelector('img');
            openSlideModal(img);
        }
        
        // Close modal
        modalClose.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
        
        // Click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Navigate through images
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            openModal(galleryItems[currentIndex]);
        });
        
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            openModal(galleryItems[currentIndex]);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (modal.classList.contains('hidden')) return;
            
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                openModal(galleryItems[currentIndex]);
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                openModal(galleryItems[currentIndex]);
            }
        });
        
        // Gallery filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active', 'bg-gray-800', 'text-white'));
                filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'hover:bg-gray-800', 'hover:text-white'));
                this.classList.add('active', 'bg-gray-800', 'text-white');
                this.classList.remove('bg-gray-200', 'hover:bg-gray-800', 'hover:text-white');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        // Add animation
                        item.style.animation = 'fadeIn 0.5s ease-out forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Contact form functionality (if on contact page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // In a real application, this would send data to a server
            // For demo purposes, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

// Preload gallery images for smoother experience
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const newImg = new Image();
            newImg.src = src;
        }
    });
});

// Accessibility enhancement: Skip to content functionality
document.addEventListener('DOMContentLoaded', function() {
    // This would be linked to a skip-to-content link that could be added in the HTML
    // The link would be visually hidden but appears on focus for keyboard users
});

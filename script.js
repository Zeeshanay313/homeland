AOS.init({
    duration: 1000,
    once: true
});

// Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

// Add active class to first slide initially
if (slides.length > 0) {
    slides[0].classList.add('active');
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-slide functionality
let autoSlideInterval = setInterval(nextSlide, 5000);

// Main DOM content loaded functionality
document.addEventListener('DOMContentLoaded', function() {
    // NAVBAR: Hide when scrolled away from top, show only at top
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) { // If scrolled more than 50px from top
            // Hide navbar completely
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s ease';
            navbar.style.opacity = '0';
        } else {
            // Show navbar only when at the top
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 0.3s ease';
            navbar.style.opacity = '1';
        }
    });

    // DROPDOWN FUNCTIONALITY: Properties dropdown with click and hover
    const dropdownToggle = document.getElementById('navbarDropdown');
    const dropdown = dropdownToggle ? dropdownToggle.closest('.dropdown') : null;
    
    if (dropdownToggle && dropdown) {
        // Handle click behavior for Properties dropdown
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default to handle manually
            
            // On mobile, toggle Bootstrap dropdown
            if (window.innerWidth < 992) {
                const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(this);
                bsDropdown.toggle();
                return;
            }
            
            // On desktop, navigate to property.html
            window.location.href = 'property.html';
        });
        
        // Handle hover for desktop - Properties dropdown
        if (window.innerWidth >= 992) {
            dropdown.addEventListener('mouseenter', function() {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'block';
                    dropdownMenu.classList.add('show');
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                const dropdownMenu = this.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.style.display = 'none';
                    dropdownMenu.classList.remove('show');
                }
            });
        }
    }

    // SUBMENU FUNCTIONALITY: Handle nested dropdown (More submenu)
    const dropdownSubmenu = document.querySelector('.dropdown-submenu');
    
    if (dropdownSubmenu) {
        const submenuToggle = dropdownSubmenu.querySelector('.dropdown-toggle');
        const submenuDropdown = dropdownSubmenu.querySelector('.dropdown-menu');

        // Click functionality for mobile
        if (submenuToggle) {
            submenuToggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    submenuDropdown.classList.toggle('show');
                }
            });
        }

        // Close submenu when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdownSubmenu.contains(e.target)) {
                submenuDropdown.classList.remove('show');
            }
        });

        // Hover functionality for desktop - Submenu
        dropdownSubmenu.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                submenuDropdown.classList.add('show');
            }
        });

        dropdownSubmenu.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                submenuDropdown.classList.remove('show');
            }
        });
    }

    // OTHER DROPDOWNS: Handle other main dropdowns (not Properties)
    const mainDropdowns = document.querySelectorAll('.dropdown:not(#navbarDropdown)');
    mainDropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        if (dropdownMenu && !dropdown.classList.contains('dropdown-submenu')) {
            dropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    dropdownMenu.classList.add('show');
                }
            });

            dropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    dropdownMenu.classList.remove('show');
                    // Also close any open submenus
                    const submenus = dropdown.querySelectorAll('.dropdown-submenu .dropdown-menu');
                    submenus.forEach(submenu => {
                        submenu.classList.remove('show');
                    });
                }
            });
        }
    });

    // WINDOW RESIZE: Handle responsive behavior
    window.addEventListener('resize', function() {
        if (dropdown) {
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (window.innerWidth < 992 && dropdownMenu) {
                dropdownMenu.style.display = '';
                dropdownMenu.classList.remove('show');
            }
        }
    });
});

// NAVIGATION ARROWS: Hero slider navigation
const prevArrow = document.querySelector('.nav-arrow.prev');
const nextArrow = document.querySelector('.nav-arrow.next');

if (prevArrow) {
    prevArrow.addEventListener('click', function() {
        prevSlide();
        // Reset auto-slide timer
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

if (nextArrow) {
    nextArrow.addEventListener('click', function() {
        nextSlide();
        // Reset auto-slide timer
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

// HERO SECTION: Pause auto-slide on hover
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    heroSection.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
}

// WISHLIST FUNCTIONALITY
function toggleWishlist(button) {
    button.classList.toggle('active');
    const icon = button.querySelector('i');
    if (button.classList.contains('active')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
    }
}

// FILTER PROPERTIES by type
function filterProperties(type) {
    const cards = document.querySelectorAll('.prop-card'); // Fixed selector
    const tabs = document.querySelectorAll('.fitler-tab'); // Fixed selector to match HTML
    
    // Update active tab
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach(card => {
        if (type === 'all') {
            card.style.display = 'block';
        } else {
            const cardTypes = card.dataset.type ? card.dataset.type.split(',') : [];
            if (cardTypes.includes(type)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// SORT PROPERTIES
function sortProperties(sortType) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    const cards = Array.from(grid.children);
    
    cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price) || 0;
        const priceB = parseInt(b.dataset.price) || 0;
        
        switch(sortType) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            case 'newest':
                // You can implement date-based sorting here
                return 0;
            case 'size':
                // You can implement size-based sorting here
                return 0;
            default:
                return 0;
        }
    });
    
    cards.forEach(card => grid.appendChild(card));
}

// TOGGLE VIEW (grid/list)
function toggleView(viewType) {
    const grid = document.getElementById('propertiesGrid');
    if (!grid) return;
    
    const viewIcons = document.querySelectorAll('.view-icon');
    
    viewIcons.forEach(icon => icon.classList.remove('active'));
    if (event && event.target) {
        event.target.closest('.view-icon').classList.add('active');
    }
    
    if (viewType === 'list') {
        grid.style.gridTemplateColumns = '1fr';
        grid.classList.add('list-view');
    } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
        grid.classList.remove('list-view');
    }
}

// SEARCH FUNCTIONALITY
function searchProperties() {
    const listingType = document.getElementById('ListingType');
    const offerType = document.getElementById('OfferType');
    const city = document.getElementById('SelectCity');
    
    const listingValue = listingType ? listingType.value : '';
    const offerValue = offerType ? offerType.value : '';
    const cityValue = city ? city.value : '';
    
    // Here you would typically make an API call to search properties
    console.log('Searching properties:', { 
        listingType: listingValue, 
        offerType: offerValue, 
        city: cityValue 
    });
    
    // For demo purposes, show search results
    const searchQuery = `${listingValue} properties ${offerValue} in ${cityValue}`;
    console.log('Search Query:', searchQuery);
    
    // You can implement actual search logic here
    // For now, we'll just filter existing properties
    const cards = document.querySelectorAll('.prop-card');
    cards.forEach(card => {
        // Show all cards for demo - you can implement actual filtering logic
        card.style.display = 'block';
    });
}

// SMOOTH SCROLLING for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// LOADING ANIMATION for property cards
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.prop-card'); // Fixed selector
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// ERROR HANDLING: Prevent JavaScript errors from breaking functionality
window.addEventListener('error', function(e) {
    console.warn('JavaScript error caught:', e.error);
    // Continue execution
});

// UTILITY FUNCTIONS
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// PERFORMANCE: Debounce scroll and resize events
const debouncedScrollHandler = debounce(function() {
    // Additional scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ACCESSIBILITY: Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Handle keyboard navigation for dropdowns
    if (e.key === 'Escape') {
        // Close any open dropdowns
        const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
        openDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});
   // Form submission handling
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = document.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Message sent successfully!');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 2000);
        });

        // Add focus effects
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
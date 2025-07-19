// Function to load HTML content into an element
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
    }
}

// Mobile scroll behavior for contact info
function setupMobileScrollBehavior() {
    const contactInfo = document.querySelector('.contact-info');
    if (!contactInfo) return;
    
    let lastScrollTop = 0;
    const mobileBreakpoint = 767; // Match this with your CSS breakpoint
    let isMobile = window.innerWidth <= mobileBreakpoint;
    
    // Check if we're on mobile
    const checkMobile = () => {
        isMobile = window.innerWidth <= mobileBreakpoint;
        if (!isMobile) {
            contactInfo.classList.remove('hide-on-scroll');
        }
    };
    
    // Handle scroll event
    const handleScroll = () => {
        if (!isMobile) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 50) {
            // Scrolling down
            contactInfo.classList.add('hide-on-scroll');
        } else {
            // Scrolling up or at top
            contactInfo.classList.remove('hide-on-scroll');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkMobile);
    
    // Initial check
    checkMobile();
}

// Load all components when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer
    loadComponent('header', 'includes/header.html');
    loadComponent('footer', 'includes/footer.html');
    
    // Setup mobile scroll behavior
    setupMobileScrollBehavior();
    
    // Load product components
    loadComponent('product-header', 'includes/product-header.html');
    loadComponent('product-gallery', 'includes/product-gallery.html');
    loadComponent('product-info', 'includes/product-info.html');
    loadComponent('related-products', 'includes/related-products.html');
    loadComponent('sidebar', 'includes/sidebar.html');
    
    // Load tab content
    loadComponent('product-tabs', 'includes/product-tabs/description.html');
    
    // Set up tab switching
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tabId = e.target.getAttribute('data-tab');
            
            // Update active tab button
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            // Load the corresponding tab content
            switch(tabId) {
                case 'description':
                    loadComponent('product-tabs', 'includes/product-tabs/description.html');
                    break;
                case 'specs':
                    loadComponent('product-tabs', 'includes/product-tabs/specifications.html');
                    break;
                case 'features':
                    loadComponent('product-tabs', 'includes/product-tabs/features.html');
                    break;
                case 'downloads':
                    loadComponent('product-tabs', 'includes/product-tabs/downloads.html');
                    break;
            }
        }
    });
    
    // Quantity selector functionality
    document.addEventListener('click', (e) => {
        const qtyInput = document.getElementById('product-qty');
        
        if (e.target.id === 'increase-qty') {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        } else if (e.target.id === 'decrease-qty' && parseInt(qtyInput.value) > 1) {
            qtyInput.value = parseInt(qtyInput.value) - 1;
        }
    });
    
    // Add to cart functionality
    document.addEventListener('click', (e) => {
        if (e.target.id === 'add-to-cart' || e.target.closest('#add-to-cart')) {
            const qtyInput = document.getElementById('product-qty');
            const quantity = parseInt(qtyInput.value);
            alert(`Se ha añadido ${quantity} unidad(es) del producto al carrito.`);
        }
    });
    
    // Image gallery functionality (delegated event)
    document.addEventListener('click', (e) => {
        const thumbnail = e.target.closest('.thumbnail');
        if (thumbnail) {
            e.preventDefault();
            const mainImage = document.getElementById('main-product-image');
            const newImageSrc = thumbnail.getAttribute('data-image');
            const newImageAlt = thumbnail.getAttribute('data-alt');
            
            if (mainImage && newImageSrc) {
                mainImage.src = newImageSrc;
                if (newImageAlt) {
                    mainImage.alt = newImageAlt;
                }
                
                // Update active thumbnail
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
            }
        }
    });
});

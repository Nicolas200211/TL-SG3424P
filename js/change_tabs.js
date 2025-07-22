// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get tab elements
    const productTab = document.getElementById('product-tab');
    const imagesTab = document.getElementById('images-tab');
    const informationSection = document.getElementById('information-section');
    const imagesSection = document.getElementById('images-section');

    // Function to switch to product tab
    function showProductTab() {
        // Update active tab styles
        productTab.classList.remove('bg-gray-100', 'text-gray-700');
        productTab.classList.add('bg-blue-600', 'text-white');
        
        imagesTab.classList.remove('bg-blue-600', 'text-white');
        imagesTab.classList.add('bg-gray-100', 'text-gray-700');
        
        // Show product section, hide images section
        informationSection.classList.remove('hidden');
        imagesSection.classList.add('hidden');
    }

    // Function to switch to images tab
    function showImagesTab() {
        // Update active tab styles
        imagesTab.classList.remove('bg-gray-100', 'text-gray-700');
        imagesTab.classList.add('bg-blue-600', 'text-white');
        
        productTab.classList.remove('bg-blue-600', 'text-white');
        productTab.classList.add('bg-gray-100', 'text-gray-700');
        
        // Show images section, hide product section
        imagesSection.classList.remove('hidden');
        informationSection.classList.add('hidden');
    }

    // Add click event listeners to tabs
    productTab.addEventListener('click', showProductTab);
    imagesTab.addEventListener('click', showImagesTab);

    // Initialize with product tab active
    showProductTab();
});

// Function to view images in modal
function viewImage(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    
    if (modal && modalImg) {
        modalImg.src = src;
        modal.classList.remove('hidden');
        
        // Close modal when clicking outside the image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
        
        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.classList.add('hidden');
            }
        });
    }
}

// Function to update the main image when clicking on thumbnails
function toExchangeImage(thumbnail) {
    // Get the main image element
    const mainImage = document.getElementById('img_main');
    
    if (mainImage && thumbnail && thumbnail.src) {
        // Update the main image source with the clicked thumbnail's source
        mainImage.src = thumbnail.src;
        
        // Update the alt text as well for accessibility
        mainImage.alt = thumbnail.alt || 'TP-Link TL-SG3424 Switch';
        
        // Optional: Add a visual feedback by adding/removing a highlight class
        const thumbnails = document.querySelectorAll('.thumbnail-container');
        thumbnails.forEach(container => {
            container.classList.remove('border-blue-500');
            container.classList.add('border-gray-200');
        });
        
        // Highlight the clicked thumbnail
        thumbnail.parentElement.classList.remove('border-gray-200');
        thumbnail.parentElement.classList.add('border-blue-500');
    }
}
document.addEventListener('DOMContentLoaded', function() {
  // Get all thumbnails and the main image
  const thumbnails = document.querySelectorAll('.thumbnail');
  const mainImage = document.getElementById('main-product-image');
  const mainImageContainer = document.querySelector('.gallery-main');
  let isZoomed = false;

  // Add click event to each thumbnail
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      // Get the full-size image URL and alt text from data attributes
      const fullImage = this.getAttribute('data-image');
      const altText = this.getAttribute('data-alt');
      
      // Add loading class to main image container
      mainImageContainer.classList.add('loading');
      
      // Create a new image to preload
      const newImage = new Image();
      newImage.src = fullImage;
      newImage.alt = altText;
      newImage.className = 'gallery-main__image';
      newImage.id = 'main-product-image';
      
      // When the new image is loaded
      newImage.onload = function() {
        // Add changing class for fade effect
        newImage.classList.add('changing');
        
        // Store the current image reference
        const currentImage = document.getElementById('main-product-image');
        
        // Replace the old image with the new one
        if (currentImage) {
          currentImage.parentNode.replaceChild(newImage, currentImage);
          
          // Update the mainImage reference to point to the new image
          mainImage = newImage;
          
          // Remove loading class after a short delay
          setTimeout(() => {
            mainImageContainer.classList.remove('loading');
            newImage.classList.remove('changing');
          }, 300);
          
          // Update active state of thumbnails
          thumbnails.forEach(t => t.setAttribute('aria-current', 'false'));
          thumb.setAttribute('aria-current', 'true');
        }
      };
      
      // In case of error loading the image
      newImage.onerror = function() {
        console.error('Error loading image:', fullImage);
        mainImageContainer.classList.remove('loading');
      };
    });
  });
  
  // Handle zoom functionality on desktop
  if (window.innerWidth >= 992) {
    mainImageContainer.addEventListener('click', function(e) {
      if (e.target === mainImageContainer || e.target === mainImage) {
        if (!isZoomed) {
          // Zoom in
          mainImageContainer.classList.add('zoomed');
          document.body.style.overflow = 'hidden';
          isZoomed = true;
        } else {
          // Zoom out
          mainImageContainer.classList.remove('zoomed');
          document.body.style.overflow = '';
          isZoomed = false;
        }
      }
    });
    
    // Close zoomed image with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isZoomed) {
        mainImageContainer.classList.remove('zoomed');
        document.body.style.overflow = '';
        isZoomed = false;
      }
    });
  }
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Update zoom behavior if needed
      if (window.innerWidth < 992 && isZoomed) {
        mainImageContainer.classList.remove('zoomed');
        document.body.style.overflow = '';
        isZoomed = false;
      }
    }, 250);
  });
});

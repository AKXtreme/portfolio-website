// Image optimization utilities for better performance

/**
 * Preload critical images
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Lazy load images with intersection observer
 */
export const createImageObserver = (callback, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px 0px',
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Generate responsive image URLs for external images
 */
export const getResponsiveImageUrl = (baseUrl, width = 600, quality = 80) => {
  if (baseUrl.includes('unsplash.com')) {
    return `${baseUrl}&w=${width}&q=${quality}&auto=format&fit=crop`;
  }
  return baseUrl;
};

/**
 * Image loading with retry mechanism
 */
export const loadImageWithRetry = (src, maxRetries = 3) => {
  return new Promise((resolve, reject) => {
    let retries = 0;
    
    const loadImage = () => {
      const img = new Image();
      
      img.onload = () => resolve(img);
      
      img.onerror = () => {
        retries++;
        if (retries <= maxRetries) {
          console.warn(`Image load failed, retrying... (${retries}/${maxRetries})`);
          setTimeout(loadImage, 1000 * retries); // Exponential backoff
        } else {
          reject(new Error(`Failed to load image after ${maxRetries} retries`));
        }
      };
      
      img.src = src;
    };
    
    loadImage();
  });
};

/**
 * Check if image format is supported
 */
export const checkWebPSupport = () => {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

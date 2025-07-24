// Cache busting and browser compatibility utilities

/**
 * Clear all browser caches and force reload
 */
export const clearAllCaches = async () => {
  try {
    // Clear service worker caches
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }

    // Clear localStorage
    if (typeof Storage !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
    }

    // Unregister service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(registration => registration.unregister())
      );
    }

    console.log('All caches cleared successfully');
  } catch (error) {
    console.warn('Error clearing caches:', error);
  }
};

/**
 * Add cache-busting query parameters
 */
export const addCacheBuster = (url) => {
  const timestamp = Date.now();
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${timestamp}`;
};

/**
 * Force hard refresh of the page
 */
export const forceHardRefresh = () => {
  // Try different methods for hard refresh across browsers
  if (window.location.reload) {
    window.location.reload(true); // Force reload from server
  } else {
    window.location.href = window.location.href;
  }
};

/**
 * Check if running in mobile browser
 */
export const isMobileBrowser = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
};

/**
 * Detect problematic browsers and apply fixes
 */
export const applyBrowserFixes = () => {
  const userAgent = navigator.userAgent;
  
  // iOS Safari fixes
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    // Fix viewport height issues on iOS
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Fix bounce scrolling
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });
  }
  
  // Android browser fixes
  if (/Android/.test(userAgent)) {
    // Fix input zoom on Android
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      );
    }
  }
};

/**
 * Force CSS reparse (fixes some rendering issues)
 */
export const forceCSSReparse = () => {
  const body = document.body;
  body.style.display = 'none';
  body.offsetHeight; // Trigger reflow
  body.style.display = '';
};

/**
 * Check and fix common loading issues
 */
export const debugLoadingIssues = () => {
  console.log('=== Debug Information ===');
  console.log('User Agent:', navigator.userAgent);
  console.log('Viewport:', {
    width: window.innerWidth,
    height: window.innerHeight
  });
  console.log('Document Ready State:', document.readyState);
  console.log('CSS Loaded:', document.styleSheets.length > 0);
  console.log('Local Storage Available:', typeof Storage !== 'undefined');
  console.log('Service Worker Support:', 'serviceWorker' in navigator);
  
  // Check if CSS variables are supported
  const testElement = document.createElement('div');
  testElement.style.cssText = '--test: red; color: var(--test);';
  document.body.appendChild(testElement);
  const supportsCSS = getComputedStyle(testElement).color === 'red';
  document.body.removeChild(testElement);
  console.log('CSS Variables Support:', supportsCSS);
  
  // Check for JavaScript errors
  window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
  });
  
  // Check for unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
  });
};

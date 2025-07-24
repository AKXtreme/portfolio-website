// Performance monitoring utilities
export const trackPerformance = () => {
  if (typeof window === 'undefined') return;

  // Track Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      switch (entry.entryType) {
        case 'largest-contentful-paint':
          console.log('LCP:', entry.startTime);
          break;
        case 'first-input':
          console.log('FID:', entry.processingStart - entry.startTime);
          break;
        case 'layout-shift':
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
          break;
      }
    });
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    // Fallback for older browsers
    console.log('Performance Observer not supported');
  }
};

// Error tracking
export const trackError = (error, errorInfo = {}) => {
  console.error('Application Error:', error, errorInfo);
  
  // In production, you could send this to an error tracking service
  if (import.meta.env.PROD) {
    // Example: Send to error tracking service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   body: JSON.stringify({ error: error.message, stack: error.stack, ...errorInfo })
    // });
  }
};

// Network status monitoring
export const monitorNetworkStatus = () => {
  if (typeof window === 'undefined' || !('navigator' in window)) return;

  const updateOnlineStatus = () => {
    const status = navigator.onLine ? 'online' : 'offline';
    console.log('Network status:', status);
    
    if (!navigator.onLine) {
      // Show offline notification
      showOfflineNotification();
    }
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  return () => {
    window.removeEventListener('online', updateOnlineStatus);
    window.removeEventListener('offline', updateOnlineStatus);
  };
};

const showOfflineNotification = () => {
  // Simple offline notification
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 10000;
    font-family: Arial, sans-serif;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  notification.textContent = 'You are currently offline';
  document.body.appendChild(notification);
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
};

// Resource loading optimization
export const preloadCriticalResources = () => {
  const preloadLink = (href, as = 'script') => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  };

  // Preload critical fonts (if any)
  // preloadLink('/fonts/font.woff2', 'font');
  
  // Preload critical images
  const criticalImages = [
    '/src/assets/a.jpg', // Profile image
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

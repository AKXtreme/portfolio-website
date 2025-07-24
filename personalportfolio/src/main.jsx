import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Blog from './Blog.jsx';
import NotFound from './NotFound.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { trackPerformance, monitorNetworkStatus, preloadCriticalResources } from './utils/monitoring.js';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Production error handling
const isDevelopment = import.meta.env.MODE === 'development';

// Global error handler for unhandled promises
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  if (!isDevelopment) {
    event.preventDefault(); // Prevent default browser error reporting in production
  }
});

// Global error handler for script errors
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// Enhanced service worker registration with error recovery
if ('serviceWorker' in navigator && 'caches' in window) {
  window.addEventListener('load', async () => {
    try {
      // Unregister old service workers first
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        if (registration.scope.includes('portfolio') && 
            !registration.scope.includes('akalewold-portfolio')) {
          await registration.unregister();
          console.log('Unregistered old SW:', registration.scope);
        }
      }

      // Register new service worker
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none' // Always check for updates
      });

      console.log('SW registered successfully:', registration.scope);

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content available, prompt user to refresh
            if (confirm('New version available! Refresh to update?')) {
              window.location.reload();
            }
          }
        });
      });

      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('SW message:', event.data);
      });

    } catch (error) {
      console.warn('SW registration failed:', error);
    }
  });
}

// Performance monitoring
if (!isDevelopment) {
  // Initialize performance tracking
  trackPerformance();
  
  // Monitor network status
  monitorNetworkStatus();
  
  // Preload critical resources
  preloadCriticalResources();
}

import { useState, useEffect, useRef } from 'react';
import { getResponsiveImageUrl, loadImageWithRetry } from '../utils/imageOptimization';
import { isSlowNetwork } from '../utils/performance';

const OptimizedLazyImage = ({ 
  src, 
  alt, 
  className, 
  onClick,
  priority = false,
  sizes = "100vw",
  quality = 80,
  width = 600,
  placeholder = true,
  retryCount = 3
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority); // Load immediately if priority
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef();
  const observerRef = useRef();

  // Determine image quality based on network conditions
  const adaptiveQuality = isSlowNetwork() ? Math.min(quality - 20, 60) : quality;
  const adaptiveWidth = isSlowNetwork() ? Math.min(width * 0.8, 480) : width;

  useEffect(() => {
    // Set optimized image source
    const optimizedSrc = getResponsiveImageUrl(src, adaptiveWidth, adaptiveQuality);
    setImageSrc(optimizedSrc);

    // Skip intersection observer for priority images
    if (priority) {
      setInView(true);
      return;
    }

    // Create intersection observer for lazy loading
    if (!observerRef.current && imgRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observerRef.current?.disconnect();
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '50px 0px' // Start loading 50px before element comes into view
        }
      );

      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, priority, adaptiveWidth, adaptiveQuality]);

  useEffect(() => {
    if (inView && imageSrc) {
      // Use retry mechanism for loading images
      loadImageWithRetry(imageSrc, retryCount)
        .then(() => {
          setLoaded(true);
          setError(false);
        })
        .catch(() => {
          setError(true);
          setLoaded(false);
        });
    }
  }, [inView, imageSrc, retryCount]);

  const handleImageLoad = () => {
    setLoaded(true);
    setError(false);
  };

  const handleImageError = () => {
    setError(true);
    setLoaded(false);
  };

  return (
    <div 
      ref={imgRef} 
      className={`${className} optimized-image-container`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: placeholder ? '#f3f4f6' : 'transparent'
      }}
    >
      {/* Placeholder/Loading state */}
      {!loaded && !error && placeholder && (
        <div 
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      )}

      {/* Error state */}
      {error && (
        <div 
          className="image-error"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
            color: '#6b7280',
            fontSize: '14px'
          }}
        >
          Failed to load image
        </div>
      )}

      {/* Actual image */}
      {inView && !error && (
        <img
          src={imageSrc}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={onClick}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          sizes={sizes}
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      )}

      {/* Add shimmer animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedLazyImage;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * OptimizedImage Component
 * Features:
 * - Lazy Loading (via native loading="lazy")
 * - WebP Conversion (via images.weserv.nl proxy)
 * - Blur-up Effect (low-res placeholder)
 * - Fade-in Animation
 * - Layout Shift Prevention (via aspect-ratio/dimensions)
 * - Automatic Fallback (via picsum.photos)
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  aspectRatio,
  priority = false,
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset state when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  // Helper to get optimized URL via weserv.nl
  const getOptimizedUrl = (url: string, options: { w?: number; h?: number; blur?: number; output?: string } = {}) => {
    if (!url) return null;
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;
    
    // Handle local assets (assuming they are in public folder or handled by Vite)
    if (url.startsWith('/') && !url.startsWith('//')) {
      return url;
    }

    try {
      const baseUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
      let params = '';
      if (options.w) params += `&w=${options.w}`;
      if (options.h) params += `&h=${options.h}`;
      if (options.blur) params += `&blur=${options.blur}`;
      if (options.output) params += `&output=${options.output}`;
      else params += `&output=webp`; // Default to webp
      
      return `${baseUrl}${params}&il`; // &il for interlaced/progressive
    } catch (e) {
      return url;
    }
  };

  const optimizedSrc = getOptimizedUrl(src, { w: width, h: height });
  const blurPlaceholder = getOptimizedUrl(src, { w: 50, h: 50, blur: 5 });
  
  const fallbackSrc = `https://picsum.photos/seed/${encodeURIComponent(alt || 'fallback')}/${width || 800}/${height || 450}?blur=2`;

  // If no src is provided, we might want to show the fallback immediately or nothing
  const finalSrc = !src ? fallbackSrc : (error ? fallbackSrc : (optimizedSrc || fallbackSrc));

  return (
    <div 
      className={`relative overflow-hidden bg-white/5 transition-all duration-300 ${className}`}
      style={{ 
        aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
      }}
    >
      {/* Blur Placeholder */}
      <AnimatePresence>
        {!isLoaded && !error && blurPlaceholder && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={blurPlaceholder}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full blur-xl scale-110 object-cover"
          />
        )}
      </AnimatePresence>

      {/* Main Image */}
      <motion.img
        key={src}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        src={finalSrc || undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full transition-all duration-500 ${
          objectFit === 'cover' ? 'object-cover' : 
          objectFit === 'contain' ? 'object-contain' : 
          'object-fill'
        }`}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />

      {/* Loading Spinner (Optional overlay) */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;

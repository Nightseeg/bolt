import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function LazyImage({ src, alt, className = '', width, height }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);

    const element = document.createElement('div');
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%'
      }}
    >
      {isInView && !error && (
        <>
          <motion.div
            className="absolute inset-0 bg-white/5"
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
          />
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            decoding="async"
          />
        </>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5">
          <span className="text-white/60">Image non disponible</span>
        </div>
      )}
    </motion.div>
  );
}
// components/UI/OptimizedImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="w-full h-full"> {/* Container pour maintenir le ratio */}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`
            w-full h-full object-cover // ← AJOUTÉ pour maintenir le ratio
            transition-all duration-500
            ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
          `}
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            width: '100%',    // ← Force la largeur à 100%
            height: 'auto',   // ← Maintient le ratio hauteur automatique
          }}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-200 animate-pulse" />
        )}
      </div>
    </div>
  );
}
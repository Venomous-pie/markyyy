import React from 'react';
import Image, { ImageProps } from 'next/image';

interface SmartImageProps extends Omit<ImageProps, 'style'> {
  objectPosition?: string;
  style?: React.CSSProperties;
}

export default function SmartImage({ objectPosition, style, alt, ...props }: SmartImageProps) {
  const parts = (objectPosition || '50% 50%').trim().split(' ');
  const x = parts[0] || '50%';
  const y = parts[1] || '50%';
  const zoom = parts.length > 2 && !isNaN(parseFloat(parts[2])) ? parseFloat(parts[2]) : 1;

  return (
    <Image 
      {...props} 
      alt={alt || ""}
      style={{ 
        objectFit: 'cover',
        ...style, 
        objectPosition: `${x} ${y}`,
        transform: `scale(${zoom})`,
        transformOrigin: 'center'
      }} 
    />
  );
}

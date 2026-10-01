import React, { useState } from 'react';

const FALLBACK_IMAGE = '/gear-fallback.jpg';

export default function GearImage({ src, alt, className = '', ...props }) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) setImageSrc(FALLBACK_IMAGE);
      }}
      {...props}
    />
  );
}
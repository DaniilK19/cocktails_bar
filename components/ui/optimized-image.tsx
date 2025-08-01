"use client"

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  title?: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  title,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  sizes = "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px",
  quality = 80
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      // Fallback to original PNG if WebP fails
      const fallbackSrc = src.replace('/optimized/', '/').replace('.webp', '.png')
      setImgSrc(fallbackSrc)
      setHasError(true)
    }
  }

  // Next.js Image handles responsive loading automatically
  // We just need to ensure the optimized images are used

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        title={title || alt}
        fill
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      title={title || alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
      onError={handleError}
    />
  )
}
import React, { useMemo, useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, style, className, ...rest } = props
  const [index, setIndex] = useState(0)
  const [didError, setDidError] = useState(false)

  const fallbackSources = useMemo(() => {
    const label = String(alt ?? 'fashion product').trim()
    const lower = label.toLowerCase()
    const encodedQuery = encodeURIComponent(lower.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim())

    const categoryPool =
      lower.includes('perfume') || lower.includes('scent') || lower.includes('fragrance')
        ? [
            'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&auto=format&fit=crop&q=80',
          ]
        : lower.includes('jewel') || lower.includes('ring') || lower.includes('necklace') || lower.includes('bracelet')
          ? [
              'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&auto=format&fit=crop&q=80',
            ]
          : lower.includes('phone') || lower.includes('speaker') || lower.includes('camera') || lower.includes('tablet') || lower.includes('headphone')
            ? [
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
              ]
            : lower.includes('dress') || lower.includes('shirt') || lower.includes('jeans') || lower.includes('hoodie') || lower.includes('blazer')
              ? [
                  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&auto=format&fit=crop&q=80',
                ]
              : lower.includes('serum') || lower.includes('lipstick') || lower.includes('makeup') || lower.includes('cleanser')
                ? [
                    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80',
                  ]
                : [
                    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1200&auto=format&fit=crop&q=80',
                  ]

    return [
      src,
      `https://source.unsplash.com/1200x1200/?${encodedQuery}`,
      ...categoryPool,
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80',
    ].filter(Boolean) as string[]
  }, [alt, src])

  const handleError = () => {
    if (index < fallbackSources.length - 1) {
      setIndex(prev => prev + 1)
      return
    }
    setDidError(true)
  }

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={fallbackSources[index]} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}

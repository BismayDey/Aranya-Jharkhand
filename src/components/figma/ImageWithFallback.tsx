import React, { useEffect, useMemo, useState } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  sources?: string[]; // array of fallback sources
}

export function ImageWithFallback({
  sources,
  src,
  alt = "Image",
  className = "",
  style,
  ...rest
}: ImageWithFallbackProps) {
  // Memoize candidates so useEffect dependency is stable
  const candidates = useMemo(
    () => (Array.isArray(sources) ? sources : src ? [src] : []),
    [sources, src]
  );

  const [index, setIndex] = useState(0);
  const [exhausted, setExhausted] = useState(false);

  useEffect(() => {
    setIndex(0);
    setExhausted(false);
  }, [candidates]);

  const handleError = () => {
    if (index < candidates.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setExhausted(true);
    }
  };

  const currentSrc = candidates[index];

  if (exhausted || !currentSrc) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={ERROR_IMG_SRC}
            alt={alt}
            data-original-url={src || candidates[0]}
          />
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
    />
  );
}

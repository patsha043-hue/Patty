import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface CartoonImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function CartoonImage({ src, alt, className = '', fallbackTitle }: CartoonImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EAF6FD] via-[#FFF8E8] to-[#ECF9F0] p-6 text-center text-[#29466B] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD966] border-2 border-[#29466B]/20">
          <BookOpen className="h-7 w-7 text-[#29466B]" />
        </div>
        <p className="font-display text-sm font-bold text-[#29466B]">
          {fallbackTitle || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  fallbackUrl?: string;
  caption?: string;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  fallbackUrl,
  caption,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-[#181d2a]/80 hover:bg-[#202738] text-white border border-[#2d374d] transition-colors"
        aria-label="Fechar fotografia"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={caption || 'Fotografia de Aveiro'}
          className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-[#22293b]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
              e.currentTarget.src = fallbackUrl;
            }
          }}
        />

        {caption && (
          <p className="mt-4 text-center text-xs sm:text-sm text-[#d5d0c5] font-light bg-[#11141c]/90 px-4 py-2 rounded-full border border-[#202738] max-w-2xl">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};

import React from 'react';

const UniversalBG = ({ 
  src, 
  type = 'image', 
  opacity = 1, 
  blur = 0,
  overlayColor = 'transparent' 
}) => {
  
  // Decide which element to render based on the 'type' prop
  const renderMedia = () => {
    const commonClasses = "absolute inset-0 w-full h-full object-cover pointer-events-none";

    switch (type) {
      case 'video':
        return (
          <video 
            src={src} 
            className={commonClasses} 
            autoPlay 
            muted 
            loop 
            playsInline 
          />
        );
      case 'iframe':
      case 'html':
        return (
          <iframe 
            src={src} 
            className={`${commonClasses} pointer-events-auto`} 
            frameBorder="0" 
            title="background-frame"
          />
        );
      case 'image':
      default:
        return (
          <img 
            src={src} 
            alt="background" 
            className={commonClasses} 
          />
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden" 
      style={{ opacity: opacity }}
    >
      {/* Media Layer */}
      <div style={{ filter: `blur(${blur}px)` }} className="w-full h-full">
        {renderMedia()}
      </div>

      {/* Optional Overlay Layer (for Glassmorphism effect) */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: overlayColor }}
      />
    </div>
  );
};

export default UniversalBG;
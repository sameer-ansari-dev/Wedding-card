import React from 'react';

export const IslamicArchBorder = ({ children, className = "" }) => {
  return (
    <div className={`relative p-6 sm:p-8 rounded-t-[4rem] sm:rounded-t-[6rem] rounded-b-2xl border border-gold/30 bg-maroon-800/80 backdrop-blur-md shadow-2xl ${className}`}>
      {/* Top Gold Dome Arch Trim */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center space-x-2">
        <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold" />
        <div className="w-3 h-3 rotate-45 border border-gold bg-maroon-900" />
        <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold" />
      </div>

      {/* Four Corner Ornaments */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold/70" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold/70" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold/70" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold/70" />

      {children}
    </div>
  );
};

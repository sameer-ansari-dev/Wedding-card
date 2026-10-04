import React from 'react';

export const MandalaOrnament = ({ className = "w-24 h-24", color = "#D4AF37", animate = true }) => {
  return (
    <svg 
      className={`${className} ${animate ? 'animate-[spin_40s_linear_infinite]' : ''}`} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <circle cx="100" cy="100" r="65" stroke={color} strokeWidth="1" opacity="0.5" />
      
      {/* 8-pointed Islamic Star geometry */}
      <g stroke={color} strokeWidth="1.5" opacity="0.85">
        <rect x="40" y="40" width="120" height="120" rx="4" transform="rotate(0 100 100)" fill="none" />
        <rect x="40" y="40" width="120" height="120" rx="4" transform="rotate(45 100 100)" fill="none" />
      </g>

      {/* Decorative Ornaments */}
      <g fill={color} opacity="0.9">
        <circle cx="100" cy="20" r="4" />
        <circle cx="100" cy="180" r="4" />
        <circle cx="20" cy="100" r="4" />
        <circle cx="180" cy="100" r="4" />
        <circle cx="43.4" cy="43.4" r="3" />
        <circle cx="156.6" cy="156.6" r="3" />
        <circle cx="156.6" cy="43.4" r="3" />
        <circle cx="43.4" cy="156.6" r="3" />
      </g>

      {/* Center Crescent and Star */}
      <circle cx="100" cy="100" r="28" stroke={color} strokeWidth="1" opacity="0.7" />
      <path 
        d="M98 88 C90 88 84 94 84 102 C84 110 90 116 98 116 C93 114 90 108 90 102 C90 96 93 90 98 88 Z" 
        fill={color} 
      />
      <polygon points="108,98 110,102 114,102 111,104 112,108 108,105 104,108 105,104 102,102 106,102" fill={color} />
    </svg>
  );
};

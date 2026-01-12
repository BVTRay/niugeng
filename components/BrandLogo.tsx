
import React from 'react';

interface BrandLogoProps {
  className?: string;
  color?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "w-10 h-10", color = "currentColor" }) => {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bull Head - Upper Part */}
      <path 
        d="M35 55 C35 55 45 90 100 105 C155 90 165 55 165 55 C165 55 155 75 135 80 C155 60 160 30 150 20 C130 35 115 65 100 65 C85 65 70 35 50 20 C40 30 45 60 65 80 C45 75 35 55 35 55 Z" 
        fill={color}
      />
      
      {/* Terrace Fields - Lower Part (Abstract Bowl Shape) */}
      <path 
        d="M25 120 Q 100 155 175 120 L 170 140 Q 100 175 30 140 Z" 
        fill={color}
      />
      <path 
        d="M35 150 Q 100 180 165 150 L 160 165 Q 100 195 40 165 Z" 
        fill={color}
      />
      <path 
        d="M50 175 Q 100 190 150 175 L 145 185 Q 100 200 55 185 Z" 
        fill={color}
      />
    </svg>
  );
};

export const TerracePattern: React.FC<{ className?: string, opacity?: string }> = ({ className = "", opacity = "0.05" }) => (
  <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ opacity }} viewBox="0 0 400 400" preserveAspectRatio="none">
     <path d="M-50 300 Q 200 450 450 300" stroke="currentColor" strokeWidth="2" fill="none"/>
     <path d="M-50 340 Q 200 490 450 340" stroke="currentColor" strokeWidth="2" fill="none"/>
     <path d="M-50 380 Q 200 530 450 380" stroke="currentColor" strokeWidth="2" fill="none"/>
     <path d="M-50 260 Q 200 410 450 260" stroke="currentColor" strokeWidth="1" fill="none"/>
  </svg>
);

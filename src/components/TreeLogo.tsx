import React from 'react';

interface TreeLogoProps {
  className?: string;
  size?: number | string;
}

export default function TreeLogo({ className = 'w-10 h-10', size }: TreeLogoProps) {
  return (
    <svg
      viewBox="0 0 400 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Foliage Canopy - Vibrant Lime Green (Scalloped lobes like the image) */}
      <g id="tree-canopy">
        {/* Outer cloud/scalloped foliage */}
        <circle cx="200" cy="180" r="105" fill="#78C043" />
        <circle cx="150" cy="125" r="75" fill="#78C043" />
        <circle cx="250" cy="125" r="75" fill="#78C043" />
        <circle cx="200" cy="85" r="65" fill="#78C043" />
        <circle cx="110" cy="180" r="65" fill="#78C043" />
        <circle cx="290" cy="180" r="65" fill="#78C043" />
        <circle cx="130" cy="240" r="65" fill="#78C043" />
        <circle cx="270" cy="240" r="65" fill="#78C043" />
        <circle cx="200" cy="260" r="60" fill="#78C043" />
      </g>

      {/* White Outline Silhouette backing for high contrast against green */}
      <g id="white-contour">
        {/* Child 1 Head (Left) */}
        <circle cx="172" cy="192" r="18" fill="white" />
        {/* Child 2 Head (Right) */}
        <circle cx="230" cy="210" r="16" fill="white" />

        {/* Outline of Trunk and reaching arms */}
        <path
          d="M 190 350 
             C 170 348 150 345 130 350 
             C 145 310 160 265 130 220 
             C 110 190 90 170 85 170 
             C 85 160 120 170 175 220 
             C 185 190 195 155 210 120 
             C 215 110 225 125 215 160 
             C 210 190 205 215 220 225 
             C 245 195 285 185 305 185 
             C 305 195 275 205 235 245 
             C 225 275 235 315 255 348 
             C 230 345 210 348 190 350 Z"
          fill="white"
          stroke="white"
          strokeWidth="10"
          strokeLinejoin="round"
        />
      </g>

      {/* Purple Trunk & Reaching Children Figures */}
      <g id="purple-figures" fill="#9C27B0">
        {/* Left Child Head */}
        <circle cx="172" cy="192" r="14" fill="#9C27B0" />
        {/* Right Child Head */}
        <circle cx="230" cy="210" r="12" fill="#9C27B0" />

        {/* Central Growing Tree Body with Arms/Branches Reaching for Knowledge */}
        <path
          d="M 195 348 
             C 175 346 158 344 140 348 
             C 152 312 165 270 138 228 
             C 122 202 102 182 95 180 
             C 98 174 125 182 172 226 
             C 183 194 196 160 210 126 
             C 214 118 220 130 212 162 
             C 207 190 203 216 216 226 
             C 240 198 276 190 295 190 
             C 292 198 266 206 230 244 
             C 220 274 230 312 248 346 
             C 228 344 212 346 195 348 Z"
        />
      </g>

      {/* Open Book Base in Purple */}
      <g id="open-book-base">
        {/* Top page layer */}
        <path
          d="M 130 345 
             C 165 340 195 348 200 352 
             C 205 348 235 340 270 345 
             L 266 358 
             C 235 352 205 358 200 364 
             C 195 358 165 352 134 358 Z"
          fill="#8E24AA"
        />

        {/* Middle page layer */}
        <path
          d="M 112 360 
             C 155 355 195 365 200 370 
             C 205 365 245 355 288 360 
             L 284 374 
             C 245 368 205 376 200 382 
             C 195 376 155 368 116 374 Z"
          fill="#9C27B0"
        />

        {/* Bottom swooping page layer */}
        <path
          d="M 86 378 
             C 140 374 195 386 200 392 
             C 205 386 260 374 314 378 
             L 308 396 
             C 260 388 205 398 200 404 
             C 195 398 140 388 92 396 Z"
          fill="#7B1FA2"
        />
      </g>
    </svg>
  );
}

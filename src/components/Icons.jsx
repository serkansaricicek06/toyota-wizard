import React from 'react';

export function CheckIcon({ size = 11, color = '#fff' }) {
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 12 10" fill="none">
      <polyline points="1,5 4.5,8.5 11,1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BackIcon({ color = '#282830', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M13 4l-6 6 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ color = '#6C7073', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <line x1="3" y1="3" x2="13" y2="13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="13" y1="3" x2="3" y2="13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function CheckboxIcon({ color = '#A8AAAC' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="8.5" height="8.5" rx="1.5" stroke={color} strokeWidth="1.3" />
      <rect x="4.5" y="4.5" width="8.5" height="8.5" rx="1.5" fill="none" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

export function RadioIcon({ color = '#A8AAAC' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke={color} strokeWidth="1.3" />
      <circle cx="7" cy="7" r="2.6" fill={color} />
    </svg>
  );
}

export function ChevronDownIcon({ color = '#6C7073', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 6l4 4 4-4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InfoIcon({ size = 16, color = '#A8AAAC' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.4" />
      <path d="M8 1a7 7 0 000 14z" fill={color} />
    </svg>
  );
}

export function ToyotaLogo({ height = 32, color = '#282830', src = null, style = {} }) {
  const [imgError, setImgError] = React.useState(false);
  const customSrc = !imgError ? (src || (typeof window !== 'undefined' ? window.__CUSTOM_LOGO__ : null)) : null;

  if (customSrc) {
    return (
      <img
        src={customSrc}
        alt="Toyota Logo"
        onError={() => setImgError(true)}
        style={{
          height: height,
          width: 'auto',
          maxHeight: height,
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
          ...style
        }}
      />
    );
  }

  return (
    <svg
      height={height}
      viewBox="0 0 148 97"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: 'auto', margin: '0 auto', ...style }}
    >
      <path
        d="M73.8095 0C33.0447 0 0 21.5606 0 48.1561C0 74.7515 33.0447 96.3074 73.8095 96.3074C114.574 96.3074 147.624 74.7468 147.624 48.1561C147.624 21.5653 114.574 0 73.8095 0ZM73.8095 75.6362C67.7454 75.6362 62.8008 63.5948 62.4836 48.4384C66.1361 48.7725 69.9471 48.9466 73.8095 48.9466C77.6718 48.9466 81.4829 48.7725 85.14 48.4384C84.8182 63.5948 79.8689 75.6362 73.8095 75.6362ZM63.2393 36.4158C64.8906 25.7014 69.0002 18.1115 73.8095 18.1115C78.6188 18.1115 82.733 25.7014 84.3843 36.4158C81.0024 36.7217 77.4619 36.8864 73.8095 36.8864C70.157 36.8864 66.6212 36.7029 63.2393 36.4158ZM73.8095 6.97355C65.8795 6.97355 59.1437 18.9255 56.6527 35.6018C41.6417 33.249 31.1602 27.866 31.1602 21.6171C31.1602 13.1754 50.2574 6.35242 73.8095 6.35242C97.3615 6.35242 116.459 13.1754 116.459 21.6171C116.459 27.866 105.982 33.2349 90.9709 35.6018C88.48 18.9255 81.7348 6.97355 73.8095 6.97355ZM10.5842 46.3492C10.5842 38.1851 13.6955 30.5387 19.1206 23.9604C19.0584 24.4283 19.0272 24.8999 19.0273 25.372C19.0273 35.6583 34.3182 44.4105 55.6452 47.6338C55.6452 48.3819 55.6452 49.1348 55.6452 49.8924C55.6452 69.0532 60.9722 85.2777 68.3238 90.7832C35.9601 88.7974 10.5842 69.6414 10.5842 46.3492ZM79.2998 90.7643C86.6561 85.2589 91.9831 69.0344 91.9831 49.8736C91.9831 49.116 91.9831 48.3631 91.9831 47.6149C113.31 44.3917 128.601 35.6394 128.601 25.3532C128.602 24.8809 128.569 24.4091 128.503 23.9416C133.933 30.5293 137.044 38.1663 137.044 46.3303C137.039 69.6414 111.659 88.7974 79.2998 90.7643Z"
        fill={color}
      />
    </svg>
  );
}

export function MobileStatusBar({ textColor = '#111' }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px 0 28px',
      zIndex: 60,
      pointerEvents: 'none'
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: textColor, letterSpacing: '0.2px' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <svg width="17" height="12" viewBox="0 0 17 12">
          <rect x="0" y="5" width="3" height="7" rx="0.5" fill={textColor} />
          <rect x="4.5" y="3.5" width="3" height="8.5" rx="0.5" fill={textColor} />
          <rect x="9" y="1.5" width="3" height="10.5" rx="0.5" fill={textColor} />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" fill={textColor} opacity="0.25" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" fill={textColor} />
          <path d="M3.5 6.5C5 5 6.4 4.2 8 4.2s3 .8 4.5 2.3" stroke={textColor} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M1 3.5C3.2 1.3 5.5 0 8 0s4.8 1.3 7 3.5" stroke={textColor} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
          <rect x="0.5" y="0.5" width="21" height="12" rx="3" stroke={textColor} strokeWidth="1" />
          <rect x="2" y="2" width="16" height="9" rx="1.5" fill={textColor} />
          <path d="M22.5 4.5v4a2.5 2 0 000-4z" fill={textColor} opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

export function ConcentricEllipses({ opacity = 0.04, size = 380, right = -80, top = 40 }) {
  return (
    <svg
      width={size}
      height={size * 0.66}
      viewBox="0 0 800 528"
      aria-hidden="true"
      style={{ position: 'absolute', right, top, opacity, pointerEvents: 'none' }}
    >
      <g fill="none" stroke="#282830" strokeWidth="1.5">
        <ellipse cx="400" cy="264" rx="392" ry="252" />
        <ellipse cx="400" cy="300" rx="118" ry="176" />
        <ellipse cx="400" cy="212" rx="300" ry="92" />
      </g>
    </svg>
  );
}

export function AmbientGlow({ glowRadius = 520, arcTop = '65%' }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #FAFAFA 0%, #EFEFF1 100%)' }} />
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: 0,
        transform: 'translateX(-50%)',
        width: glowRadius * 2,
        height: glowRadius * 2,
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)'
      }} />
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: arcTop,
          width: '100%',
          height: 120,
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, #000 25%, #000 75%, transparent 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, #000 25%, #000 75%, transparent 100%)'
        }}
      >
        <path d="M0 96 Q720 32 1440 96" fill="none" stroke="#E4E4E4" strokeWidth="1" />
      </svg>
    </div>
  );
}

import React from 'react';
import { ToyotaLogo, BackIcon } from './Icons';

export function DesktopHeader({ onBack }) {
  return (
    <header style={{
      height: 56,
      background: '#fff',
      borderBottom: '1px solid #E4E4E4',
      display: 'flex',
      alignItems: 'center',
      padding: '0 40px',
      position: 'relative',
      zIndex: 50
    }}>
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Geri"
          className="dt-focusable"
          style={{
            position: 'absolute',
            left: 40,
            width: 40,
            height: 40,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <BackIcon size={20} color="#282830" />
        </button>
      )}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center' }}>
        <ToyotaLogo height={32} />
      </div>
    </header>
  );
}

export function MobileHeader({ onBack }) {
  return (
    <header style={{
      height: 56,
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      position: 'relative',
      zIndex: 50,
      borderBottom: '1px solid #E4E4E4'
    }}>
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Geri"
          style={{
            width: 44,
            height: 44,
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <BackIcon size={20} color="#282830" />
        </button>
      )}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <ToyotaLogo height={32} />
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { CheckIcon, BackIcon, ToyotaLogo, MobileStatusBar } from './Icons';
import { DesktopHeader } from './Header';

export function DesktopProfileStep({ q, displayStep, totalSteps, multiSelect = false, onNext, onBack }) {
  const [singleSelected, setSingleSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState(new Set());
  const [showMaxError, setShowMaxError] = useState(false);
  const maxSelections = q.max ?? 2;

  const handleSelect = (idx) => {
    if (!multiSelect) {
      if (singleSelected !== null) return;
      setSingleSelected(idx);
      setTimeout(() => onNext([q.opts[idx].t]), 300);
      return;
    }

    setMultiSelected(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
        setShowMaxError(false);
        return next;
      }
      if (next.size >= maxSelections) {
        setShowMaxError(true);
        return prev;
      }
      next.add(idx);
      setShowMaxError(false);
      return next;
    });
  };

  const hasMultiSelections = multiSelected.size > 0;

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <DesktopHeader onBack={onBack} />
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '52px 40px 64px', width: '100%' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <span style={{ fontSize: 15, color: '#6C7073', whiteSpace: 'nowrap' }}>Sizi tanıyalım</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(stepNum => (
              <div
                key={stepNum}
                style={{
                  width: 56,
                  height: 5,
                  borderRadius: 2,
                  background: stepNum < displayStep ? '#282830' : stepNum === displayStep ? '#FF0022' : '#E4E4E4',
                  transition: 'background 0.2s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Title & subtitle */}
        <h1 style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 700,
          color: '#282830',
          lineHeight: 1.15,
          letterSpacing: '-0.3px'
        }}>
          {q.title}
        </h1>
        <p style={{
          margin: '14px 0 36px',
          fontSize: 15,
          color: '#6C7073',
          lineHeight: 1.5
        }}>
          {q.sub}
        </p>

        {/* Options list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {q.opts.map((opt, idx) => {
            const isSelected = multiSelect ? multiSelected.has(idx) : singleSelected === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), handleSelect(idx))}
                className="dt-answer-card dt-focusable"
                style={{
                  minHeight: 88,
                  background: '#fff',
                  border: `1px solid ${isSelected ? '#4CAF50' : '#E4E4E4'}`,
                  borderLeft: `4px solid ${isSelected ? '#4CAF50' : '#282830'}`,
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  gap: 16
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#282830', lineHeight: 1.3 }}>
                    {opt.t}
                  </p>
                  {opt.d && (
                    <p style={{ margin: '4px 0 0', fontSize: 14, color: '#6C7073', lineHeight: 1.4 }}>
                      {opt.d}
                    </p>
                  )}
                </div>
                {isSelected && (
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <CheckIcon size={12} color="#fff" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {showMaxError && (
          <p style={{ margin: '14px 0 0', fontSize: 14, color: '#FF4444' }}>
            En fazla 2 seçim yapabilirsiniz. Değiştirmek için birini bırakın.
          </p>
        )}

        {multiSelect && (
          <button
            onClick={() => hasMultiSelections && onNext(q.opts.filter((_, idx) => multiSelected.has(idx)).map(o => o.t))}
            disabled={!hasMultiSelections}
            className={hasMultiSelections ? 'dt-solid-btn dt-focusable' : ''}
            style={{
              margin: '32px auto 0',
              display: 'block',
              width: 280,
              height: 48,
              borderRadius: 10,
              border: 'none',
              background: hasMultiSelections ? '#282830' : '#E4E4E4',
              color: hasMultiSelections ? '#fff' : '#A8AAAC',
              fontSize: 15,
              fontWeight: 600,
              cursor: hasMultiSelections ? 'pointer' : 'default',
              transition: 'background .2s, color .2s'
            }}
          >
            Devam et
          </button>
        )}
      </div>
    </div>
  );
}

export function MobileProfileStep({ q, displayStep, totalSteps, multiSelect = false, onNext, onBack }) {
  const [singleSelected, setSingleSelected] = useState(null);
  const [multiSelected, setMultiSelected] = useState(new Set());
  const [showMaxError, setShowMaxError] = useState(false);
  const maxSelections = q.max ?? 2;

  const handleSelect = (idx) => {
    if (!multiSelect) {
      if (singleSelected !== null) return;
      setSingleSelected(idx);
      setTimeout(() => onNext([q.opts[idx].t]), 340);
      return;
    }

    setMultiSelected(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
        setShowMaxError(false);
        return next;
      }
      if (next.size >= maxSelections) {
        setShowMaxError(true);
        return prev;
      }
      next.add(idx);
      setShowMaxError(false);
      return next;
    });
  };

  const hasMultiSelections = multiSelected.size > 0;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <MobileStatusBar />
      <div style={{
        position: 'absolute',
        top: 44,
        bottom: multiSelect ? 88 : 0,
        left: 0,
        right: 0,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ToyotaLogo height={26} />
        </div>

        {/* Header navigation bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 20px 0', height: 60 }}>
          <button
            onClick={onBack}
            style={{
              visibility: displayStep === 1 ? 'hidden' : 'visible',
              width: 44,
              height: 44,
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0
            }}
          >
            <BackIcon color="#282830" size={20} />
          </button>
          <span style={{ fontSize: 14, color: '#6C7073', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Sizi tanıyalım
          </span>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 5, flexShrink: 1, minWidth: 0 }}>
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(stepNum => (
              <div
                key={stepNum}
                style={{
                  width: totalSteps > 3 ? 24 : 36,
                  height: 5,
                  borderRadius: 2,
                  background: stepNum < displayStep ? '#282830' : stepNum === displayStep ? '#FF0022' : '#E4E4E4',
                  transition: 'background 0.2s',
                  flexShrink: 1
                }}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          margin: '32px 20px 0',
          padding: 0,
          fontSize: 30,
          fontWeight: 800,
          color: '#282830',
          lineHeight: 1.15
        }}>
          {q.title}
        </h1>
        <p style={{
          margin: '8px 20px 28px',
          padding: 0,
          fontSize: 15,
          color: '#6C7073',
          lineHeight: 1.5
        }}>
          {q.sub}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 20px', paddingBottom: 40 }}>
          {q.opts.map((opt, idx) => {
            const isSelected = multiSelect ? multiSelected.has(idx) : singleSelected === idx;
            return (
              <div
                key={idx}
                onClick={() => handleSelect(idx)}
                style={{
                  minHeight: opt.d ? 76 : 64,
                  background: '#fff',
                  border: `1px solid ${isSelected ? '#4CAF50' : '#E4E4E4'}`,
                  borderLeft: `4px solid ${isSelected ? '#4CAF50' : '#282830'}`,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  gap: 12,
                  transition: 'border-color 0.18s'
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 19, fontWeight: 700, color: '#282830', lineHeight: 1.3 }}>
                    {opt.t}
                  </p>
                  {opt.d && (
                    <p style={{ margin: '4px 0 0', fontSize: 14, color: '#6C7073', lineHeight: 1.4 }}>
                      {opt.d}
                    </p>
                  )}
                </div>
                {isSelected && (
                  <div style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <CheckIcon size={11} color="#fff" />
                  </div>
                )}
              </div>
            );
          })}
          {showMaxError && (
            <p style={{ margin: '4px 0 0', fontSize: 14, color: '#FF4444', lineHeight: 1.4 }}>
              En fazla 2 seçim yapabilirsiniz. Değiştirmek için birini bırakın.
            </p>
          )}
        </div>
      </div>

      {multiSelect && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '16px 20px',
          background: '#fff',
          borderTop: '1px solid #E4E4E4'
        }}>
          <button
            onClick={() => hasMultiSelections && onNext(q.opts.filter((_, idx) => multiSelected.has(idx)).map(o => o.t))}
            disabled={!hasMultiSelections}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 10,
              border: 'none',
              background: hasMultiSelections ? '#282830' : '#E4E4E4',
              color: hasMultiSelections ? '#fff' : '#A8AAAC',
              fontSize: 16,
              fontWeight: 700,
              cursor: hasMultiSelections ? 'pointer' : 'default',
              transition: 'background 0.2s, color 0.2s'
            }}
          >
            Devam et
          </button>
        </div>
      )}
    </div>
  );
}

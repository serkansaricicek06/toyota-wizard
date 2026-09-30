import React, { useEffect, useRef } from 'react';
import { CheckIcon, BackIcon, ToyotaLogo, MobileStatusBar, CheckboxIcon, RadioIcon } from './Icons';
import { DesktopHeader } from './Header';
import { MAX_CATEGORY_SELECTIONS } from '../data/filterData';

// Canvas text measurement for fitting text in circular bubbles
let canvasContext = null;
function measureLines(text, fontSize, maxWidth) {
  if (!canvasContext) {
    const canvas = document.createElement('canvas');
    canvasContext = canvas.getContext('2d');
  }
  if (!canvasContext) return Math.ceil(text.length / 12);
  canvasContext.font = `600 ${fontSize}px "Plus Jakarta Sans", system-ui, sans-serif`;

  let lines = 0;
  let currentLine = '';
  const words = text.split(/\s+/);

  for (const word of words) {
    if (currentLine === '') {
      currentLine = word;
      continue;
    }
    if (canvasContext.measureText(currentLine + ' ' + word).width <= maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines++;
      currentLine = word;
    }
  }
  if (currentLine !== '') lines++;
  return Math.max(1, lines);
}

const FONT_SCALES_DESKTOP = [
  { fontSize: 17, lineHeight: 1.25, maxLines: 3 },
  { fontSize: 16, lineHeight: 1.2, maxLines: 3 },
  { fontSize: 15, lineHeight: 1.15, maxLines: 4 }
];

const FONT_SCALES_MOBILE = [
  { fontSize: 13, lineHeight: 1.2, maxLines: 3 },
  { fontSize: 12, lineHeight: 1.15, maxLines: 3 },
  { fontSize: 11, lineHeight: 1.1, maxLines: 4 }
];

function calculateBubbleStyle(text, targetDiameter, maxDiameter, scales, padding) {
  const contentWidth = targetDiameter - 2 * padding;
  for (const scale of scales) {
    if (measureLines(text, scale.fontSize, contentWidth) <= scale.maxLines) {
      return { fontSize: scale.fontSize, lineHeight: scale.lineHeight, diameter: targetDiameter };
    }
  }
  const fallback = scales[scales.length - 1];
  return { fontSize: fallback.fontSize, lineHeight: fallback.lineHeight, diameter: maxDiameter };
}

export function CategoryFilter({
  variant = 'desktop',
  cats,
  selections,
  onToggleOpt,
  onToggleNoOpts,
  towSub,
  onTowSub,
  singleModelMode,
  returnToSummary,
  onReview,
  onExit,
  openCatId,
  setOpenCatId
}) {
  const isDesktop = variant === 'desktop';
  const targetDiameter = isDesktop ? 168 : 130;
  const maxDiameter = isDesktop ? 192 : 142;
  const padding = isDesktop ? 14 : 10;
  const scales = isDesktop ? FONT_SCALES_DESKTOP : FONT_SCALES_MOBILE;
  const checkSize = isDesktop ? 28 : 24;
  const dotSmall = isDesktop ? 10 : 8;
  const dotActive = isDesktop ? 28 : 22;
  const titleSize = isDesktop ? 34 : 24;
  const subtitleSize = isDesktop ? 15 : 13;
  const colGap = isDesktop ? 28 : 14;
  const rowGap = isDesktop ? 24 : 14;


  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const currentCategory = (openCatId !== null ? cats.find(c => c.id === openCatId) : null) ?? cats[0] ?? null;
  if (!currentCategory) return null;

  const optionCount = currentCategory.options ? currentCategory.options.length : 0;
  const isNoOpts = !!currentCategory.noOpts;
  const isSingleRow = !isNoOpts && optionCount <= 5;

  const currentIndex = cats.findIndex(c => c.id === currentCategory.id);
  const isFirst = currentIndex <= 0;
  const isLast = currentIndex >= cats.length - 1;

  const goToCategoryIndex = (idx) => {
    if (cats[idx]) setOpenCatId(cats[idx].id);
  };

  const handleNext = () => {
    if (isLast) onReview();
    else goToCategoryIndex(currentIndex + 1);
  };

  const handleCTA = () => {
    if (returnToSummary) onReview();
    else handleNext();
  };

  const handleBack = () => {
    if (returnToSummary) onReview();
    else if (isFirst) onExit();
    else goToCategoryIndex(currentIndex - 1);
  };

  const selectedInCat = selections[currentCategory.id] ?? [];
  const limitReached = !currentCategory.radio && selectedInCat.length >= MAX_CATEGORY_SELECTIONS;
  const hasSelections = selectedInCat.length > 0;
  const hasNoOptsSelected = !!currentCategory.noOpts && selectedInCat.length > 0;

  const canContinue = returnToSummary ? true : singleModelMode ? hasSelections : isLast ? true : hasSelections;
  const buttonLabel = returnToSummary ? 'Özete dön' : isLast ? 'Seçimlerimi gözden geçir' : 'Devam et';
  const showSkip = !isLast && !returnToSummary && !singleModelMode;

  const hintText = currentCategory.noOpts
    ? 'Bu özelliği ekleyebilirsiniz'
    : currentCategory.radio
    ? 'Sadece birini seçebilirsiniz'
    : 'En fazla 2 seçebilirsiniz';

  const renderBubble = (opt, idx) => {
    const isSelected = selectedInCat.includes(opt);
    const isDisabled = limitReached && !isSelected;
    const { fontSize, lineHeight, diameter } = calculateBubbleStyle(opt, targetDiameter, maxDiameter, scales, padding);
    const radius = diameter / 2;
    const sin45 = 0.70710678;

    const baseBg = `color-mix(in srgb, ${currentCategory.color} 12%, #1E1E26)`;
    const glowShadow = `0 0 0 6px ${currentCategory.color}59, 0 8px 24px rgba(0,0,0,0.45)`;

    return (
      <div
        key={opt}
        style={!isSelected && !isDisabled ? {
          animationName: 'floatItem',
          animationDuration: '4.5s',
          animationDelay: `${(idx * 370) % 3600}ms`,
          animationTimingFunction: 'ease-in-out',
          animationIterationCount: 'infinite'
        } : undefined}
      >
        <button
          disabled={isDisabled}
          onClick={() => onToggleOpt(currentCategory.id, opt, !!currentCategory.radio, currentCategory.exclusivePair)}
          className={isDesktop ? 'dt-focusable' : undefined}
          aria-pressed={isSelected}
          style={{
            width: diameter,
            height: diameter,
            flex: 'none',
            borderRadius: '50%',
            position: 'relative',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            background: isSelected ? currentCategory.color : baseBg,
            border: `2px solid ${isSelected ? 'transparent' : isDisabled ? '#2A2A32' : currentCategory.color + 'A6'}`,
            boxShadow: isSelected ? glowShadow : '0 6px 20px rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: `0 ${padding}px`,
            opacity: isDisabled ? 0.35 : 1,
            transform: isSelected ? 'scale(1.03)' : 'scale(1)',
            transition: 'transform .15s, border-color .15s, background .15s, box-shadow .15s, opacity .2s',
            WebkitTapHighlightColor: 'transparent'
          }}
          onMouseEnter={isDesktop ? (e) => {
            if (!isSelected && !isDisabled) {
              const el = e.currentTarget;
              el.style.background = `color-mix(in srgb, ${currentCategory.color} 20%, #1E1E26)`;
              el.style.borderColor = currentCategory.color;
              el.style.transform = 'scale(1.04)';
            }
          } : undefined}
          onMouseLeave={isDesktop ? (e) => {
            if (!isSelected && !isDisabled) {
              const el = e.currentTarget;
              el.style.background = baseBg;
              el.style.borderColor = currentCategory.color + 'A6';
              el.style.transform = 'scale(1)';
            }
          } : undefined}
        >
          {isSelected && (
            <div style={{
              position: 'absolute',
              left: radius + radius * sin45,
              top: radius - radius * sin45,
              transform: 'translate(-50%, -50%)',
              width: checkSize,
              height: checkSize,
              borderRadius: '50%',
              background: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 3px #15151B',
              zIndex: 2
            }}>
              <CheckIcon size={Math.round(checkSize * 0.42)} color="#fff" />
            </div>
          )}
          <span style={{
            width: diameter - 2 * padding,
            fontSize,
            fontWeight: 600,
            color: '#fff',
            textAlign: 'center',
            lineHeight,
            wordBreak: 'normal',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {opt}
          </span>
        </button>
      </div>
    );
  };

  // Centered sliding carousel pagination: active dot is ALWAYS in the center, left & right fade out
  const slotWidth = isDesktop ? 18 : 16;
  const visibleSlots = 11;
  const centerSlotIdx = 5; // index of center slot (0-10)
  const containerWidth = visibleSlots * slotWidth;

  const dotsIndicator = !singleModelMode && (
    <div style={{
      width: containerWidth,
      height: 28,
      position: 'relative',
      overflow: 'hidden',
      margin: '0 auto',
      marginBottom: isDesktop ? (isNoOpts ? 56 : 48) : (isNoOpts ? 32 : 26),
      maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        transform: `translateX(${(centerSlotIdx - currentIndex) * slotWidth}px)`,
        transition: 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
        willChange: 'transform'
      }}>
        {cats.map((c, idx) => {
          const hasSome = (selections[c.id] ?? []).length > 0;
          const isActive = idx === currentIndex;
          const dist = Math.abs(idx - currentIndex);

          // Progressive sizing & opacity centered on active item
          let w, h, bg, op;
          if (isActive) {
            w = isDesktop ? 26 : 22;
            h = isDesktop ? 8 : 7;
            bg = '#FF0022';
            op = 1;
          } else if (dist === 1) {
            w = isDesktop ? 8 : 7;
            h = isDesktop ? 8 : 7;
            bg = hasSome ? '#FFFFFF' : '#6C707A';
            op = hasSome ? 0.95 : 0.75;
          } else if (dist === 2) {
            w = isDesktop ? 7 : 6;
            h = isDesktop ? 7 : 6;
            bg = hasSome ? '#FFFFFF' : '#5A5A68';
            op = hasSome ? 0.8 : 0.55;
          } else if (dist === 3) {
            w = isDesktop ? 5.5 : 5;
            h = isDesktop ? 5.5 : 5;
            bg = hasSome ? '#FFFFFF' : '#4E4E5A';
            op = hasSome ? 0.55 : 0.35;
          } else if (dist === 4) {
            w = isDesktop ? 4 : 3.5;
            h = isDesktop ? 4 : 3.5;
            bg = hasSome ? '#FFFFFF' : '#42424E';
            op = hasSome ? 0.35 : 0.18;
          } else {
            w = 3;
            h = 3;
            bg = hasSome ? '#FFFFFF' : '#383844';
            op = 0.08;
          }

          return (
            <div
              key={c.id}
              onClick={() => goToCategoryIndex(idx)}
              title={c.name}
              style={{
                width: slotWidth,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: w,
                  height: h,
                  borderRadius: h,
                  background: bg,
                  opacity: op,
                  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  const headerContent = (
    <>
      <h1 style={{
        margin: 0,
        fontSize: titleSize,
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1.15,
        textAlign: 'center',
        letterSpacing: '-0.3px'
      }}>
        {currentCategory.name}
      </h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, margin: isNoOpts ? '14px 0 0' : '10px 0 0' }}>
        {currentCategory.radio ? <RadioIcon color="#A8AAAC" /> : <CheckboxIcon color="#A8AAAC" />}
        <span style={{ fontSize: subtitleSize, color: '#A8AAAC' }}>{hintText}</span>
      </div>
    </>
  );


  const optionsContent = (
    <div style={{
      animationName: 'fadeSwitch',
      animationDuration: '.3s',
      animationTimingFunction: 'ease-out',
      animationFillMode: 'both'
    }}>
      {currentCategory.noOpts ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: isDesktop ? '10px 0' : '6px 0' }}>
          <button
            onClick={() => onToggleNoOpts(currentCategory.id, currentCategory.name)}
            className={isDesktop ? 'dt-focusable' : undefined}
            aria-pressed={hasNoOptsSelected}
            style={{
              minWidth: isDesktop ? 340 : '100%',
              maxWidth: 420,
              padding: isDesktop ? '26px 30px' : '20px 22px',
              borderRadius: 20,
              cursor: 'pointer',
              background: hasNoOptsSelected
                ? `linear-gradient(135deg, ${currentCategory.color}dd, ${currentCategory.color})`
                : `color-mix(in srgb, ${currentCategory.color} 12%, #1E1E26)`,
              border: `2px solid ${hasNoOptsSelected ? '#4CAF50' : currentCategory.color + '88'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              textAlign: 'left',
              boxShadow: hasNoOptsSelected
                ? `0 0 0 6px ${currentCategory.color}40, 0 14px 36px rgba(0,0,0,0.55)`
                : '0 8px 26px rgba(0,0,0,0.4)',
              transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              flexShrink: 0,
              background: hasNoOptsSelected ? '#4CAF50' : 'rgba(255,255,255,0.06)',
              border: hasNoOptsSelected ? 'none' : '1.5px dashed rgba(255,255,255,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}>
              <CheckIcon size={15} color={hasNoOptsSelected ? '#fff' : 'rgba(255,255,255,0.55)'} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontSize: isDesktop ? 18 : 16, fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>
                {hasNoOptsSelected ? 'Özellik Eklendi' : 'Bu özelliği ekle'}
              </span>
              <span style={{ fontSize: 13, color: hasNoOptsSelected ? 'rgba(255,255,255,0.85)' : '#A8AAAC', lineHeight: 1.3 }}>
                {hasNoOptsSelected ? 'Tercih araç eşleştirmenize dahil edildi' : 'Tercihlerinize dahil etmek için dokunun'}
              </span>
            </div>
          </button>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          columnGap: colGap,
          rowGap,
          justifyContent: 'center',
          maxWidth: isDesktop ? 960 : 360,
          margin: '0 auto'
        }}>
          {currentCategory.options.map((opt, idx) => renderBubble(opt, idx))}
        </div>
      )}

      {/* Tow capacity sub-options */}
      {currentCategory.hasTow && selectedInCat.includes('Karavan çekebilen') && (
        <div style={{ marginTop: 28 }}>
          <p style={{ margin: '0 0 16px', fontSize: 14, color: '#A8AAAC', textAlign: 'center' }}>
            Karavan kapasitesi seçin:
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            {['750 kg altı', '750 kg üstü'].map(val => {
              const isSelected = towSub === val;
              return (
                <button
                  key={val}
                  onClick={() => onTowSub(val)}
                  className={isDesktop ? 'dt-focusable' : undefined}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    position: 'relative',
                    cursor: 'pointer',
                    background: isSelected ? '#4CAF50' : '#1E1E26',
                    border: isSelected ? '2px solid transparent' : '1.5px solid #6E7278',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isSelected ? '0 0 0 6px rgba(76,175,80,0.25)' : 'inset 0 2px 6px rgba(0,0,0,0.25)',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: '#fff', textAlign: 'center', lineHeight: 1.3 }}>
                    {val}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const ctaButton = (
    <button
      onClick={canContinue ? handleCTA : undefined}
      disabled={!canContinue}
      className={canContinue ? (isDesktop ? 'dt-solid-light dt-focusable' : 'dt-focusable') : undefined}
      style={{
        width: isDesktop ? 280 : '100%',
        height: isDesktop ? 54 : 48,
        borderRadius: 12,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: canContinue ? '#fff' : '#2C2C38',
        color: canContinue ? '#282830' : '#6C7073',
        cursor: canContinue ? 'pointer' : 'not-allowed',
        fontSize: 16,
        fontWeight: 700,
        transition: 'background .25s, color .25s, transform .25s',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {buttonLabel}
    </button>
  );

  const skipButton = showSkip && (
    <span
      onClick={handleNext}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), handleNext())}
      className={isDesktop ? 'dt-link dt-focusable' : undefined}
      style={{
        fontSize: 13,
        color: '#6C7073',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      Bu kategoriyi geç
    </span>
  );

  if (isDesktop) {
    return (
      <div style={{ minHeight: '100vh', background: '#15151B', display: 'flex', flexDirection: 'column' }}>
        <DesktopHeader onBack={handleBack} />
        <div style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: isSingleRow ? '20px 24px' : '16px 24px',
          minHeight: 'calc(100vh - 56px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Header area - well-proportioned spacing to bubbles / feature card */}
          <div style={{
            width: '100%',
            marginBottom: isNoOpts ? 46 : (isSingleRow ? 26 : 34),
            flexShrink: 0,
            textAlign: 'center'
          }}>
            {dotsIndicator}
            {headerContent}
          </div>

          {/* Bubbles / Feature Area */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {optionsContent}
          </div>

          {/* Bottom Actions - well-proportioned spacing to bubbles / feature card */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: isNoOpts ? 12 : 10,
            marginTop: isNoOpts ? 52 : (isSingleRow ? 32 : 42),
            flexShrink: 0
          }}>
            {ctaButton}
            {skipButton}
          </div>
        </div>
      </div>
    );
  }

  // Mobile layout
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#15151B' }}>
      <MobileStatusBar textColor="#fff" />
      <div style={{
        position: 'absolute',
        top: 44,
        left: 0,
        right: 0,
        height: 52,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        zIndex: 50,
        borderBottom: '1px solid #E4E4E4'
      }}>
        <button
          onClick={handleBack}
          aria-label="Geri"
          style={{
            width: 40,
            height: 40,
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <BackIcon color="#282830" size={18} />
        </button>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <ToyotaLogo height={24} />
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: 96,
        bottom: 84,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '12px 14px'
      }}>
        <div style={{
          width: '100%',
          margin: 'auto 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ width: '100%', flexShrink: 0, marginBottom: isNoOpts ? 28 : (isSingleRow ? 16 : 22), textAlign: 'center' }}>
            {dotsIndicator}
            {headerContent}
          </div>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            {optionsContent}
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: 80,
        background: '#1A1A21',
        borderTop: '1px solid #2E2E38',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.28)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '12px 20px 14px',
        zIndex: 40
      }}>
        {ctaButton}
        {skipButton}
      </div>
    </div>
  );

}

import React from 'react';

export function TickerLane({ lane, fontSize = 15, gap = 44 }) {
  const words = [...lane.words, ...lane.words, ...lane.words, ...lane.words];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: lane.top, overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          transform: `scale(${lane.scale})`,
          transformOrigin: 'left center',
          filter: lane.blur ? `blur(${lane.blur}px)` : undefined,
          opacity: lane.opacity,
          animationName: 'laneMove',
          animationDuration: `${lane.dur}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: lane.dir === 1 ? 'reverse' : 'normal'
        }}
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            style={{
              paddingRight: gap,
              fontSize,
              fontWeight: 400,
              color: '#C8C8CC',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

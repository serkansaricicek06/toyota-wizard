import React from 'react';
import { ToyotaLogo, AmbientGlow, ConcentricEllipses, MobileStatusBar } from './Icons';
import { TickerLane } from './TickerLane';
import { DesktopHeader } from './Header';
import { TICKER_LANES_DESKTOP, TICKER_LANES_MOBILE } from '../data/filterData';

export function DesktopIntroStep({ onNext, isClosed = false, closedMessage = '' }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <DesktopHeader />
      <div style={{
        position: 'relative',
        minHeight: 'calc(100vh - 56px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AmbientGlow glowRadius={900} arcTop="66%" />
        <ConcentricEllipses opacity={0.04} size={720} right={-220} top={-120} />
        
        {/* Ticker animated lanes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} aria-hidden="true">
          {TICKER_LANES_DESKTOP.map((lane, idx) => (
            <TickerLane key={idx} lane={lane} fontSize={18} gap={64} />
          ))}
        </div>

        {/* Hero content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: 620,
          textAlign: 'center',
          padding: '0 40px'
        }}>
          <div style={{
            position: 'absolute',
            left: -40,
            right: -40,
            top: -80,
            bottom: -80,
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 72%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative' }}>
            <h1 style={{
              margin: 0,
              fontSize: 34,
              fontWeight: 800,
              color: '#282830',
              lineHeight: 1.1,
              letterSpacing: '-0.5px'
            }}>
              Size uygun Toyota hangisi?
            </h1>
            <div style={{
              width: 56,
              height: 4,
              background: '#FF0022',
              borderRadius: 2,
              margin: '18px auto 20px'
            }} />
            <p style={{
              margin: '0 auto',
              fontSize: 15,
              color: '#6C7073',
              lineHeight: 1.55,
              maxWidth: 460
            }}>
              Birkaç kısa soruyla ihtiyaçlarınıza en uygun modeli birlikte bulalım.
            </p>

            {isClosed && (
              <div style={{
                marginTop: 20,
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: 8,
                padding: '12px 16px',
                color: '#991B1B',
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.5
              }}>
                {closedMessage || 'Filtreleme sihirbazı şu anda güncelleme/bakım nedeniyle geçici olarak kapalıdır.'}
              </div>
            )}

            <button
              onClick={isClosed ? undefined : onNext}
              disabled={isClosed}
              className="dt-solid-btn dt-focusable"
              style={{
                margin: '36px auto 0',
                display: 'block',
                width: 280,
                height: 48,
                background: isClosed ? '#6B7280' : '#282830',
                border: 'none',
                borderRadius: 10,
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: isClosed ? 'not-allowed' : 'pointer',
                opacity: isClosed ? 0.75 : 1,
                boxShadow: isClosed ? 'none' : '0 8px 24px rgba(0,0,0,0.12)',
                transition: 'all 0.2s ease'
              }}
            >
              {isClosed ? 'Hizmete Kapalı (Bakımda)' : 'Aracınızı Bulalım'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileIntroStep({ onNext, isClosed = false, closedMessage = '' }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      background: '#fff'
    }}>
      <AmbientGlow glowRadius={520} arcTop="50%" />
      <ConcentricEllipses opacity={0.03} size={340} right={-120} top={40} />
      
      {/* Ticker animated lanes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }} aria-hidden="true">
        {TICKER_LANES_MOBILE.map((lane, idx) => (
          <TickerLane key={idx} lane={lane} fontSize={15} gap={44} />
        ))}
      </div>

      <MobileStatusBar textColor="#111" />

      {/* Top logo container - exact Figma size (height: 32) and placement */}
      <div style={{
        position: 'absolute',
        top: 56,
        left: 0,
        right: 0,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      }}>
        <ToyotaLogo height={32} />
      </div>

      {/* Hero content - vertically & horizontally centered */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        transform: 'translateY(-50%)',
        zIndex: 10,
        padding: '0 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          position: 'absolute',
          left: -40,
          right: -40,
          top: -80,
          bottom: -80,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0) 72%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: 30,
            fontWeight: 800,
            color: '#282830',
            lineHeight: 1.15,
            textAlign: 'center'
          }}>
            Size uygun Toyota hangisi?
          </h1>

          <div style={{
            width: 56,
            height: 4,
            background: '#FF0022',
            borderRadius: 2,
            margin: '14px auto'
          }} />

          <p style={{
            margin: 0,
            fontSize: 16,
            color: '#6C7073',
            lineHeight: 1.5,
            textAlign: 'center'
          }}>
            Birkaç kısa soruyla ihtiyaçlarınıza en uygun modeli birlikte bulalım.
          </p>

          {isClosed && (
            <div style={{
              marginTop: 16,
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: 8,
              padding: '10px 14px',
              color: '#991B1B',
              fontSize: 12,
              fontWeight: 600,
              lineHeight: 1.4
            }}>
              {closedMessage || 'Filtreleme sihirbazı şu anda geçici olarak kapalıdır.'}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={isClosed ? undefined : onNext}
        disabled={isClosed}
        style={{
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 48,
          height: 60,
          background: isClosed ? '#6B7280' : '#282830',
          border: 'none',
          borderRadius: 10,
          color: '#fff',
          fontSize: 17,
          fontWeight: 700,
          cursor: isClosed ? 'not-allowed' : 'pointer',
          opacity: isClosed ? 0.75 : 1,
          zIndex: 20,
          boxShadow: isClosed ? 'none' : '0 8px 24px rgba(0,0,0,0.12)',
          transition: 'all 0.2s ease'
        }}
      >
        {isClosed ? 'Hizmete Kapalı (Bakımda)' : 'Aracınızı Bulalım'}
      </button>
    </div>
  );
}

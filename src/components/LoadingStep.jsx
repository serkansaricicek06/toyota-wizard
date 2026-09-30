import React, { useState, useEffect, useRef } from 'react';
import { MobileStatusBar, ToyotaLogo } from './Icons';

const COROLLA_IMAGE = 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/61c63195-8c8f-4deb-b255-a2589cff23a9/vehicle/96518/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png';

const MESSAGES = [
  'Kriterleriniz analiz ediliyor...',
  'Toyota modelleri ve hibrit donanımları karşılaştırılıyor...',
  'Size en uygun araçlar hazırlandı!'
];

export function DesktopLoadingStep({ onDone }) {
  const [messageIdx, setMessageIdx] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t1 = setTimeout(() => setMessageIdx(1), 900);
    const t2 = setTimeout(() => setMessageIdx(2), 1800);
    const t3 = setTimeout(() => setIsZoomingOut(true), 2400);
    const t4 = setTimeout(() => onDoneRef.current(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 45%, #181822 0%, #0D0D12 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    }}>
      {/* Animation Styles */}
      <style>{`
        @keyframes roadMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-160px); }
        }
        @keyframes speedLine1 {
          0% { transform: translateX(350px); opacity: 0; }
          40% { opacity: 0.8; }
          100% { transform: translateX(-450px); opacity: 0; }
        }
        @keyframes speedLine2 {
          0% { transform: translateX(450px); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateX(-400px); opacity: 0; }
        }
        @keyframes carSuspension {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-2px) rotate(-0.35deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes shadowPulse {
          0% { transform: scaleX(1); opacity: 0.55; }
          50% { transform: scaleX(0.96); opacity: 0.45; }
          100% { transform: scaleX(1); opacity: 0.55; }
        }
        @keyframes headlightGlow {
          0% { opacity: 0.65; transform: scaleY(1); }
          50% { opacity: 0.85; transform: scaleY(1.04); }
          100% { opacity: 0.65; transform: scaleY(1); }
        }
        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Top Brand Tag */}
      <div style={{
        position: 'absolute',
        top: 36,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        opacity: 0.9
      }}>
        <ToyotaLogo height={24} color="#EB0A1E" />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#A8AAAC', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Akıllı Araç Eşleştirme Motoru
        </span>
      </div>

      {/* Main Fast-Driving Simulation Scene */}
      <div style={{
        position: 'relative',
        width: 640,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isZoomingOut ? 'translateX(180px) scale(0.96)' : 'translateX(0) scale(1)',
        opacity: isZoomingOut ? 0 : 1,
        transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease'
      }}>
        {/* Speed Wind Streaks */}
        <div style={{
          position: 'absolute',
          top: 60,
          left: 100,
          width: 90,
          height: 2,
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)',
          borderRadius: 2,
          animation: 'speedLine1 0.45s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: 95,
          left: 140,
          width: 140,
          height: 1.5,
          background: 'linear-gradient(to right, transparent, rgba(255,0,34,0.6), transparent)',
          borderRadius: 2,
          animation: 'speedLine2 0.55s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: 140,
          left: 60,
          width: 120,
          height: 2,
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent)',
          borderRadius: 2,
          animation: 'speedLine1 0.38s linear infinite 0.2s'
        }} />

        {/* Headlight Beam Projecting Forward from Corolla */}
        <div style={{
          position: 'absolute',
          right: 30,
          top: 105,
          width: 220,
          height: 56,
          background: 'linear-gradient(to right, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
          clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 70%)',
          animation: 'headlightGlow 0.3s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Taillight Red Streak Trail */}
        <div style={{
          position: 'absolute',
          left: 90,
          top: 116,
          width: 130,
          height: 16,
          background: 'linear-gradient(to left, rgba(235,10,30,0.6) 0%, rgba(235,10,30,0.15) 60%, transparent 100%)',
          borderRadius: 8,
          filter: 'blur(3px)',
          zIndex: 1
        }} />

        {/* The Toyota Corolla Model */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          animation: 'carSuspension 0.22s ease-in-out infinite'
        }}>
          <img
            src={COROLLA_IMAGE}
            alt="Toyota Corolla"
            style={{
              width: 330,
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.75))'
            }}
          />
        </div>

        {/* Dynamic Road Shadow directly under wheels */}
        <div style={{
          position: 'absolute',
          bottom: 46,
          width: 280,
          height: 16,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 65%, transparent 80%)',
          borderRadius: '50%',
          animation: 'shadowPulse 0.22s ease-in-out infinite',
          zIndex: 1
        }} />

        {/* High-Speed Highway Road Surface */}
        <div style={{
          position: 'absolute',
          bottom: 30,
          width: '100%',
          height: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.15)'
        }}>
          {/* Moving Dashed Road Stripes */}
          <div style={{
            width: '200%',
            height: 4,
            display: 'flex',
            gap: 40,
            animation: 'roadMove 0.28s linear infinite'
          }}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 50,
                  height: 3,
                  background: 'rgba(255, 255, 255, 0.75)',
                  borderRadius: 2,
                  boxShadow: '0 0 6px rgba(255,255,255,0.4)',
                  flexShrink: 0
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Status Text & Toyota Progress Line */}
      <div style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        zIndex: 5
      }}>
        <p style={{
          fontSize: 16,
          fontWeight: 600,
          color: '#F3F4F6',
          margin: 0,
          letterSpacing: '-0.2px',
          animationName: 'fadeSwitch',
          animationDuration: '.3s',
          animationFillMode: 'both',
          textAlign: 'center'
        }}>
          {MESSAGES[messageIdx]}
        </p>

        {/* Sleek Toyota Red Progress Track */}
        <div style={{
          width: 240,
          height: 3,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #EB0A1E 0%, #FF2B44 100%)',
            boxShadow: '0 0 10px rgba(235,10,30,0.7)',
            animation: 'progressFill 2.7s cubic-bezier(0.1, 0.6, 0.2, 1) forwards'
          }} />
        </div>
      </div>
    </div>
  );
}

export function MobileLoadingStep({ onDone }) {
  const [messageIdx, setMessageIdx] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t1 = setTimeout(() => setMessageIdx(1), 900);
    const t2 = setTimeout(() => setMessageIdx(2), 1800);
    const t3 = setTimeout(() => setIsZoomingOut(true), 2400);
    const t4 = setTimeout(() => onDoneRef.current(), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at 50% 45%, #181822 0%, #0D0D12 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    }}>
      <MobileStatusBar textColor="#fff" />

      {/* Animation Styles */}
      <style>{`
        @keyframes roadMoveMob {
          0% { transform: translateX(0); }
          100% { transform: translateX(-120px); }
        }
        @keyframes carSuspensionMob {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
          100% { transform: translateY(0px); }
        }
        @keyframes progressFillMob {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Top Brand Tag */}
      <div style={{
        position: 'absolute',
        top: 56,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        opacity: 0.9
      }}>
        <ToyotaLogo height={20} color="#EB0A1E" />
        <span style={{ fontSize: 11, fontWeight: 700, color: '#A8AAAC', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Akıllı Araç Eşleştirme
        </span>
      </div>

      {/* Mobile Car Animation Scene */}
      <div style={{
        position: 'relative',
        width: 320,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: isZoomingOut ? 'translateX(140px) scale(0.95)' : 'translateX(0) scale(1)',
        opacity: isZoomingOut ? 0 : 1,
        transition: 'transform 0.4s ease, opacity 0.35s ease'
      }}>
        {/* Headlight Beam */}
        <div style={{
          position: 'absolute',
          right: 15,
          top: 75,
          width: 140,
          height: 42,
          background: 'linear-gradient(to right, rgba(255,255,255,0.4) 0%, transparent 100%)',
          clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 70%)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        {/* Taillight Beam */}
        <div style={{
          position: 'absolute',
          left: 45,
          top: 86,
          width: 80,
          height: 12,
          background: 'linear-gradient(to left, rgba(235,10,30,0.5) 0%, transparent 100%)',
          filter: 'blur(3px)',
          zIndex: 1
        }} />

        {/* Corolla Car */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          animation: 'carSuspensionMob 0.22s ease-in-out infinite'
        }}>
          <img
            src={COROLLA_IMAGE}
            alt="Toyota Corolla"
            style={{
              width: 240,
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.7))'
            }}
          />
        </div>

        {/* Shadow */}
        <div style={{
          position: 'absolute',
          bottom: 34,
          width: 210,
          height: 12,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, transparent 75%)',
          borderRadius: '50%',
          zIndex: 1
        }} />

        {/* Road Surface */}
        <div style={{
          position: 'absolute',
          bottom: 22,
          width: '100%',
          height: 20,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.15)'
        }}>
          <div style={{
            width: '200%',
            height: 3,
            display: 'flex',
            gap: 28,
            animation: 'roadMoveMob 0.28s linear infinite'
          }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 3,
                  background: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: 2,
                  boxShadow: '0 0 5px rgba(255,255,255,0.4)',
                  flexShrink: 0
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Status Text & Progress Bar */}
      <div style={{
        marginTop: 14,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        padding: '0 20px',
        zIndex: 5
      }}>
        <p style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#F3F4F6',
          margin: 0,
          textAlign: 'center',
          lineHeight: 1.3
        }}>
          {MESSAGES[messageIdx]}
        </p>

        <div style={{
          width: 190,
          height: 3,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 3,
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #EB0A1E 0%, #FF2B44 100%)',
            boxShadow: '0 0 8px rgba(235,10,30,0.6)',
            animation: 'progressFillMob 2.7s cubic-bezier(0.1, 0.6, 0.2, 1) forwards'
          }} />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CheckIcon, CloseIcon, BackIcon, ToyotaLogo, MobileStatusBar } from './Icons';
import { DesktopHeader } from './Header';

export function DesktopSummaryStep({ selections, cats, onEdit, onBack, onResult, onRemove }) {
  const [removedCount, setRemovedCount] = useState(0);

  const activeCats = cats.filter(c => (selections[c.id] ?? []).length > 0);

  const handleRemove = (catId, opt) => {
    onRemove(catId, opt);
    setRemovedCount(c => c + 1);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <DesktopHeader onBack={onBack} />
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '52px 40px 64px', width: '100%', flex: 1 }}>
        <h1 style={{
          margin: 0,
          fontSize: 34,
          fontWeight: 800,
          color: '#282830',
          lineHeight: 1.1,
          letterSpacing: '-0.5px'
        }}>
          Seçimleriniz hazır.
        </h1>
        <div style={{ width: 56, height: 4, background: '#FF0022', borderRadius: 2, margin: '18px 0 20px' }} />
        <p style={{ margin: 0, fontSize: 15, color: '#282830', lineHeight: 1.55, maxWidth: 620 }}>
          Eşleşmenizi tercihleriniz belirleyecek. Değiştirmek istediğiniz varsa şimdi tam zamanı.
        </p>

        {removedCount > 0 && (
          <div style={{
            marginTop: 28,
            background: '#F5F5F5',
            borderRadius: 10,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: 15, color: '#282830' }}>
              {removedCount} hakkınız yeniden açıldı.
            </span>
            <span
              onClick={onBack}
              className="dt-link"
              style={{ fontSize: 15, color: '#282830', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Kategorilere dön
            </span>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20, marginTop: 32 }}>
          {activeCats.map(cat => (
            <div
              key={cat.id}
              style={{
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 16,
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: cat.color }} />
                  <span style={{ fontSize: 17, fontWeight: 700, color: '#282830' }}>
                    {cat.name}
                  </span>
                </div>
                <button
                  onClick={() => onEdit(cat.id)}
                  className="dt-edit dt-focusable"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                >
                  <span style={{ fontSize: 14, color: '#282830', textDecoration: 'underline', fontWeight: 600 }}>
                    Düzenle
                  </span>
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {(selections[cat.id] ?? []).map(opt => (
                  <div
                    key={opt}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      minHeight: 38,
                      height: 'auto',
                      maxWidth: '100%',
                      background: '#F5F5F5',
                      border: '1px solid #E4E4E4',
                      borderRadius: 20,
                      padding: '6px 14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#4CAF50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckIcon size={8} color="#fff" />
                    </div>
                    <span style={{
                      fontSize: 14,
                      color: '#282830',
                      lineHeight: 1.35,
                      wordBreak: 'break-word',
                      flex: '1 1 auto',
                      minWidth: 0
                    }}>
                      {opt}
                    </span>
                    <button
                      onClick={() => handleRemove(cat.id, opt)}
                      aria-label="Kaldır"
                      className="dt-focusable"
                      style={{
                        width: 22,
                        height: 22,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginRight: -4,
                        padding: 0
                      }}
                    >
                      <CloseIcon color="#6C7073" size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      <div style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 20,
        height: 96,
        background: '#fff',
        borderTop: '1px solid #E4E4E4',
        boxShadow: '0 -8px 24px rgba(40,40,48,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16
      }}>
        <button
          onClick={onResult}
          className="dt-solid-btn dt-focusable"
          style={{
            width: 220,
            height: 48,
            background: '#282830',
            border: 'none',
            borderRadius: 10,
            color: '#fff',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Sonucu gör
        </button>
        <button
          onClick={onBack}
          className="dt-outline-btn dt-focusable"
          style={{
            width: 220,
            height: 48,
            background: '#fff',
            border: '1.5px solid #282830',
            borderRadius: 10,
            color: '#282830',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Kategorilere dön
        </button>
      </div>
    </div>
  );
}

export function MobileSummaryStep({ selections, cats, onEdit, onBack, onResult, onFinishNow, onRemove }) {
  const [removedCount, setRemovedCount] = useState(0);

  const activeCats = cats.filter(c => (selections[c.id] ?? []).length > 0);

  const handleRemove = (catId, opt) => {
    onRemove(catId, opt);
    setRemovedCount(c => c + 1);
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <MobileStatusBar />
      <div style={{
        position: 'absolute',
        top: 44,
        left: 0,
        right: 0,
        height: 56,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 50,
        borderBottom: '1px solid #E4E4E4'
      }}>
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
          <BackIcon color="#282830" size={20} />
        </button>
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          <ToyotaLogo height={26} />
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: 100,
        bottom: 88,
        left: 0,
        right: 0,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        padding: '24px 20px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: 28,
          fontWeight: 800,
          color: '#282830',
          lineHeight: 1.15
        }}>
          Seçimleriniz hazır.
        </h1>
        <div style={{ width: 56, height: 4, background: '#FF0022', borderRadius: 2, margin: '14px 0 16px' }} />
        <p style={{ margin: 0, fontSize: 15, color: '#6C7073', lineHeight: 1.5 }}>
          Eşleşmenizi tercihleriniz belirleyecek. Değiştirmek istediğiniz varsa şimdi tam zamanı.
        </p>

        {removedCount > 0 && (
          <div style={{
            marginTop: 20,
            background: '#F5F5F5',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: 14, color: '#282830' }}>
              {removedCount} hakkınız yeniden açıldı.
            </span>
            <span
              onClick={onBack}
              style={{ fontSize: 14, color: '#282830', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Kategorilere dön
            </span>
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {activeCats.map(cat => (
            <div
              key={cat.id}
              style={{
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 14,
                padding: 18
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#282830' }}>
                    {cat.name}
                  </span>
                </div>
                <button
                  onClick={() => onEdit(cat.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                >
                  <span style={{ fontSize: 14, color: '#282830', textDecoration: 'underline' }}>
                    Düzenle
                  </span>
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(selections[cat.id] ?? []).map(opt => (
                  <div
                    key={opt}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      minHeight: 34,
                      height: 'auto',
                      maxWidth: '100%',
                      background: '#F5F5F5',
                      border: '1px solid #E4E4E4',
                      borderRadius: 18,
                      padding: '5px 12px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: '#4CAF50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckIcon size={7} color="#fff" />
                    </div>
                    <span style={{
                      fontSize: 13,
                      color: '#282830',
                      lineHeight: 1.35,
                      wordBreak: 'break-word',
                      flex: '1 1 auto',
                      minWidth: 0
                    }}>
                      {opt}
                    </span>
                    <button
                      onClick={() => handleRemove(cat.id, opt)}
                      style={{
                        width: 20,
                        height: 20,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginRight: -4,
                        padding: 0
                      }}
                    >
                      <CloseIcon color="#6C7073" size={11} />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 84,
        background: '#fff',
        borderTop: '1px solid #E4E4E4',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <button
          onClick={onResult}
          style={{
            flex: 1,
            height: 52,
            background: '#282830',
            border: 'none',
            borderRadius: 10,
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          Sonuçları Gör
        </button>
      </div>
    </div>
  );
}

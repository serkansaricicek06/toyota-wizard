import React, { useState, useEffect } from 'react';
import { CheckIcon, CloseIcon, ChevronDownIcon, InfoIcon, ToyotaLogo, MobileStatusBar } from './Icons';
import { DesktopHeader } from './Header';
import { getMatchedVehicles } from '../data/toyotaModels';
import { submitLead, trackWizardStep } from '../services/api';

// Expandable criteria breakdown component
function CriteriaBreakdown({ met, partial, top, expanded, onToggle, compact = false }) {
  return (
    <div>
      <div
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onToggle())}
        className="dt-focusable"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          marginBottom: 14
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#6C7073', letterSpacing: '1.5px' }}>
          EŞLEŞMEYİ BELİRLEYEN SEÇİMLERİNİZ
        </p>
        <div style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
          <ChevronDownIcon color="#6C7073" size={16} />
        </div>
      </div>

      {expanded ? (
        <div style={{
          animationName: 'sheetFade',
          animationDuration: '.25s',
          animationFillMode: 'both',
          display: compact ? 'block' : 'grid',
          gridTemplateColumns: compact ? undefined : '1fr 1fr',
          gap: 20
        }}>
          <div>
            <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#6C7073' }}>
              Karşılanan tercihleriniz
            </p>
            {met.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 34 }}>
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
                <span style={{ fontSize: 14, color: '#282830' }}>{item}</span>
              </div>
            ))}
          </div>

          {partial.length > 0 && (
            <div style={{ marginTop: compact ? 16 : 0 }}>
              <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#A8AAAC' }}>
                Bu modelde karşılanmayan tercihleriniz
              </p>
              {partial.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 34 }}>
                  <InfoIcon size={18} color="#C4C6C8" />
                  <span style={{ fontSize: 14, color: '#8A8D90' }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {top.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: '#F5F5F5',
                borderRadius: 999,
                padding: '6px 14px'
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
              <span style={{ fontSize: 13, color: '#282830', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Call request modal
function CallModal({ isOpen, onClose, carName }) {
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setLoading(true);
      try {
        const currentSessId = typeof window !== 'undefined' ? sessionStorage.getItem('toyota_wizard_sess') : null;
        await submitLead({
          fullName: 'Toyota Web Ziyaretçisi',
          phone,
          city: 'Türkiye Geneli',
          matchedModel: carName,
          sessionId: currentSessId
        });
      } catch (err) {
        console.warn('[Lead] Local fallback on lead submit:', err);
      } finally {
        setLoading(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setPhone('');
          onClose();
        }, 2200);
      }
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15,15,20,0.55)',
          animationName: 'sheetFade',
          animationDuration: '.25s',
          animationFillMode: 'both'
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          width: 480,
          maxWidth: 'calc(100vw - 40px)',
          background: '#fff',
          borderRadius: 20,
          padding: 36,
          animationName: 'modalPop',
          animationDuration: '.25s',
          animationFillMode: 'both',
          boxShadow: '0 24px 60px rgba(0,0,0,0.25)'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Kapat"
          className="dt-focusable"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CloseIcon color="#6C7073" size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckIcon size={24} color="#fff" />
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700, color: '#282830' }}>
              Talebiniz Alındı!
            </h2>
            <p style={{ margin: 0, fontSize: 15, color: '#6C7073' }}>
              {carName} hakkında uzman Toyota danışmanımız en kısa sürede sizi arayacaktır.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 700, color: '#282830' }}>
              Size dönüş yapalım.
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: 15, color: '#6C7073', lineHeight: 1.5 }}>
              <strong>{carName}</strong> hakkında detaylı bilgi, fiyat ve kampanya detayları için Toyota danışmanımız sizi arasın.
            </p>
            <input
              autoFocus
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="05XX XXX XX XX"
              required
              className="dt-focusable"
              style={{
                width: '100%',
                height: 56,
                background: '#F5F5F5',
                border: '1px solid #E4E4E4',
                borderRadius: 12,
                padding: '0 18px',
                fontSize: 16,
                color: '#282830',
                outline: 'none',
                marginBottom: 16,
                boxSizing: 'border-box'
              }}
            />
            <button
              type="submit"
              className="dt-solid-btn dt-focusable"
              style={{
                width: '100%',
                height: 56,
                background: '#282830',
                border: 'none',
                borderRadius: 10,
                color: '#fff',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Beni arayın
            </button>
            <p style={{ margin: '14px 0 0', fontSize: 13, color: '#A8AAAC', textAlign: 'center' }}>
              Bilgileriniz yalnızca bu görüşme için kullanılır.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function normalizeVehicle(v) {
  if (!v) return null;
  return {
    ...v,
    fullName: v.name || v.fullName,
    name: v.name || v.fullName,
    imageUrl: v.cardb_image || v.imageUrl,
    fallbackImageUrl: v.imageUrl || v.cardb_image,
    url: v.toyota_url || v.url || 'https://www.toyota.com.tr',
    startingPrice: typeof v.starting_price === 'number'
      ? (v.starting_price.toLocaleString('tr-TR') + ' ₺')
      : (v.startingPrice || 'Toyota Yetkili Satıcılarında'),
    powertrain: v.powertrain || (v.specs?.powertrain) || '',
    reasons: v.reasons || [],
    breakdown: v.breakdown || []
  };
}

export function DesktopResultStep({ category, businessType, selections, s3Answers, matchResults, onReset }) {
  const [expand1, setExpand1] = useState(false);
  const [expand2, setExpand2] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  let best, second, isSingle, bestScore, secondScore, disclaimer;

  if (matchResults && matchResults.length > 0) {
    best = normalizeVehicle(matchResults[0]);
    second = matchResults.length > 1 ? normalizeVehicle(matchResults[1]) : null;
    isSingle = !second || matchResults.length === 1;
    bestScore = matchResults[0].matchPercent || matchResults[0].score || 95;
    secondScore = matchResults[1]?.matchPercent || matchResults[1]?.score || 85;
    disclaimer = (category === 'Ticari Araç' && best?.id === 'proace-max')
      ? 'Bu modelde üst yapı gerekliliği ve versiyon detayı için yetkili Toyota bayinize danışın.'
      : null;
  } else {
    const matched = getMatchedVehicles(category, businessType, selections, s3Answers);
    best = normalizeVehicle(matched.best);
    second = normalizeVehicle(matched.second);
    isSingle = matched.isSingle;
    bestScore = matched.bestScore;
    secondScore = matched.secondScore;
    disclaimer = matched.disclaimer;
  }

  // Flatten selected options
  const allSelected = [];
  Object.values(selections).forEach(opts => {
    if (Array.isArray(opts)) opts.forEach(o => allSelected.push(o));
  });

  const top3 = allSelected.slice(0, 3);
  const dynamicReasons1 = best?.reasons && best.reasons.length > 0 ? best.reasons : [];
  const met1 = dynamicReasons1.length > 0 ? dynamicReasons1 : allSelected.slice(0, Math.max(1, Math.ceil(allSelected.length * 0.75)));
  const part1 = dynamicReasons1.length > 0 ? [] : allSelected.slice(met1.length);

  const dynamicReasons2 = second?.reasons && second.reasons.length > 0 ? second.reasons : [];
  const met2 = dynamicReasons2.length > 0 ? dynamicReasons2 : allSelected.slice(0, Math.max(1, Math.ceil(allSelected.length * 0.6)));
  const part2 = dynamicReasons2.length > 0 ? [] : allSelected.slice(met2.length);

  const handleCallRequest = (carName) => {
    const curSid = typeof window !== 'undefined' ? sessionStorage.getItem('toyota_wizard_sess') : null;
    // Lead tracking in backend so it appears under 'Müşteri Talepleri' in Admin
    submitLead({
      sessionId: curSid,
      fullName: 'İletişim Formuna Yönlendirildi',
      phone: 'Online Yönlendirme (Toyota İletişim)',
      matchedModel: carName || best?.fullName || 'Toyota Modeli',
      preferredModel: carName || best?.fullName || 'Toyota Modeli',
      selectionsSummary: allSelected.join(', '),
      notes: 'Kullanıcı "Sizi Arayalım" butonuna tıklayarak doğrudan https://iletisim.toyota.com.tr/yeni-toyota/arac-secim sayfasına yönlendirildi.'
    }).catch(err => console.warn('Lead tracking error:', err));

    trackWizardStep({
      sessionId: curSid,
      stepId: 'lead',
      stepName: '6. Aşama (İletişim / Teklif Formu)',
      stepIndex: 6,
      timeOnStepSeconds: 1,
      totalElapsedSeconds: 60,
      reachedResult: true,
      matchedVehicle: carName || best?.fullName || '',
      isExit: false
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Toyota Araç Eşleşmem',
        text: `Bana en uygun Toyota modeli: ${best.fullName}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <DesktopHeader />

      {/* Main result section */}
      <section style={{ background: '#fff' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '52px 40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isSingle || !second ? '1fr' : '1fr 1fr',
            gap: 24,
            alignItems: 'stretch',
            maxWidth: isSingle || !second ? 580 : undefined,
            margin: isSingle || !second ? '0 auto' : undefined
          }}>
            {/* Card 1: Best match */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#F5F5F5',
              border: '2px solid #282830',
              borderRadius: 16,
              padding: 28,
              position: 'relative'
            }}>
              <div style={{ height: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#FF0022',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>1</span>
                </div>
                <span style={{ fontSize: 13, color: '#6C7073', letterSpacing: '2px', fontWeight: 600 }}>
                  {isSingle ? 'SİZE UYGUN MODEL' : 'EN İYİ EŞLEŞMENİZ'}
                </span>
              </div>

              <div style={{ height: 44, display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: '#282830', lineHeight: 1.1 }}>
                  {best.fullName}
                </span>
                {best.powertrain && (
                  <div style={{
                    border: '1px solid #0072F0',
                    borderRadius: 6,
                    padding: '3px 9px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#0072F0' }}>
                      {best.powertrain}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ height: 60, display: 'flex', alignItems: 'flex-end' }}>
                {!isSingle && (
                  <span style={{ fontSize: 44, fontWeight: 800, color: '#FF0022', lineHeight: 1 }}>
                    %{bestScore}
                  </span>
                )}
              </div>

              <div style={{ height: 32, display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: 0, fontSize: 15, color: '#6C7073' }}>
                  {isSingle ? 'İş ihtiyaçlarınıza özel tasarlanmış model.' : 'Seçimlerinize en yakın Toyota modeli.'}
                </p>
              </div>

              {/* Vehicle Cardb Studio Render */}
              <div style={{
                height: 240,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '16px 0'
              }}>
                <img
                  src={best.imageUrl}
                  alt={best.name}
                  onError={(e) => {
                    if (best.fallbackImageUrl && e.target.src !== best.fallbackImageUrl) {
                      e.target.src = best.fallbackImageUrl;
                    }
                  }}
                  style={{ width: '100%', display: 'block', objectFit: 'contain', maxHeight: 220, margin: '0 auto' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '66%',
                  height: 20,
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.16) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }} />
              </div>

              {/* Action Buttons */}
              <div style={{ height: 48, display: 'flex', gap: 12 }}>
                <a
                  href={best.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dt-solid-btn dt-focusable"
                  style={{
                    flex: 1,
                    height: 48,
                    background: '#282830',
                    borderRadius: 10,
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  Aracı inceleyin
                </a>
                <a
                  href="https://iletisim.toyota.com.tr/yeni-toyota/arac-secim"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCallRequest(best.fullName)}
                  className="dt-outline-btn dt-focusable"
                  style={{
                    flex: 1,
                    height: 48,
                    background: 'transparent',
                    border: '1.5px solid #282830',
                    borderRadius: 10,
                    color: '#282830',
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  Sizi Arayalım
                </a>
              </div>

              {/* Criteria details */}
              {allSelected.length > 0 && (
                <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #E4E4E4' }}>
                  <CriteriaBreakdown
                    met={met1}
                    partial={part1}
                    top={top3}
                    expanded={expand1}
                    onToggle={() => setExpand1(e => !e)}
                    compact
                  />
                </div>
              )}

              {disclaimer && (
                <p style={{ margin: '16px 0 0', fontSize: 13, color: '#A8AAAC', lineHeight: 1.5 }}>
                  {disclaimer}
                </p>
              )}
            </div>

            {/* Card 2: Second best match */}
            {!isSingle && second && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#fff',
                border: '1px solid #E4E4E4',
                borderRadius: 16,
                padding: 28,
                position: 'relative'
              }}>
                <div style={{ height: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    border: '1.5px solid #6C7073',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#6C7073' }}>2</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#6C7073', letterSpacing: '2px', fontWeight: 600 }}>
                    İKİNCİ EN İYİ EŞLEŞMENİZ
                  </span>
                </div>

                <div style={{ height: 44, display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: '#282830', lineHeight: 1.1 }}>
                    {second.fullName}
                  </span>
                  {second.powertrain && (
                    <div style={{
                      border: '1px solid #0072F0',
                      borderRadius: 6,
                      padding: '3px 9px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#0072F0' }}>
                        {second.powertrain}
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ height: 60, display: 'flex', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: 44, fontWeight: 800, color: '#FF0022', lineHeight: 1 }}>
                    %{secondScore}
                  </span>
                </div>

                <div style={{ height: 32, display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontSize: 15, color: '#6C7073' }}>
                    Alternatif güçlü seçeneğiniz.
                  </p>
                </div>

                {/* Second vehicle Cardb Studio Render */}
                <div style={{
                  height: 240,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '16px 0'
                }}>
                  <img
                    src={second.imageUrl}
                    alt={second.name}
                    onError={(e) => {
                      if (second.fallbackImageUrl && e.target.src !== second.fallbackImageUrl) {
                        e.target.src = second.fallbackImageUrl;
                      }
                    }}
                    style={{ width: '100%', display: 'block', objectFit: 'contain', maxHeight: 220, margin: '0 auto' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '66%',
                    height: 20,
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.16) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />
                </div>

                {/* Action Buttons */}
                <div style={{ height: 48, display: 'flex', gap: 12 }}>
                  <a
                    href={second.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dt-outline-btn dt-focusable"
                    style={{
                      flex: 1,
                      height: 48,
                      border: '1.5px solid #282830',
                      borderRadius: 10,
                      background: '#fff',
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#282830',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Aracı inceleyin
                  </a>
                  <a
                    href="https://iletisim.toyota.com.tr/yeni-toyota/arac-secim"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleCallRequest(second.fullName)}
                    className="dt-outline-btn dt-focusable"
                    style={{
                      flex: 1,
                      height: 48,
                      border: '1.5px solid #282830',
                      borderRadius: 10,
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#282830',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box'
                    }}
                  >
                    Sizi Arayalım
                  </a>
                </div>

                {/* Criteria details */}
                {allSelected.length > 0 && (
                  <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #E4E4E4' }}>
                    <CriteriaBreakdown
                      met={met2}
                      partial={part2}
                      top={top3}
                      expanded={expand2}
                      onToggle={() => setExpand2(e => !e)}
                      compact
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Share & restart section */}
      <section style={{ background: '#15151B' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '64px 40px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#fff' }}>
            Eşleşmenizi paylaşın.
          </h2>
          <p style={{ margin: '10px 0 24px', fontSize: 15, color: '#A8AAAC' }}>
            Sevdiklerinize veya iş ortaklarınıza gösterin.
          </p>
          <button
            onClick={handleShare}
            className="dt-solid-light dt-focusable"
            style={{
              width: 280,
              height: 48,
              background: '#fff',
              border: 'none',
              borderRadius: 10,
              color: '#282830',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              margin: '0 auto 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12
            }}
          >
            <span style={{ width: 20, height: 3, background: '#FF0022', borderRadius: 2 }} />
            {copiedToast ? 'Bağlantı Kopyalandı!' : 'Sonucunuzu paylaşın'}
          </button>
          <button
            onClick={onReset}
            className="dt-focusable"
            style={{
              width: 280,
              height: 48,
              background: 'transparent',
              border: '1.5px solid #fff',
              borderRadius: 10,
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              margin: '0 auto',
              display: 'block'
            }}
          >
            Yeni seçim yapın
          </button>
          <p style={{ margin: '12px 0 0', fontSize: 13, color: '#6C7073' }}>
            Farklı bir kullanım için akışı baştan çalıştırır.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#F5F5F5', borderTop: '1px solid #E4E4E4' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '40px' }}>
          <div style={{ display: 'flex', gap: 32, marginBottom: 20, flexWrap: 'wrap' }}>
            {['Site İlkeleri', 'Gizlilik Ayarları', 'Kişisel Verilerin Korunması'].map(link => (
              <span key={link} className="dt-link" style={{ fontSize: 15, fontWeight: 500, color: '#282830', cursor: 'pointer' }}>
                {link}
              </span>
            ))}
          </div>
          <p style={{ margin: '0 0 10px', fontSize: 13, color: '#6C7073', lineHeight: 1.6, maxWidth: 720 }}>
            Bu araç önerisi yalnızca bilgilendirme amaçlıdır. Güncel donanım, fiyat ve stok bilgisi için yetkili Toyota bayinize danışın.
          </p>
          <p style={{ margin: 0, fontSize: 13, color: '#6C7073' }}>
            © 2026 toyota.com.tr
          </p>
        </div>
      </footer>
    </div>
  );
}

export function MobileResultStep({ category, businessType, selections, s3Answers, matchResults, onReset }) {
  const [expand1, setExpand1] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  let best, second, isSingle, bestScore, secondScore, disclaimer;

  if (matchResults && matchResults.length > 0) {
    best = normalizeVehicle(matchResults[0]);
    second = matchResults.length > 1 ? normalizeVehicle(matchResults[1]) : null;
    isSingle = !second || matchResults.length === 1;
    bestScore = matchResults[0].matchPercent || matchResults[0].score || 95;
    secondScore = matchResults[1]?.matchPercent || matchResults[1]?.score || 85;
    disclaimer = (category === 'Ticari Araç' && best?.id === 'proace-max')
      ? 'Bu modelde üst yapı gerekliliği ve versiyon detayı için yetkili Toyota bayinize danışın.'
      : null;
  } else {
    const matched = getMatchedVehicles(category, businessType, selections, s3Answers);
    best = normalizeVehicle(matched.best);
    second = normalizeVehicle(matched.second);
    isSingle = matched.isSingle;
    bestScore = matched.bestScore;
    secondScore = matched.secondScore;
    disclaimer = matched.disclaimer;
  }

  const allSelected = [];
  Object.values(selections).forEach(opts => {
    if (Array.isArray(opts)) opts.forEach(o => allSelected.push(o));
  });

  const top3 = allSelected.slice(0, 3);
  const dynamicReasons1 = best?.reasons && best.reasons.length > 0 ? best.reasons : [];
  const met1 = dynamicReasons1.length > 0 ? dynamicReasons1 : allSelected.slice(0, Math.max(1, Math.ceil(allSelected.length * 0.75)));
  const part1 = dynamicReasons1.length > 0 ? [] : allSelected.slice(met1.length);

  const handleCallRequest = (carName) => {
    const curSid = typeof window !== 'undefined' ? sessionStorage.getItem('toyota_wizard_sess') : null;
    // Lead tracking in backend so it appears under 'Müşteri Talepleri' in Admin
    submitLead({
      sessionId: curSid,
      fullName: 'İletişim Formuna Yönlendirildi',
      phone: 'Online Yönlendirme (Toyota İletişim)',
      matchedModel: carName || best?.fullName || 'Toyota Modeli',
      preferredModel: carName || best?.fullName || 'Toyota Modeli',
      selectionsSummary: allSelected.join(', '),
      notes: 'Kullanıcı "Sizi Arayalım" butonuna tıklayarak doğrudan https://iletisim.toyota.com.tr/yeni-toyota/arac-secim sayfasına yönlendirildi.'
    }).catch(err => console.warn('Lead tracking error:', err));

    trackWizardStep({
      sessionId: curSid,
      stepId: 'lead',
      stepName: '6. Aşama (İletişim / Teklif Formu)',
      stepIndex: 6,
      timeOnStepSeconds: 1,
      totalElapsedSeconds: 60,
      reachedResult: true,
      matchedVehicle: carName || best?.fullName || '',
      isExit: false
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Toyota Araç Eşleşmem',
        text: `Bana en uygun Toyota modeli: ${best.fullName}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
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
        justifyContent: 'center',
        padding: '0 20px',
        zIndex: 50,
        borderBottom: '1px solid #E4E4E4'
      }}>
        <ToyotaLogo height={26} />
      </div>

      <div style={{
        position: 'absolute',
        top: 100,
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}>
        {/* Card 1 */}
        <div style={{ background: '#F5F5F5', padding: '24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: '#FF0022',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>1</span>
            </div>
            <span style={{ fontSize: 13, color: '#6C7073', letterSpacing: '2px', fontWeight: 600 }}>
              {isSingle ? 'SİZE UYGUN MODEL' : 'EN İYİ EŞLEŞMENİZ'}
            </span>
          </div>

          <div style={{ position: 'relative', margin: '0 -4px' }}>
            <img
              src={best.imageUrl}
              alt={best.name}
              onError={(e) => {
                if (best.fallbackImageUrl && e.target.src !== best.fallbackImageUrl) {
                  e.target.src = best.fallbackImageUrl;
                }
              }}
              style={{ width: '100%', display: 'block', objectFit: 'contain', maxHeight: 200 }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '70%',
              height: 16,
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0 4px' }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#282830' }}>
              {best.fullName}
            </span>
            {best.powertrain && (
              <div style={{ border: '1px solid #0072F0', borderRadius: 4, padding: '2px 8px' }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#0072F0' }}>
                  {best.powertrain}
                </span>
              </div>
            )}
          </div>

          {!isSingle && (
            <div style={{ fontSize: 36, fontWeight: 800, color: '#FF0022', lineHeight: 1, margin: '12px 0 16px' }}>
              %{bestScore}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <a
              href={best.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                height: 48,
                background: '#282830',
                borderRadius: 10,
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Aracı inceleyin
            </a>
            <a
              href="https://iletisim.toyota.com.tr/yeni-toyota/arac-secim"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleCallRequest(best.fullName)}
              style={{
                flex: 1,
                height: 48,
                background: 'transparent',
                border: '1.5px solid #282830',
                borderRadius: 10,
                color: '#282830',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box'
              }}
            >
              Sizi Arayalım
            </a>
          </div>

          {allSelected.length > 0 && (
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #E4E4E4' }}>
              <CriteriaBreakdown
                met={met1}
                partial={part1}
                top={top3}
                expanded={expand1}
                onToggle={() => setExpand1(e => !e)}
                compact
              />
            </div>
          )}

          {disclaimer && (
            <p style={{ margin: '16px 0 0', fontSize: 13, color: '#A8AAAC', lineHeight: 1.5 }}>
              {disclaimer}
            </p>
          )}
        </div>

        {/* Card 2 if exists */}
        {!isSingle && second && (
          <div style={{ background: '#fff', padding: '24px 20px', borderTop: '1px solid #E4E4E4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                border: '1.5px solid #6C7073',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#6C7073' }}>2</span>
              </div>
              <span style={{ fontSize: 13, color: '#6C7073', letterSpacing: '2px', fontWeight: 600 }}>
                İKİNCİ EN İYİ EŞLEŞMENİZ
              </span>
            </div>

            <div style={{ position: 'relative', margin: '0 -4px' }}>
              <img
                src={second.imageUrl}
                alt={second.name}
                onError={(e) => {
                  if (second.fallbackImageUrl && e.target.src !== second.fallbackImageUrl) {
                    e.target.src = second.fallbackImageUrl;
                  }
                }}
                style={{ width: '100%', display: 'block', objectFit: 'contain', maxHeight: 200 }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: 16,
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0 4px' }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#282830' }}>
                {second.fullName}
              </span>
              {second.powertrain && (
                <div style={{ border: '1px solid #0072F0', borderRadius: 4, padding: '2px 8px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#0072F0' }}>
                    {second.powertrain}
                  </span>
                </div>
              )}
            </div>

            <div style={{ fontSize: 36, fontWeight: 800, color: '#FF0022', lineHeight: 1, margin: '12px 0 16px' }}>
              %{secondScore}
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a
                href={second.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  height: 48,
                  background: '#fff',
                  border: '1.5px solid #282830',
                  borderRadius: 10,
                  color: '#282830',
                  fontSize: 15,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                Aracı inceleyin
              </a>
              <a
                href="https://iletisim.toyota.com.tr/yeni-toyota/arac-secim"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleCallRequest(second.fullName)}
                style={{
                  flex: 1,
                  height: 48,
                  background: '#fff',
                  border: '1.5px solid #282830',
                  borderRadius: 10,
                  color: '#282830',
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box'
                }}
              >
                Sizi Arayalım
              </a>
            </div>
          </div>
        )}

        {/* Share & Restart Mobile */}
        <div style={{ background: '#15151B', padding: '40px 20px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#fff' }}>
            Eşleşmenizi paylaşın.
          </h2>
          <p style={{ margin: '8px 0 20px', fontSize: 14, color: '#A8AAAC' }}>
            Sevdiklerinize veya iş ortaklarınıza gösterin.
          </p>
          <button
            onClick={handleShare}
            style={{
              width: '100%',
              height: 48,
              background: '#fff',
              border: 'none',
              borderRadius: 10,
              color: '#282830',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10
            }}
          >
            <span style={{ width: 16, height: 3, background: '#FF0022', borderRadius: 2 }} />
            {copiedToast ? 'Bağlantı Kopyalandı!' : 'Sonucunuzu paylaşın'}
          </button>
          <button
            onClick={onReset}
            style={{
              width: '100%',
              height: 48,
              background: 'transparent',
              border: '1.5px solid #fff',
              borderRadius: 10,
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Yeni seçim yapın
          </button>
        </div>
      </div>
    </div>
  );
}

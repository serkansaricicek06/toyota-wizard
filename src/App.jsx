import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  BINEK_CATEGORIES,
  getCommercialCategories,
  COMMERCIAL_BUSINESS_TYPES,
  INTRO_QUESTION,
  PROFILE_STEPS_BY_CATEGORY,
  MAX_TOTAL_SELECTIONS,
  MAX_CATEGORY_SELECTIONS
} from './data/filterData';
import { DesktopIntroStep, MobileIntroStep } from './components/IntroStep';
import { DesktopProfileStep, MobileProfileStep } from './components/ProfileStep';
import { CategoryFilter } from './components/CategoryFilter';
import { DesktopSummaryStep, MobileSummaryStep } from './components/SummaryStep';
import { DesktopLoadingStep, MobileLoadingStep } from './components/LoadingStep';
import { DesktopResultStep, MobileResultStep } from './components/ResultStep';
import { AdminPanel } from './components/AdminPanel';
import { fetchPublicSettings, fetchFlow, calculateRemoteMatch, trackWizardStep, updateDocumentFavicon } from './services/api';

export default function App() {
  const isAdminPath = typeof window !== 'undefined' && (
    window.location.pathname === '/admin' || 
    window.location.pathname.startsWith('/admin/') ||
    window.location.hash === '#admin'
  );

  const [isAdminRoute, setIsAdminRoute] = useState(isAdminPath);
  const [showAdmin, setShowAdmin] = useState(false);
  const [step, setStep] = useState('intro'); // 'intro' | 'profile' | 'categories' | 'summary' | 'loading' | 'result'
  const [profileStepIndex, setProfileStepIndex] = useState(0);
  const [category, setCategory] = useState(''); // 'Binek Araç' | 'Ticari Araç' | 'Her İkisi de'
  const [businessType, setBusinessType] = useState('');
  const [s3Answers, setS3Answers] = useState([]);
  const [selections, setSelections] = useState({});
  const [towSub, setTowSub] = useState(null);
  const [openCatId, setOpenCatId] = useState(null);
  const [returnToSummary, setReturnToSummary] = useState(false);

  // Dynamic Flow & Matching States
  const [flowData, setFlowData] = useState(null);
  const [matchResults, setMatchResults] = useState(null);
  const [siteSettings, setSiteSettings] = useState(null);

  // Real Analytics Session & Timing
  const sessionIdRef = useRef(null);
  const sessionStartTimeRef = useRef(Date.now());
  const stepStartTimeRef = useRef(Date.now());

  const startNewSession = useCallback(() => {
    const freshSid = 'toyota_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('toyota_wizard_sess', freshSid);
    }
    sessionIdRef.current = freshSid;
    sessionStartTimeRef.current = Date.now();
    stepStartTimeRef.current = Date.now();
    return freshSid;
  }, []);

  if (!sessionIdRef.current && typeof window !== 'undefined') {
    let sid = sessionStorage.getItem('toyota_wizard_sess');
    if (!sid) {
      sid = startNewSession();
    } else {
      sessionIdRef.current = sid;
    }
  }

  // Responsive detection hook
  const [isDesktopScreen, setIsDesktopScreen] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const [deviceMode, setDeviceMode] = useState('auto'); // 'auto' | 'desktop' | 'mobile'

  const loadFlow = useCallback(async () => {
    try {
      const data = await fetchFlow('all');
      if (data?.success && data?.questions?.length > 0) {
        setFlowData(data);
      }
    } catch (e) {
      console.warn('[Flow] Could not fetch live flow, falling back to local dataset', e);
    }
  }, []);

  useEffect(() => {
    loadFlow();
  }, [loadFlow, isAdminRoute]);

  useEffect(() => {
    const handleResize = () => setIsDesktopScreen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);

    const handleLocationChange = () => {
      setIsAdminRoute(
        window.location.pathname === '/admin' || 
        window.location.pathname.startsWith('/admin/') ||
        window.location.hash === '#admin'
      );
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync public SEO, Branding & Dynamic Code settings
  useEffect(() => {
    fetchPublicSettings().then(st => {
      if (!st) return;
      setSiteSettings(st);

      // 1. Meta Title
      if (st.meta_title) {
        document.title = st.meta_title;
      }

      // 2. Meta Description
      if (st.meta_description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', st.meta_description);
      }

      // 3. Canonical URL
      if (st.canonical_url) {
        let linkCan = document.querySelector('link[rel="canonical"]');
        if (!linkCan) {
          linkCan = document.createElement('link');
          linkCan.setAttribute('rel', 'canonical');
          document.head.appendChild(linkCan);
        }
        linkCan.setAttribute('href', st.canonical_url);
      }

      // 4. Site Logo
      if (st.site_logo) {
        window.__CUSTOM_LOGO__ = st.site_logo;
      }

      // 5. Site Favicon
      if (st.site_favicon) {
        updateDocumentFavicon(st.site_favicon);
      }

      // 6. Primary Brand Accent Color
      if (st.primary_color) {
        document.documentElement.style.setProperty('--toyota-red', st.primary_color);
      }

      // 7. Dynamic Custom CSS (Safe Injection)
      let styleEl = document.getElementById('toyota-custom-css');
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'toyota-custom-css';
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = st.custom_css || '';

      // 8. Dynamic Custom JS (Safe Execution)
      if (st.custom_js) {
        let existingScript = document.getElementById('toyota-custom-js');
        if (existingScript) existingScript.remove();
        try {
          const scriptEl = document.createElement('script');
          scriptEl.id = 'toyota-custom-js';
          scriptEl.type = 'text/javascript';
          scriptEl.text = st.custom_js;
          document.body.appendChild(scriptEl);
        } catch (err) {
          console.warn('[Dynamic JS] Script execution error:', err);
        }
      }
    }).catch(err => {
      console.warn('[Settings] Failed to fetch public settings', err);
    });
  }, [isAdminRoute]);

  // Dynamic Meta Robots enforcement: strictly noindex for admin, index for customer
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    if (isAdminRoute || showAdmin) {
      metaRobots.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
    } else {
      metaRobots.setAttribute('content', 'index, follow');
    }
  }, [isAdminRoute, showAdmin]);

  // Real Funnel & Timing Telemetry Tracking
  useEffect(() => {
    if (isAdminRoute || showAdmin) return;

    const now = Date.now();
    let timeOnStep = Math.max(1, Math.round((now - stepStartTimeRef.current) / 1000));
    let totalElapsed = Math.max(1, Math.round((now - sessionStartTimeRef.current) / 1000));
    // Standard web analytics cap: idle open tabs capped at 600s/step and 1800s/total session
    if (timeOnStep > 600) timeOnStep = 600;
    if (totalElapsed > 1800) totalElapsed = 1800;
    stepStartTimeRef.current = now;

    let stepId = 'intro';
    let stepName = 'Giriş Sayfası';
    let stepIndex = 0;

    if (step === 'intro') {
      stepId = 'intro';
      stepName = 'Giriş Sayfası';
      stepIndex = 0;
    } else if (step === 'profile') {
      stepId = `profile_${profileStepIndex}`;
      stepName = profileStepIndex === 1 ? '1. Soru (Kullanım Amacı)' : `${profileStepIndex}. Soru`;
      stepIndex = profileStepIndex;
    } else if (step === 'categories') {
      stepId = 'categories';
      stepName = '3. Aşama (İhtiyaç Balonları)';
      stepIndex = 3;
    } else if (step === 'summary') {
      stepId = 'summary';
      stepName = '4. Aşama (Seçim Özeti)';
      stepIndex = 4;
    } else if (step === 'loading') {
      stepId = 'loading';
      stepName = 'Eşleştirme Hesaplanıyor';
      stepIndex = 5;
    } else if (step === 'result') {
      stepId = 'result';
      stepName = '5. Aşama (Önerilen Araç Ekranı)';
      stepIndex = 6;
    }

    const effectiveDevice = deviceMode === 'mobile' ? 'mobile' : (deviceMode === 'desktop' ? 'desktop' : (isDesktopScreen ? 'desktop' : 'mobile'));
    const matchedModelName = matchResults && matchResults[0] ? (matchResults[0].name || matchResults[0].model || '') : '';

    trackWizardStep({
      sessionId: sessionIdRef.current,
      deviceType: effectiveDevice,
      stepId,
      stepName,
      stepIndex,
      timeOnStepSeconds: timeOnStep,
      totalElapsedSeconds: totalElapsed,
      reachedResult: step === 'result',
      matchedVehicle: matchedModelName,
      isExit: false
    });
  }, [step, profileStepIndex, isAdminRoute, showAdmin, deviceMode, isDesktopScreen, matchResults]);

  // Drop-off / Exit telemetry on tab close or navigation
  useEffect(() => {
    if (isAdminRoute || showAdmin) return;

    const handleExit = () => {
      const now = Date.now();
      let timeOnStep = Math.max(1, Math.round((now - stepStartTimeRef.current) / 1000));
      let totalElapsed = Math.max(1, Math.round((now - sessionStartTimeRef.current) / 1000));
      if (timeOnStep > 600) timeOnStep = 600;
      if (totalElapsed > 1800) totalElapsed = 1800;
      const effectiveDevice = deviceMode === 'mobile' ? 'mobile' : (deviceMode === 'desktop' ? 'desktop' : (isDesktopScreen ? 'desktop' : 'mobile'));

      let stepId = 'intro';
      let stepName = 'Giriş Sayfası';
      let stepIndex = 0;
      if (step === 'profile') {
        stepId = `profile_${profileStepIndex}`;
        stepName = profileStepIndex === 1 ? '1. Soru (Kullanım Amacı)' : `${profileStepIndex}. Soru`;
        stepIndex = profileStepIndex;
      } else if (step === 'categories') {
        stepId = 'categories';
        stepName = '3. Aşama (İhtiyaç Balonları)';
        stepIndex = 3;
      } else if (step === 'summary') {
        stepId = 'summary';
        stepName = '4. Aşama (Seçim Özeti)';
        stepIndex = 4;
      } else if (step === 'result') {
        stepId = 'result';
        stepName = '5. Aşama (Önerilen Araç)';
        stepIndex = 5;
      }

      trackWizardStep({
        sessionId: sessionIdRef.current,
        deviceType: effectiveDevice,
        stepId,
        stepName,
        stepIndex,
        timeOnStepSeconds: timeOnStep,
        totalElapsedSeconds: totalElapsed,
        reachedResult: step === 'result',
        matchedVehicle: matchResults && matchResults[0] ? (matchResults[0].name || '') : '',
        isExit: true
      });
    };

    window.addEventListener('beforeunload', handleExit);
    return () => window.removeEventListener('beforeunload', handleExit);
  }, [step, profileStepIndex, isAdminRoute, showAdmin, deviceMode, isDesktopScreen, matchResults]);

  // Toggle option inside category
  const handleToggleOpt = useCallback((catId, opt, isRadio = false, exclusivePair = null) => {
    setSelections(prev => {
      const current = prev[catId] ?? [];
      const isAlreadySelected = current.includes(opt);
      const mutuallyExclusive = exclusivePair
        ? (exclusivePair[0] === opt ? exclusivePair[1] : exclusivePair[1] === opt ? exclusivePair[0] : null)
        : null;
      const hasExclusive = !!mutuallyExclusive && current.includes(mutuallyExclusive);

      if (!isRadio && !isAlreadySelected && !hasExclusive && current.length >= MAX_CATEGORY_SELECTIONS) {
        return prev;
      }

      let updated;
      if (isRadio) {
        updated = isAlreadySelected ? [] : [opt];
      } else if (isAlreadySelected) {
        updated = current.filter(x => x !== opt);
      } else {
        const withoutExclusive = mutuallyExclusive ? current.filter(x => x !== mutuallyExclusive) : current;
        updated = [...withoutExclusive, opt];
      }

      return { ...prev, [catId]: updated };
    });
  }, []);

  // Toggle no-options category
  const handleToggleNoOpts = useCallback((catId, catName) => {
    setSelections(prev => {
      const current = prev[catId] ?? [];
      return { ...prev, [catId]: current.length > 0 ? [] : [catName] };
    });
  }, []);

  // Remove option from summary
  const handleRemove = useCallback((catId, opt) => {
    setSelections(prev => ({
      ...prev,
      [catId]: (prev[catId] ?? []).filter(x => x !== opt)
    }));
  }, []);

  const navigateToAdmin = () => {
    window.history.pushState({}, '', '/admin');
    setIsAdminRoute(true);
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setIsAdminRoute(false);
    setShowAdmin(false);
    loadFlow();
  };

  // If on /admin route or showAdmin state is true, render standalone Admin Panel
  if (isAdminRoute || showAdmin) {
    return <AdminPanel onExit={navigateToHome} />;
  }

  const isDesktop = deviceMode === 'desktop' ? true : deviceMode === 'mobile' ? false : isDesktopScreen;

  // Compute category flags safely
  const isCommercial = category === 'Ticari Araç' || (category && category.toLowerCase().includes('ticari'));
  const isBoth = category === 'Her İkisi de' || (category && (category.toLowerCase().includes('her ikisi') || category.toLowerCase().includes('ikisi')));
  const isBinek = !isCommercial && !isBoth; // Default safely to Binek if empty or explicitly 'Binek Araç'

  // Dynamic Categories from API with fallback
  // CRITICAL: Binek Araç ONLY gets Binek categories (0..11).
  // Ticari Araç ONLY gets Commercial categories matching businessType (via getCommercialCategories).
  // Her İkisi de gets both.
  const activeCategories = (() => {
    if (isBinek) {
      if (flowData?.categories?.length > 0) {
        const binekFromFlow = flowData.categories.filter(c => c.vehicleType === 'binek');
        if (binekFromFlow.length > 0) return binekFromFlow;
      }
      return BINEK_CATEGORIES;
    }

    if (isCommercial) {
      const commercialTarget = getCommercialCategories(businessType);
      const allowedIds = new Set(commercialTarget.map(c => c.id));
      if (flowData?.categories?.length > 0) {
        const dbMatching = flowData.categories.filter(c => allowedIds.has(c.id));
        if (dbMatching.length > 0) {
          return commercialTarget.map(tc => dbMatching.find(dbC => dbC.id === tc.id) || tc);
        }
      }
      return commercialTarget;
    }

    // Her İkisi de
    const binekPart = (flowData?.categories?.length > 0)
      ? flowData.categories.filter(c => c.vehicleType === 'binek')
      : BINEK_CATEGORIES;
    return [...binekPart, ...getCommercialCategories('__all__')];
  })();

  // Dynamic Intro Question from API with fallback
  const introQuestion = (flowData?.questions?.length > 0)
    ? (flowData.questions.find(q => q.id === 'intro' || q.order === 1) || INTRO_QUESTION)
    : INTRO_QUESTION;

  // Dynamic Profile Questions for Chosen Category
  // CRITICAL:
  // - Binek Araç: ONLY binek questions (seats, lifestyle, closer) - NEVER usage or commercial questions!
  // - Ticari Araç: ONLY commercial questions (usage) - NEVER seats, lifestyle, closer!
  // - Her İkisi de: seats, lifestyle, usage, closer
  const currentProfileQuestions = (() => {
    if (flowData?.questions?.length > 0) {
      const activeQs = flowData.questions.filter(q => q.id !== 'intro' && q.order !== 1 && (q.is_active === undefined || q.is_active === 1 || q.is_active === true));
      if (isCommercial) {
        const commQs = activeQs.filter(q => q.categoryType === 'Ticari Araç' || q.id === 'usage');
        return commQs.length > 0 ? commQs : [QUESTION_USAGE];
      }
      if (isBoth) {
        return activeQs;
      }
      // isBinek (Binek Araç or initial default before choice)
      const binekQs = activeQs.filter(q => (q.categoryType === 'Binek Araç' || q.categoryType === 'binek') && q.id !== 'usage');
      return binekQs.length > 0 ? binekQs : [QUESTION_SEATS, QUESTION_LIFESTYLE, QUESTION_CLOSER];
    }

    if (isCommercial) return PROFILE_STEPS_BY_CATEGORY['Ticari Araç'] ?? [QUESTION_USAGE];
    if (isBoth) return PROFILE_STEPS_BY_CATEGORY['Her İkisi de'] ?? [QUESTION_SEATS, QUESTION_LIFESTYLE, QUESTION_USAGE, QUESTION_CLOSER];
    return PROFILE_STEPS_BY_CATEGORY['Binek Araç'] ?? [QUESTION_SEATS, QUESTION_LIFESTYLE, QUESTION_CLOSER];
  })();

  const totalProfileSteps = 1 + currentProfileQuestions.length;
  const currentProfileQuestion = profileStepIndex <= 1
    ? introQuestion
    : currentProfileQuestions[profileStepIndex - 2] ?? introQuestion;

  const isPassengerCommercial = isCommercial && businessType === 'Yolcu Taşımacılığı';

  // Calculate Remote Dynamic Match
  const runRemoteMatch = async () => {
    try {
      const results = await calculateRemoteMatch({
        category: category || 'Binek Araç',
        businessType: businessType || '',
        answers: s3Answers,
        selections
      });
      if (results && results.length > 0) {
        setMatchResults(results);
      }
    } catch (err) {
      console.warn('[Match] Remote match fallback triggered', err);
    }
  };

  // Next in questionnaire
  const handleProfileNext = (selectedAnswers) => {
    let nextCategory = category;
    if (profileStepIndex <= 1) {
      const rawAns = selectedAnswers[0] || '';
      if (rawAns.toLowerCase().includes('ticari')) {
        nextCategory = 'Ticari Araç';
      } else if (rawAns.toLowerCase().includes('her ikisi') || rawAns.toLowerCase().includes('ikisi')) {
        nextCategory = 'Her İkisi de';
      } else {
        nextCategory = 'Binek Araç';
      }

      if (nextCategory !== category) {
        setS3Answers([]);
        setBusinessType('');
        setSelections({});
      }
      setCategory(nextCategory);

      // Determine step count for nextCategory
      let nextTotalSteps = 4;
      if (nextCategory === 'Ticari Araç') {
        nextTotalSteps = 2; // intro + usage
      } else if (nextCategory === 'Her İkisi de') {
        nextTotalSteps = 5;
      } else {
        // Binek Araç: intro + 3 questions (seats, lifestyle, closer)
        const binekQs = (flowData?.questions?.length > 0)
          ? flowData.questions.filter(q => q.id !== 'intro' && q.order !== 1 && (q.categoryType === 'Binek Araç' || q.categoryType === 'binek') && q.id !== 'usage')
          : (PROFILE_STEPS_BY_CATEGORY['Binek Araç'] ?? []);
        nextTotalSteps = 1 + binekQs.length;
      }

      if (1 < nextTotalSteps) {
        setProfileStepIndex(2);
      } else {
        setSelections({});
        setOpenCatId(null);
        setReturnToSummary(false);
        setStep('categories');
      }
      return;
    }

    // Step 2+
    const currentQ = currentProfileQuestions[profileStepIndex - 2];
    const optTitles = (currentQ?.opts || []).map(o => o.t);
    setS3Answers(prev => [...prev.filter(a => !optTitles.includes(a)), ...selectedAnswers]);

    const matchType = selectedAnswers.find(a => 
      COMMERCIAL_BUSINESS_TYPES.some(bt => bt.t === a) ||
      ['Yolcu Taşımacılığı', 'Dağıtım', 'Teknik Servis', 'Yapı/Onarım', 'Sanayi/Üretim', 'Diğer'].includes(a)
    );
    if (matchType) {
      setBusinessType(matchType);
    }

    if (profileStepIndex < totalProfileSteps) {
      setProfileStepIndex(p => p + 1);
    } else {
      setSelections({});
      setOpenCatId(null);
      setReturnToSummary(false);
      setStep('categories');
    }
  };

  const handleProfileBack = () => {
    if (profileStepIndex <= 1) {
      setStep('intro');
      setProfileStepIndex(0);
    } else {
      setProfileStepIndex(p => p - 1);
    }
  };

  const handleEditCategory = (catId) => {
    setOpenCatId(catId);
    setReturnToSummary(true);
    setStep('categories');
  };

  const handleReset = () => {
    setStep('intro');
    setProfileStepIndex(0);
    setCategory('');
    setBusinessType('');
    setS3Answers([]);
    setSelections({});
    setTowSub(null);
    setOpenCatId(null);
    setReturnToSummary(false);
    setMatchResults(null);
    startNewSession();
    loadFlow();
  };

  // Render responsive mobile container
  const renderMobileFrame = (content, bgColor = '#fff') => {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100%',
        maxWidth: 540,
        margin: '0 auto',
        position: 'relative',
        background: bgColor,
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>
        {siteSettings?.announcement_banner && (
          <div style={{
            background: siteSettings.primary_color || '#EB0A1E',
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 600,
            textAlign: 'center',
            padding: '8px 16px',
            letterSpacing: '0.2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}>
            <span style={{ fontSize: 14 }}>📢</span>
            <span>{siteSettings.announcement_banner}</span>
          </div>
        )}
        {content}
      </div>
    );
  };

  // Desktop full-page rendering
  if (isDesktop) {
    return (
      <div style={{ position: 'relative' }}>
        {/* Zero-Code Top Announcement Banner */}
        {siteSettings?.announcement_banner && (
          <div style={{
            background: siteSettings.primary_color || '#EB0A1E',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 600,
            textAlign: 'center',
            padding: '9px 24px',
            letterSpacing: '0.2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 60
          }}>
            <span style={{ fontSize: 14 }}>📢</span>
            <span>{siteSettings.announcement_banner}</span>
          </div>
        )}



        {step === 'intro' && (
          <DesktopIntroStep
            isClosed={siteSettings?.wizard_status === 'closed'}
            closedMessage={siteSettings?.wizard_closed_message}
            onNext={() => {
              startNewSession();
              setProfileStepIndex(1);
              setStep('profile');
            }}
          />
        )}

        {step === 'profile' && (
          <DesktopProfileStep
            key={profileStepIndex}
            q={currentProfileQuestion}
            displayStep={profileStepIndex}
            totalSteps={totalProfileSteps}
            multiSelect={currentProfileQuestion.select === 'multi'}
            onNext={handleProfileNext}
            onBack={handleProfileBack}
          />
        )}

        {step === 'categories' && (
          <CategoryFilter
            variant="desktop"
            cats={activeCategories}
            selections={selections}
            onToggleOpt={handleToggleOpt}
            onToggleNoOpts={handleToggleNoOpts}
            towSub={towSub}
            onTowSub={setTowSub}
            singleModelMode={isPassengerCommercial}
            returnToSummary={returnToSummary}
            onReview={() => setStep('summary')}
            onExit={() => {
              if (returnToSummary) {
                setReturnToSummary(false);
                setStep('summary');
              } else {
                setStep('profile');
                setProfileStepIndex(totalProfileSteps);
              }
            }}
            openCatId={openCatId}
            setOpenCatId={setOpenCatId}
          />
        )}

        {step === 'summary' && (
          <DesktopSummaryStep
            selections={selections}
            cats={activeCategories}
            onEdit={handleEditCategory}
            onBack={() => {
              setOpenCatId(null);
              setReturnToSummary(false);
              setStep('categories');
            }}
            onResult={() => {
              runRemoteMatch();
              setStep('loading');
            }}
            onRemove={handleRemove}
          />
        )}

        {step === 'loading' && (
          <DesktopLoadingStep onDone={() => setStep('result')} />
        )}

        {step === 'result' && (
          <DesktopResultStep
            category={category}
            businessType={businessType}
            selections={selections}
            s3Answers={s3Answers}
            matchResults={matchResults}
            onReset={handleReset}
          />
        )}
      </div>
    );
  }

  // Mobile layout rendering
  if (step === 'intro') {
    return renderMobileFrame(
      <MobileIntroStep
        isClosed={siteSettings?.wizard_status === 'closed'}
        closedMessage={siteSettings?.wizard_closed_message}
        onNext={() => {
          startNewSession();
          setProfileStepIndex(1);
          setStep('profile');
        }}
      />
    );
  }

  if (step === 'profile') {
    return renderMobileFrame(
      <MobileProfileStep
        key={profileStepIndex}
        q={currentProfileQuestion}
        displayStep={profileStepIndex}
        totalSteps={totalProfileSteps}
        multiSelect={currentProfileQuestion.select === 'multi'}
        onNext={handleProfileNext}
        onBack={handleProfileBack}
      />
    );
  }

  if (step === 'categories') {
    return renderMobileFrame(
      <CategoryFilter
        variant="mobile"
        cats={activeCategories}
        selections={selections}
        onToggleOpt={handleToggleOpt}
        onToggleNoOpts={handleToggleNoOpts}
        towSub={towSub}
        onTowSub={setTowSub}
        singleModelMode={isPassengerCommercial}
        returnToSummary={returnToSummary}
        onReview={() => setStep('summary')}
        onExit={() => {
          if (returnToSummary) {
            setReturnToSummary(false);
            setStep('summary');
          } else {
            setStep('profile');
            setProfileStepIndex(totalProfileSteps);
          }
        }}
        openCatId={openCatId}
        setOpenCatId={setOpenCatId}
      />,
      '#15151B'
    );
  }

  if (step === 'summary') {
    return renderMobileFrame(
      <MobileSummaryStep
        selections={selections}
        cats={activeCategories}
        onEdit={handleEditCategory}
        onBack={() => {
          setOpenCatId(null);
          setStep('categories');
        }}
        onResult={() => {
          runRemoteMatch();
          setStep('loading');
        }}
        onFinishNow={() => {
          runRemoteMatch();
          setStep('loading');
        }}
        onRemove={handleRemove}
      />
    );
  }

  if (step === 'loading') {
    return renderMobileFrame(
      <MobileLoadingStep onDone={() => setStep('result')} />,
      '#15151B'
    );
  }

  if (step === 'result') {
    return renderMobileFrame(
      <MobileResultStep
        category={category}
        businessType={businessType}
        selections={selections}
        s3Answers={s3Answers}
        matchResults={matchResults}
        onReset={handleReset}
      />
    );
  }

  return null;
}

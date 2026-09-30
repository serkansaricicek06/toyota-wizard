import React, { useState, useEffect, useRef } from 'react';
import { ToyotaLogo } from './Icons';
import {
  adminLogin,
  adminGetStats,
  adminGetQuestions,
  adminToggleQuestion,
  adminCreateQuestionWithRules,
  adminUpdateQuestionWithRules,
  adminDeleteQuestion,
  adminGetCategories,
  adminToggleCategory,
  adminCreateCategoryWithRules,
  adminUpdateCategoryWithRules,
  adminDeleteCategory,
  adminGetVehicles,
  adminToggleVehicle,
  adminGetLeads,
  adminUpdateLeadStatus,
  adminGetRules,
  adminUpdateRuleCell,
  adminSyncToyota,
  adminGetSettings,
  adminSaveSettings,
  adminGetUsers,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
  adminChangePassword,
  adminUploadAsset,
  calculateRemoteMatch,
  adminGetAnalytics,
  adminResetAnalytics,
  updateDocumentFavicon,
  fetchPublicSettings
} from '../services/api';

// ------------------------------------------------------------------
// Clean Bootstrap-Style SVG Icons (No Emojis)
// ------------------------------------------------------------------
function BarChartIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M4 11H2v3h2zm5-4H7v7h2zm5-5h-2v12h2zM0 15h16v1H0z" />
    </svg>
  );
}
function PencilIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
    </svg>
  );
}

function TrashIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
    </svg>
  );
}

function PlusIcon({ size = 15, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
    </svg>
  );
}

function ArrowRepeatIcon({ size = 15, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
      <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
    </svg>
  );
}

function CheckIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
    </svg>
  );
}

function CloseIcon({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );
}

function FileTextIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M4 0h5.293A1 1 0 0 1 10 .293l4.707 4.707A1 1 0 0 1 15 5.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.5 8a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
    </svg>
  );
}

function DownloadIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
    </svg>
  );
}

function PrinterIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
      <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
    </svg>
  );
}

function DisplayIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2zm1.398-.855a.758.758 0 0 0-.255.455 1.7 1.7 0 0 0 0 .399h13.714a1.7 1.7 0 0 0 0-.399.758.758 0 0 0-.255-.455 1.4 1.4 0 0 0-.602-.144H2c-.22 0-.427.051-.602.144M15 4.5H1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
    </svg>
  );
}

function PhoneIcon({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ display: 'inline-block', verticalAlign: '-2px' }}>
      <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
      <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
    </svg>
  );
}


// Helper to extract tab from browser pathname
function getTabFromUrl() {
  if (typeof window === 'undefined') return 'dashboard';
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const match = pathname.match(/^\/admin\/([a-zA-Z0-9_-]+)/);
  if (match) {
    const sub = match[1];
    if (['dashboard', 'questions', 'categories', 'vehicles', 'matrix', 'simulator', 'leads', 'seo', 'security'].includes(sub)) {
      return sub;
    }
  }
  return 'dashboard';
}

const DEFAULT_CAR_FALLBACK = 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/61c63195-8c8f-4deb-b255-a2589cff23a9/vehicle/96518/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png';

const handleImgError = (e) => {
  if (e?.currentTarget && e.currentTarget.src !== DEFAULT_CAR_FALLBACK) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_CAR_FALLBACK;
  }
};

export function AdminPanel({ onExit }) {
  // Authentication State
  const [token, setToken] = useState(() => localStorage.getItem('toyota_admin_token') || '');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin!Toyota2025');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Real Analytics States
  const [analytics, setAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);


  // URL-Synced Navigation: 'dashboard' | 'questions' | 'categories' | 'vehicles' | 'matrix' | 'simulator' | 'leads' | 'seo' | 'security'
  const [activeNav, setActiveNav] = useState(() => getTabFromUrl());

  const navigateToTab = (tabId) => {
    setActiveNav(tabId);
    const targetUrl = tabId === 'dashboard' ? '/admin' : `/admin/${tabId}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ tab: tabId }, '', targetUrl);
    }
  };

  useEffect(() => {
    const initial = getTabFromUrl();
    setActiveNav(initial);

    // Keep /admin on dashboard
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
      setActiveNav('dashboard');
    }

    const handlePopState = () => {
      setActiveNav(getTabFromUrl());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);


  // Crawler Isolation: Enforce noindex while in Admin Panel
  useEffect(() => {
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');

    return () => {
      if (metaRobots) {
        metaRobots.setAttribute('content', 'index, follow');
      }
    };
  }, []);

  // Data States
  const [stats, setStats] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [rules, setRules] = useState([]);
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    canonical_url: '',
    og_image: '',
    gtm_id: ''
  });

  // Notifications
  const [alert, setAlert] = useState(null);
  const showAlert = (text, type = 'success') => {
    setAlert({ text, type });
    setTimeout(() => setAlert(null), 4000);
  };

  // Sync State
  const [syncing, setSyncing] = useState(false);

  // Matrix Cell Editor
  const [activeCell, setActiveCell] = useState(null);
  const [cellWeight, setCellWeight] = useState(20);
  const [cellBadge, setCellBadge] = useState('');

  // ----------------------------------------------------
  // SIMULATOR STATE (DYNAMIC & TRANSPARENT BREAKDOWN)
  // ----------------------------------------------------
  const [simCategory, setSimCategory] = useState('Binek Araç');
  const [simAnswers, setSimAnswers] = useState(['Şehir Hayatı', '3-4 Kişi']);
  const [simSelectedBubbles, setSimSelectedBubbles] = useState(['Dar alanda rahat park']);
  const [simResults, setSimResults] = useState(null);
  const [simCalculating, setSimCalculating] = useState(false);
  const [simViewMode, setSimViewMode] = useState('breakdown'); // 'breakdown' | 'preview'

  const SIM_PRESETS = [
    {
      id: 'city',
      title: 'Şehirli Çekirdek Aile',
      category: 'Binek Araç',
      answers: ['Şehir Hayatı', '3-4 Kişi'],
      bubbles: ['Dar alanda rahat park'],
      expected: 'Corolla Sedan & Yaris Cross'
    },
    {
      id: 'young',
      title: 'Kompakt Şehirli Sürücü',
      category: 'Binek Araç',
      answers: ['Şehir Hayatı', '1-2 Kişi'],
      bubbles: ['Dar alanda rahat park'],
      expected: 'Yaris Hybrid (%98 Lider)'
    },
    {
      id: 'adventure',
      title: 'Macera & Doğa Tutkunu',
      category: 'Binek Araç',
      answers: ['Macera/Doğa Aktiviteleri', '3-4 Kişi'],
      bubbles: ['Zor arazilerde dayanıklı', 'Çekiş kabiliyeti'],
      expected: 'Yeni RAV4 & Hilux'
    },
    {
      id: 'large_family',
      title: 'Geniş Aile (7+ Kişi)',
      category: 'Binek Araç',
      answers: ['Aile ve Çocuklu Yaşam', '5 ve üzeri'],
      bubbles: ['Arka koltuk konforu', 'Geniş yükleme alanı'],
      expected: 'Proace Verso Testi'
    },
    {
      id: 'cargo',
      title: 'Ticari Kargo & Dağıtım',
      category: 'Ticari Araç',
      answers: ['Dağıtım'],
      bubbles: ['Geniş yükleme alanı'],
      expected: 'Proace City Cargo'
    },
    {
      id: 'shuttle',
      title: 'Ticari Yolcu Taşımacılığı',
      category: 'Ticari Araç',
      answers: ['Yolcu Taşımacılığı'],
      bubbles: ['Arka koltuk konforu'],
      expected: 'Proace Verso 9 Kişilik'
    }
  ];

  // Security / Password Form
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  // ----------------------------------------------------
  // QUESTION MODAL (CREATE OR EDIT)
  // ----------------------------------------------------
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questionModalMode, setQuestionModalMode] = useState('create');
  const [editingQuestionId, setEditingQuestionId] = useState(null);

  const [qTitle, setQTitle] = useState('');
  const [qSubtitle, setQSubtitle] = useState('');
  const [qCategoryType, setQCategoryType] = useState('Binek Araç');
  const [qStep, setQStep] = useState(2);
  const [qSelectType, setQSelectType] = useState('radio');
  const [qOptions, setQOptions] = useState(['', '']);
  const [qVehicleSelections, setQVehicleSelections] = useState({});

  // ----------------------------------------------------
  // CATEGORY MODAL (CREATE OR EDIT)
  // ----------------------------------------------------
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryModalMode, setCategoryModalMode] = useState('create');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [catName, setCatName] = useState('');
  const [catColor, setCatColor] = useState('#5B8DBF');
  const [catIcon, setCatIcon] = useState('●');
  const [catVehicleType, setCatVehicleType] = useState('binek');
  const [catOptions, setCatOptions] = useState([]);
  const [catOptionInput, setCatOptionInput] = useState('');
  const [catVehicleSelections, setCatVehicleSelections] = useState({});

  // ----------------------------------------------------
  // USER / TEAM MODAL (CREATE OR EDIT)
  // ----------------------------------------------------
  const [showUserModal, setShowUserModal] = useState(false);
  const [userModalMode, setUserModalMode] = useState('create');
  const [editingUserId, setEditingUserId] = useState(null);
  const [uUsername, setUUsername] = useState('');
  const [uFullName, setUFullName] = useState('');
  const [uPassword, setUPassword] = useState('');
  const [uRole, setURole] = useState('editor');
  const [uIsActive, setUIsActive] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(null);

  // SEO Advanced Settings State & Asset Uploads
  const [showAdvancedCode, setShowAdvancedCode] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const logoFileRef = useRef(null);
  const faviconFileRef = useRef(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const handleFileUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Dosya boyutu 5 MB\'tan küçük olmalıdır.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      try {
        if (type === 'logo') setUploadingLogo(true);
        else setUploadingFavicon(true);

        const res = await adminUploadAsset(dataUrl, file.name, type, token);
        if (res?.success && res?.url) {
          if (type === 'logo') {
            setSettings(prev => ({ ...prev, site_logo: res.url }));
          } else {
            setSettings(prev => ({ ...prev, site_favicon: res.url }));
            updateDocumentFavicon(res.url);
          }
        }
      } catch (err) {
        alert('Yükleme hatası: ' + (err.message || 'Görsel yüklenemedi'));
      } finally {
        if (type === 'logo') setUploadingLogo(false);
        else setUploadingFavicon(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await adminLogin(username, password);
      setToken(res.token);
      localStorage.setItem('toyota_admin_token', res.token);
    } catch (err) {
      setLoginError(err.message || 'Giriş başarısız. Kullanıcı adı veya şifre hatalı.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('toyota_admin_token');
  };

  // Load All System Data
  const loadAllData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [sData, qData, cData, vData, rData, lData, setData, uData, aData] = await Promise.all([
        adminGetStats(token),
        adminGetQuestions(token),
        adminGetCategories(token),
        adminGetVehicles(token),
        adminGetRules(token),
        adminGetLeads(token),
        adminGetSettings(token).catch(() => ({ settings: {} })),
        adminGetUsers(token).catch(() => ({ users: [] })),
        adminGetAnalytics(token).catch(() => null)
      ]);

      setStats(sData);
      setQuestions(qData.questions || []);
      setCategories(cData.categories || []);
      setVehicles(vData.vehicles || []);
      setRules(rData.rules || []);
      setLeads(lData.leads || []);
      if (setData?.settings) {
        setSettings(setData.settings);
        if (setData.settings.site_favicon) {
          updateDocumentFavicon(setData.settings.site_favicon);
        }
      }
      if (uData?.users) setUsers(uData.users);
      if (uData?.currentUserId) setCurrentUserId(uData.currentUserId);
      if (aData?.success) setAnalytics(aData);
    } catch (err) {
      console.warn('[Admin] Veri yüklenemedi veya oturum geçersiz:', err);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    if (!token) return;
    setLoadingAnalytics(true);
    try {
      const aData = await adminGetAnalytics(token);
      if (aData?.success) setAnalytics(aData);
    } catch (e) {
      console.warn('[Analytics Error]', e);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleResetAnalytics = async () => {
    if (!token) return;
    setResetting(true);
    try {
      const res = await adminResetAnalytics(token);
      if (res?.success) {
        showAlert(res.message || 'Analitik verileri başarıyla sıfırlandı.');
        setShowResetModal(false);
        await fetchAnalytics();
      }
    } catch (e) {
      showAlert('Sıfırlama başarısız oldu.', 'error');
    } finally {
      setResetting(false);
    }
  };

  const handleExportCSV = () => {
    if (!analytics?.recentSessions || analytics.recentSessions.length === 0) {
      showAlert('Dışa aktarılacak oturum verisi bulunamadı.', 'error');
      return;
    }
    const headers = ['Oturum Kodu', 'Cihaz', 'Başlangıç Tarihi', 'Ulaşılan Son Adım', 'Toplam Süre (sn)', 'Sonuç Gördü mü', 'Teklif Formu Gönderdi mi', 'Eşleşen Model'];
    const rows = analytics.recentSessions.map(s => [
      `"${s.session_id}"`,
      `"${s.device_type === 'mobile' ? 'Mobil' : 'Masaüstü'}"`,
      `"${new Date(s.started_at).toLocaleString('tr-TR')}"`,
      `"${s.last_step_name || s.last_step || ''}"`,
      s.total_duration_seconds ?? 0,
      s.reached_result ? 'Evet' : 'Hayır',
      s.completed_lead ? 'Evet' : 'Hayır',
      `"${s.matched_vehicle || ''}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `toyota_analitik_raporu_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAlert('CSV analitik raporu başarıyla indirildi.');
  };

  const handlePrintReport = () => {
    window.print();
  };


  useEffect(() => {
    fetchPublicSettings().then(st => {
      if (st?.site_favicon) {
        updateDocumentFavicon(st.site_favicon);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    loadAllData();
  }, [token]);


  // Run Simulator Engine
  const runSimulator = async () => {
    setSimCalculating(true);
    try {
      const isCommercial = simCategory === 'Ticari Araç';
      const bType = isCommercial ? (simAnswers.includes('Yolcu Taşımacılığı') ? 'Yolcu Taşımacılığı' : 'Dağıtım') : '';
      const matches = await calculateRemoteMatch({
        category: simCategory,
        businessType: bType,
        answers: simAnswers,
        selections: { 'bubbles': simSelectedBubbles }
      });
      setSimResults(matches || []);
    } catch (err) {
      console.error('Simulator error:', err);
    } finally {
      setSimCalculating(false);
    }
  };

  useEffect(() => {
    if (activeNav === 'simulator' || activeNav === 'matrix') {
      runSimulator();
    }
  }, [simCategory, simAnswers, simSelectedBubbles, rules, activeNav]);

  // Category switch with sensible presets
  const handleSimCategoryChange = (newCat) => {
    setSimCategory(newCat);
    if (newCat === 'Ticari Araç') {
      setSimAnswers(['Dağıtım']);
      setSimSelectedBubbles(['Geniş yükleme alanı']);
    } else {
      setSimAnswers(['Şehir Hayatı', '3-4 Kişi']);
      setSimSelectedBubbles(['Dar alanda rahat park']);
    }
  };

  // Preset Scenario quick apply
  const handleApplyPreset = (preset) => {
    setSimCategory(preset.category);
    setSimAnswers(preset.answers);
    setSimSelectedBubbles(preset.bubbles);
    showAlert(`"${preset.title}" müşteri profili uygulandı.`);
  };

  // Toggle selection inside simulator
  const handleToggleSimAnswer = (optionTitle) => {
    setSimAnswers(prev => {
      if (prev.includes(optionTitle)) {
        return prev.filter(x => x !== optionTitle);
      } else {
        return [...prev, optionTitle];
      }
    });
  };

  const handleToggleSimBubble = (bubbleName) => {
    setSimSelectedBubbles(prev => {
      if (prev.includes(bubbleName)) {
        return prev.filter(b => b !== bubbleName);
      } else {
        return [...prev, bubbleName];
      }
    });
  };

  const handleResetSimulator = () => {
    setSimAnswers([]);
    setSimSelectedBubbles([]);
  };

  // Official Toyota API Sync
  const handleToyotaSync = async () => {
    setSyncing(true);
    try {
      const res = await adminSyncToyota(token);
      showAlert(res.message || 'Toyota API ve Cardb stüdyo modelleri senkronize edildi.');
      const vData = await adminGetVehicles(token);
      setVehicles(vData.vehicles || []);
    } catch (err) {
      showAlert(err.message || 'Senkronizasyon hatası', 'error');
    } finally {
      setSyncing(false);
    }
  };

  // Toggle items
  const handleToggleQ = async (id) => {
    await adminToggleQuestion(id, token);
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, is_active: q.is_active ? 0 : 1 } : q));
  };

  const handleToggleCat = async (id) => {
    await adminToggleCategory(id, token);
    setCategories(prev => prev.map(c => c.id === id ? { ...c, is_active: c.is_active ? 0 : 1 } : c));
  };

  const handleToggleV = async (id) => {
    await adminToggleVehicle(id, token);
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, is_active: v.is_active ? 0 : 1 } : v));
  };

  // Lead status update
  const handleStatusChange = async (leadId, newStatus) => {
    await adminUpdateLeadStatus(leadId, newStatus, token);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    showAlert('Talep durumu güncellendi.');
  };

  // Save Matrix Rule Cell
  const handleSaveCell = async () => {
    if (!activeCell) return;
    const w = parseInt(cellWeight, 10);
    try {
      await adminUpdateRuleCell({
        source_type: activeCell.source_type,
        source_id: activeCell.source_id,
        source_label: activeCell.source_label,
        vehicle_id: activeCell.vehicle_id,
        weight: w,
        reason_badge: cellBadge
      }, token);

      setRules(prev => {
        const filtered = prev.filter(r => !(r.source_id === activeCell.source_id && r.vehicle_id === activeCell.vehicle_id));
        if (w > 0) {
          return [...filtered, {
            source_type: activeCell.source_type,
            source_id: activeCell.source_id,
            source_label: activeCell.source_label,
            vehicle_id: activeCell.vehicle_id,
            weight: w,
            reason_badge: cellBadge
          }];
        }
        return filtered;
      });

      showAlert('Kural puanı güncellendi.');
      setActiveCell(null);
    } catch (err) {
      showAlert(err.message, 'error');
    }
  };

  // Save SEO Settings
  const handleSaveSettings = async (e) => {
    e?.preventDefault();
    setSavingSettings(true);
    try {
      await adminSaveSettings(settings, token);
      if (settings?.site_favicon) {
        updateDocumentFavicon(settings.site_favicon);
      }
      showAlert('SEO ve Sayfa ayarları kaydedildi.');
    } catch (err) {
      showAlert(err.message || 'Ayarlar kaydedilemedi.', 'error');
    } finally {
      setSavingSettings(false);
    }
  };

  // Change Admin Password
  const handleChangePassword = async (e) => {
    e?.preventDefault();
    if (newPwd !== confirmPwd) {
      showAlert('Yeni şifreler eşleşmiyor.', 'error');
      return;
    }
    if (newPwd.length < 6) {
      showAlert('Yeni şifre en az 6 karakter olmalıdır.', 'error');
      return;
    }

    setPwdLoading(true);
    try {
      await adminChangePassword({ currentPassword: currentPwd, newPassword: newPwd }, token);
      showAlert('Şifreniz başarıyla değiştirildi.');
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
    } catch (err) {
      showAlert(err.message || 'Şifre değiştirilemedi.', 'error');
    } finally {
      setPwdLoading(false);
    }
  };

  // =========================================================================
  // USER / TEAM CRUD: CREATE / EDIT / DELETE
  // =========================================================================
  const openCreateUserModal = () => {
    setUserModalMode('create');
    setEditingUserId(null);
    setUUsername('');
    setUFullName('');
    setUPassword('');
    setURole('editor');
    setUIsActive(1);
    setShowUserModal(true);
  };

  const openEditUserModal = (u) => {
    setUserModalMode('edit');
    setEditingUserId(u.id);
    setUUsername(u.username || '');
    setUFullName(u.full_name || '');
    setUPassword('');
    setURole(u.role || 'editor');
    setUIsActive(u.is_active !== undefined ? u.is_active : 1);
    setShowUserModal(true);
  };

  const handleSaveUser = async (e) => {
    e?.preventDefault();
    if (userModalMode === 'create') {
      if (!uUsername.trim() || uUsername.trim().length < 3) {
        showAlert('Kullanıcı adı en az 3 karakter olmalıdır.', 'error');
        return;
      }
      if (!uPassword || uPassword.length < 6) {
        showAlert('Şifre en az 6 karakter olmalıdır.', 'error');
        return;
      }
      try {
        await adminCreateUser({
          username: uUsername.trim(),
          password: uPassword,
          full_name: uFullName.trim(),
          role: uRole
        }, token);
        showAlert(`"${uUsername}" kullanıcısı başarıyla oluşturuldu.`);
        setShowUserModal(false);
        const res = await adminGetUsers(token);
        if (res.users) setUsers(res.users);
      } catch (err) {
        showAlert(err.message || 'Kullanıcı oluşturulamadı.', 'error');
      }
    } else {
      try {
        await adminUpdateUser(editingUserId, {
          full_name: uFullName.trim(),
          role: uRole,
          is_active: uIsActive,
          newPassword: uPassword.trim() ? uPassword.trim() : undefined
        }, token);
        showAlert('Kullanıcı bilgileri güncellendi.');
        setShowUserModal(false);
        const res = await adminGetUsers(token);
        if (res.users) setUsers(res.users);
      } catch (err) {
        showAlert(err.message || 'Kullanıcı güncellenemedi.', 'error');
      }
    }
  };

  const handleDeleteUser = async (id, name) => {
    if (!window.confirm(`"${name}" kullanıcısını silmek istediğinize emin misiniz?`)) return;
    try {
      await adminDeleteUser(id, token);
      showAlert(`"${name}" kullanıcısı silindi.`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      showAlert(err.message || 'Kullanıcı silinemedi.', 'error');
    }
  };

  // =========================================================================
  // QUESTION CRUD: OPEN CREATE / OPEN EDIT / DELETE
  // =========================================================================
  const openCreateQuestionModal = () => {
    setQuestionModalMode('create');
    setEditingQuestionId(null);
    setQTitle('');
    setQSubtitle('');
    setQCategoryType('Binek Araç');
    setQStep(2);
    setQSelectType('radio');
    setQOptions(['', '']);
    setQVehicleSelections({});
    setShowQuestionModal(true);
  };

  const openEditQuestionModal = (q) => {
    setQuestionModalMode('edit');
    setEditingQuestionId(q.id);
    setQTitle(q.title || '');
    setQSubtitle(q.subtitle || '');
    setQCategoryType(q.category_type || 'Binek Araç');
    setQStep(q.order_num || 1);
    setQSelectType(q.select_type || 'radio');
    setQOptions(q.options?.map(o => o.title) || ['', '']);

    const initialSelections = {};
    const relevantRules = rules.filter(r => r.source_type === 'question' && (r.source_id?.includes(q.id) || r.reason_badge === q.title));
    relevantRules.forEach(r => {
      initialSelections[r.vehicle_id] = {
        selected: true,
        weight: r.weight,
        badge: r.reason_badge
      };
    });
    setQVehicleSelections(initialSelections);
    setShowQuestionModal(true);
  };

  const handleDeleteQuestion = async (id, title) => {
    if (!window.confirm(`"${title}" sorusunu ve ilişkili kurallarını silmek istediğinize emin misiniz?`)) {
      return;
    }
    try {
      await adminDeleteQuestion(id, token);
      setQuestions(prev => prev.filter(q => q.id !== id));
      setRules(prev => prev.filter(r => !r.source_id?.includes(id)));
      showAlert('Soru başarıyla silindi.');
    } catch (err) {
      showAlert(err.message || 'Soru silinemedi.', 'error');
    }
  };

  const handleSaveQuestion = async (e) => {
    e?.preventDefault();
    if (!qTitle.trim()) {
      showAlert('Lütfen soru başlığını giriniz.', 'error');
      return;
    }

    const validOptions = qOptions.map(o => o.trim()).filter(Boolean);
    if (validOptions.length < 2) {
      showAlert('Lütfen en az 2 geçerli seçenek giriniz.', 'error');
      return;
    }

    const vehicleAssociations = [];
    Object.entries(qVehicleSelections).forEach(([vId, data]) => {
      if (data?.selected) {
        vehicleAssociations.push({
          option_title: validOptions[0],
          vehicle_id: vId,
          weight: data.weight || 25,
          badge: data.badge || qTitle
        });
      }
    });

    try {
      const payload = {
        category_type: qCategoryType,
        title: qTitle,
        subtitle: qSubtitle,
        select_type: qSelectType,
        order_num: qStep,
        options: validOptions.map(t => ({ title: t, description: '' })),
        vehicle_associations: vehicleAssociations
      };

      if (questionModalMode === 'edit') {
        await adminUpdateQuestionWithRules(editingQuestionId, payload, token);
        showAlert('Soru ve araç eşleşmeleri başarıyla güncellendi.');
      } else {
        await adminCreateQuestionWithRules(payload, token);
        showAlert('Yeni soru ve araç eşleşmeleri başarıyla oluşturuldu.');
      }

      setShowQuestionModal(false);
      const [qData, rData] = await Promise.all([adminGetQuestions(token), adminGetRules(token)]);
      setQuestions(qData.questions || []);
      setRules(rData.rules || []);
    } catch (err) {
      showAlert(err.message || 'Soru kaydedilemedi.', 'error');
    }
  };

  // =========================================================================
  // CATEGORY CRUD: OPEN CREATE / OPEN EDIT / DELETE
  // =========================================================================
  const openCreateCategoryModal = () => {
    setCategoryModalMode('create');
    setEditingCategoryId(null);
    setCatName('');
    setCatColor('#5B8DBF');
    setCatIcon('●');
    setCatVehicleType('binek');
    setCatOptions([]);
    setCatOptionInput('');
    setCatVehicleSelections({});
    setShowCategoryModal(true);
  };

  const openEditCategoryModal = (c) => {
    setCategoryModalMode('edit');
    setEditingCategoryId(c.id);
    setCatName(c.name || '');
    setCatColor(c.color || '#5B8DBF');
    setCatIcon(c.icon || '●');
    setCatVehicleType(c.vehicle_type || 'binek');
    setCatOptions(c.options || []);
    setCatOptionInput('');

    const initialSelections = {};
    const relevantRules = rules.filter(r => r.source_type === 'category' && (r.source_id?.includes(String(c.id)) || r.source_label === c.name || r.reason_badge === c.name));
    relevantRules.forEach(r => {
      initialSelections[r.vehicle_id] = {
        selected: true,
        weight: r.weight,
        badge: r.reason_badge
      };
    });
    setCatVehicleSelections(initialSelections);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = async (id, name) => {
    if (!window.confirm(`"${name}" kategori balonunu ve ilişkili kurallarını silmek istediğinize emin misiniz?`)) {
      return;
    }
    try {
      await adminDeleteCategory(id, token);
      setCategories(prev => prev.filter(c => c.id !== id));
      setRules(prev => prev.filter(r => !r.source_id?.includes(`cat:${id}:`)));
      showAlert('Kategori balonu silindi.');
    } catch (err) {
      showAlert(err.message || 'Kategori silinemedi.', 'error');
    }
  };

  const handleSaveCategory = async (e) => {
    e?.preventDefault();
    if (!catName.trim()) {
      showAlert('Lütfen kategori balonu adını giriniz.', 'error');
      return;
    }

    const vehicleAssociations = [];
    Object.entries(catVehicleSelections).forEach(([vId, data]) => {
      if (data?.selected) {
        vehicleAssociations.push({
          vehicle_id: vId,
          weight: data.weight || 25,
          badge: data.badge || catName,
          label: catName
        });
      }
    });

    try {
      const payload = {
        name: catName,
        color: catColor,
        icon: catIcon,
        vehicle_type: catVehicleType,
        options: catOptions,
        vehicle_associations: vehicleAssociations
      };

      if (categoryModalMode === 'edit') {
        await adminUpdateCategoryWithRules(editingCategoryId, payload, token);
        showAlert('Kategori balonu ve araç kuralları güncellendi.');
      } else {
        await adminCreateCategoryWithRules(payload, token);
        showAlert('Yeni kategori balonu ve araç kuralları oluşturuldu.');
      }

      setShowCategoryModal(false);
      const [cData, rData] = await Promise.all([adminGetCategories(token), adminGetRules(token)]);
      setCategories(cData.categories || []);
      setRules(rData.rules || []);
    } catch (err) {
      showAlert(err.message || 'Kategori kaydedilemedi.', 'error');
    }
  };

  // Format TRY Currency
  const formatPrice = (price) => {
    if (!price) return 'Toyota Yetkili Satıcılarında';
    return price.toLocaleString('tr-TR') + ' ₺';
  };

  // Helpers
  const getRulesForQuestion = (q) => {
    return rules.filter(r => r.source_type === 'question' && (r.source_id?.includes(q.id) || r.reason_badge === q.title));
  };

  const getRulesForCategory = (c) => {
    return rules.filter(r => r.source_type === 'category' && (r.source_id?.includes(String(c.id)) || r.source_label === c.name || r.reason_badge === c.name));
  };

  // Matrix distinct sources
  const matrixSources = [
    { id: 'lifestyle:Şehir Hayatı', label: 'Yaşam: Şehir Hayatı', type: 'question' },
    { id: 'lifestyle:Macera/Doğa Aktiviteleri', label: 'Yaşam: Macera/Doğa', type: 'question' },
    { id: 'lifestyle:Aile ve Çocuklu Yaşam', label: 'Yaşam: Aile & Çocuk', type: 'question' },
    { id: 'seats:1-2 Kişi', label: 'Kapasite: 1-2 Kişi', type: 'question' },
    { id: 'seats:3-4 Kişi', label: 'Kapasite: 3-4 Kişi', type: 'question' },
    { id: 'seats:5 ve üzeri', label: 'Kapasite: 5 ve üzeri', type: 'question' },
    { id: 'cat:0:Dar alanda rahat park', label: 'Balon: Dar Alanda Park', type: 'category' },
    { id: 'cat:1:Uzun yolda konforlu sürüş', label: 'Balon: Uzun Yol Konforu', type: 'category' },
    { id: 'cat:2:Zor arazilerde dayanıklı', label: 'Balon: Zorlu Arazi (4x4)', type: 'category' },
    { id: 'cat:8:Geniş yükleme alanı', label: 'Balon: Geniş Bagaj / Yük', type: 'category' },
    { id: 'cat:9:Yakıt tüketimi', label: 'Balon: Düşük Yakıt (5L altı)', type: 'category' },
    { id: 'cat:10:Elektrikli kullanım desteği (Hibrit)', label: 'Balon: Hibrit Motor', type: 'category' }
  ];

  // -------------------------------------------------------------------------
  // LOGIN SCREEN (TOYOTA TÜRKİYE CLEAN LIGHT MODE)
  // -------------------------------------------------------------------------
  if (!token) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#F7F8FA',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      }}>
        <div style={{
          width: '100%',
          maxWidth: 420,
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E5E7EB',
          padding: '40px 36px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <ToyotaLogo height={32} color="#EB0A1E" />
            <div>
              <h2 style={{ margin: 0, fontSize: 18, color: '#111827', fontWeight: 800, letterSpacing: '-0.3px' }}>
                Toyota Yönetim Portalı
              </h2>
              <span style={{ fontSize: 13, color: '#6B7280' }}>Yetkili Sistem Girişi</span>
            </div>
          </div>

          {loginError && (
            <div style={{
              background: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#B91C1C',
              padding: '12px 14px',
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 20
            }}>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 6 }}>
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  height: 44,
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  color: '#111827',
                  padding: '0 14px',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 6 }}>
                Şifre
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  height: 44,
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: 8,
                  color: '#111827',
                  padding: '0 14px',
                  fontSize: 14,
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 12,
              color: '#6B7280'
            }}>
              Varsayılan Giriş: <strong style={{ color: '#111827' }}>admin</strong> / <strong style={{ color: '#111827' }}>Admin!Toyota2025</strong>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                height: 46,
                background: '#EB0A1E',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: 6
              }}
            >
              {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>

            {onExit && (
              <button
                type="button"
                onClick={onExit}
                style={{
                  height: 36,
                  background: 'transparent',
                  color: '#6B7280',
                  border: 'none',
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                Müşteri Sayfasına Dön
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }

  // Active question list for simulator based on selected category
  const simAvailableQuestions = questions.filter(
    q => q.is_active && q.id !== 'intro' && (q.category_type === simCategory || q.category_type === 'Her İkisi de' || q.category_type === 'all')
  );

  // Active category bubbles for simulator based on vehicle type
  const simTargetVehicleType = simCategory === 'Ticari Araç' ? 'commercial' : 'binek';
  const simAvailableBubbles = categories.filter(
    c => c.is_active && (c.vehicle_type === simTargetVehicleType || !c.vehicle_type)
  );

  // Winner calculation helpers
  const topWinner = simResults && simResults.length > 0 ? simResults[0] : null;
  const secondWinner = simResults && simResults.length > 1 ? simResults[1] : null;
  const winnerBonusCount = topWinner?.breakdown ? topWinner.breakdown.filter(b => b.type !== 'base').length : 0;

  // -------------------------------------------------------------------------
  // MAIN ADMIN INTERFACE
  // -------------------------------------------------------------------------
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F7F8FA',
      color: '#111827',
      display: 'flex',
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
    }}>
      {/* Toast Alert Notification */}
      {alert && (
        <div style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
          background: alert.type === 'error' ? '#EB0A1E' : '#059669',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 8,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          fontSize: 13,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <CheckIcon size={16} color="#fff" />
          <span>{alert.text}</span>
        </div>
      )}

      {/* ----------------- SIDEBAR ----------------- */}
      <aside style={{
        width: 250,
        minWidth: 250,
        flexShrink: 0,
        background: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxSizing: 'border-box',
        zIndex: 40
      }}>
        {/* Brand Header */}
        <div style={{
          padding: '20px 20px',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <ToyotaLogo height={28} color="#EB0A1E" />
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: '#111827', letterSpacing: '-0.3px' }}>Toyota Portal</div>
            <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>Yönetim & Akıllı Motor</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div style={{ padding: '16px 10px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { id: 'dashboard', label: 'Genel Bakış & İstatistikler' },
            { id: 'questions', label: 'Soru Yönetimi', count: questions.length },
            { id: 'categories', label: 'İhtiyaç Balonları & Filtreler', count: categories.length },
            { id: 'vehicles', label: 'Araç Kataloğu & Fiyatlar', count: vehicles.length },
            { id: 'matrix', label: 'Eşleştirme Matrisi', count: rules.length },
            { id: 'simulator', label: 'Canlı Test Odası (Simülatör)' },
            { id: 'leads', label: 'Müşteri Talepleri', count: leads.filter(l => l.status === 'Yeni').length, isBadgeNew: true },
            { id: 'seo', label: 'SEO & Sayfa Ayarları' },
            { id: 'security', label: 'Ekip & Güvenlik' }
          ].map(item => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateToTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: 6,
                  background: isActive ? '#F3F4F6' : 'transparent',
                  color: isActive ? '#111827' : '#4B5563',
                  border: 'none',
                  borderLeft: isActive ? '3px solid #EB0A1E' : '3px solid transparent',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s'
                }}
              >
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span style={{
                    background: item.isBadgeNew && item.count > 0 ? '#EB0A1E' : isActive ? '#E5E7EB' : '#F3F4F6',
                    color: item.isBadgeNew && item.count > 0 ? '#FFFFFF' : '#374151',
                    padding: '2px 7px',
                    borderRadius: 10,
                    fontSize: 11,
                    fontWeight: 700
                  }}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info & Logout */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>admin</div>
              <div style={{ fontSize: 11, color: '#6B7280' }}>Süper Yönetici</div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: '#F3F4F6',
                border: '1px solid #E5E7EB',
                color: '#374151',
                padding: '5px 10px',
                borderRadius: 6,
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Çıkış
            </button>
          </div>

          {onExit && (
            <button
              onClick={onExit}
              style={{
                width: '100%',
                padding: '8px 0',
                background: '#FFFFFF',
                border: '1px solid #D1D5DB',
                borderRadius: 6,
                color: '#111827',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Müşteri Ön Yüzüne Dön
            </button>
          )}
        </div>
      </aside>

      {/* ----------------- MAIN CONTENT AREA ----------------- */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        minWidth: 0,
        overflow: 'hidden',
        background: '#F7F8FA'
      }}>
        {/* Top Navbar */}
        <header style={{
          height: 60,
          minHeight: 60,
          flexShrink: 0,
          background: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          boxSizing: 'border-box',
          zIndex: 30
        }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
            {activeNav === 'dashboard' && 'Genel Bakış & Dönüşüm İstatistikleri'}
            {activeNav === 'questions' && 'Profil Soruları'}
            {activeNav === 'categories' && 'Kategori & Özellik Balonları'}
            {activeNav === 'vehicles' && 'Toyota Araç Kataloğu'}
            {activeNav === 'matrix' && 'Eşleştirme Matrisi'}
            {activeNav === 'simulator' && 'Canlı Simülatör'}
            {activeNav === 'leads' && 'Müşteri Başvuru Talepleri'}
            {activeNav === 'seo' && 'SEO ve Sayfa Ayarları'}
            {activeNav === 'security' && 'Ekip & Sistem Güvenliği'}
          </div>
        </header>

        {/* Page Content Body (Scrollable Content Container) */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '28px',
          boxSizing: 'border-box'
        }}>
          {/* ======================================================== */}
          {/* 0. DASHBOARD & REAL ANALYTICS SECTION                    */}
          {/* ======================================================== */}
          {activeNav === 'dashboard' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Header Action Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #E5E7EB',
                paddingBottom: 14,
                flexWrap: 'wrap',
                gap: 12
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>
                    Ziyaretçi Dönüşüm & Akış Analitikleri
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                    Kullanıcıların hangi soruda kaçıncı saniyede çıktığını, huni kaybını ve en çok eşleşen araçları anlık SQLite verileriyle izleyin.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    type="button"
                    onClick={fetchAnalytics}
                    disabled={loadingAnalytics}
                    style={{
                      background: '#FFFFFF',
                      color: '#374151',
                      border: '1px solid #E5E7EB',
                      padding: '7px 14px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <ArrowRepeatIcon size={13} color="#4B5563" />
                    <span>{loadingAnalytics ? 'Yenileniyor...' : 'Verileri Yenile'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowReportModal(true)}
                    style={{
                      background: '#111827',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '7px 16px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <FileTextIcon size={13} color="#FFFFFF" />
                    <span>Verileri Rapora Dönüştür</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowResetModal(true)}
                    style={{
                      background: '#FEF2F2',
                      color: '#DC2626',
                      border: '1px solid #FCA5A5',
                      padding: '7px 14px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <TrashIcon size={13} color="#DC2626" />
                    <span>Verileri Sıfırla</span>
                  </button>
                </div>

              </div>

              {/* 4 Summary KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 16 }}>
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '18px 20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Toplam Başlayan Oturum
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', margin: '8px 0 4px' }}>
                    {analytics?.summary?.totalSessions ?? 0}
                  </div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>
                    Masaüstü: <b>{analytics?.summary?.desktopCount ?? 0}</b> · Mobil: <b>{analytics?.summary?.mobileCount ?? 0}</b>
                  </div>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '18px 20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Sonuç Görme (Dönüşüm)
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#16A34A', margin: '8px 0 4px' }}>
                    %{analytics?.summary?.resultRate ?? 0}
                  </div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>
                    <b>{analytics?.summary?.resultCount ?? 0}</b> kullanıcı önerilen araç ekranına vardı
                  </div>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '18px 20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    İletişim / Teklif Talebi
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#EB0A1E', margin: '8px 0 4px' }}>
                    %{analytics?.summary?.leadRate ?? 0}
                  </div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>
                    <b>{analytics?.summary?.leadCount ?? 0}</b> kişi yetkili bayiye aranma talebi bıraktı
                  </div>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '18px 20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Ortalama Araç Bulma Süresi
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', margin: '8px 0 4px' }}>
                    {analytics?.summary?.avgResultDuration ? `${analytics.summary.avgResultDuration} sn` : '—'}
                  </div>
                  <div style={{ fontSize: 12, color: '#4B5563' }}>
                    Tüm oturumlar genel ortalaması: <b>{analytics?.summary?.avgDuration ?? 0} sn</b>
                  </div>
                </div>
              </div>

              {/* Main Funnel Drop-off Table */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: 10,
                border: '1px solid #E5E7EB',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div style={{ marginBottom: 16 }}>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#111827' }}>
                    Kullanıcı Akış Hunisi & Adım Bazlı Terk Analizi
                  </h4>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                    Kullanıcıların hangi soruda kaçıncı saniyede sayfadan çıktığı ve adımlardaki ayrılma oranları.
                  </p>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left', color: '#4B5563', fontSize: 12 }}>
                        <th style={{ padding: '10px 12px', fontWeight: 700 }}>Aşama / Adım</th>
                        <th style={{ padding: '10px 12px', fontWeight: 700 }}>Giren Kullanıcı</th>
                        <th style={{ padding: '10px 12px', fontWeight: 700 }}>Sonraki Adıma Geçen</th>
                        <th style={{ padding: '10px 12px', fontWeight: 700 }}>Terk Eden (Çıkış)</th>
                        <th style={{ padding: '10px 12px', fontWeight: 700 }}>Terk Oranı (%)</th>
                        <th style={{ padding: '10px 12px', fontWeight: 700 }}>Ortalama Terk Saniyesi</th>
                        <th style={{ padding: '10px 12px', fontWeight: 700 }}>Adımda Kalma Süresi</th>
                        <th style={{ padding: '10px 12px', fontWeight: 700, width: 140 }}>Huni İlerlemesi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics?.funnel && analytics.funnel.length > 0 ? (
                        analytics.funnel.map((step, idx) => {
                          const totalSess = analytics.summary?.totalSessions || 1;
                          const barPercent = Math.min(100, Math.round((step.visitors / totalSess) * 100));
                          const isHighDropoff = step.dropoffRate > 25;
                          return (
                            <tr key={step.stepId} style={{ borderBottom: '1px solid #F3F4F6' }}>
                              <td style={{ padding: '12px', fontWeight: 700, color: '#111827' }}>
                                <span style={{
                                  display: 'inline-block',
                                  width: 20,
                                  height: 20,
                                  borderRadius: 10,
                                  background: '#F3F4F6',
                                  textAlign: 'center',
                                  lineHeight: '20px',
                                  fontSize: 11,
                                  marginRight: 8,
                                  fontWeight: 800,
                                  color: '#374151'
                                }}>
                                  {idx + 1}
                                </span>
                                {step.label}
                              </td>
                              <td style={{ padding: '12px', color: '#111827', fontWeight: 600 }}>
                                {step.visitors}
                              </td>
                              <td style={{ padding: '12px', color: '#16A34A', fontWeight: 700 }}>
                                {Math.max(0, step.visitors - step.dropoffs)}
                              </td>
                              <td style={{ padding: '12px', color: step.dropoffs > 0 ? '#DC2626' : '#6B7280', fontWeight: step.dropoffs > 0 ? 700 : 500 }}>
                                {step.dropoffs} kişi
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span style={{
                                  padding: '3px 8px',
                                  borderRadius: 12,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  background: step.dropoffs === 0 ? '#F3F4F6' : isHighDropoff ? '#FEE2E2' : '#FEF3C7',
                                  color: step.dropoffs === 0 ? '#6B7280' : isHighDropoff ? '#991B1B' : '#92400E'
                                }}>
                                  %{step.dropoffRate}
                                </span>
                              </td>
                              <td style={{ padding: '12px', color: '#374151', fontWeight: 600 }}>
                                {step.dropoffs > 0 ? (
                                  <span style={{ color: '#DC2626', fontWeight: 700 }}>
                                    Ort. {step.avgDropoffSeconds}. sn
                                  </span>
                                ) : (
                                  <span style={{ color: '#9CA3AF' }}>—</span>
                                )}
                              </td>
                              <td style={{ padding: '12px', color: '#6B7280' }}>
                                {step.avgTimeOnStep > 0 ? `${step.avgTimeOnStep} sn` : '—'}
                              </td>
                              <td style={{ padding: '12px' }}>
                                <div style={{ background: '#E5E7EB', borderRadius: 4, height: 7, overflow: 'hidden' }}>
                                  <div style={{ background: '#EB0A1E', height: '100%', width: `${barPercent}%` }} />
                                </div>
                                <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3 }}>
                                  %{barPercent} kalan kitle
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={8} style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>
                            Henüz ziyaretçi akış verisi kaydedilmedi. Sihirbazı kullanan ziyaretçilerin verileri burada anlık olarak listelenecektir.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2-Column Grid: Top Models & Device Breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
                {/* Top Matched Models */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 800, color: '#111827' }}>
                    En Çok Eşleşen Toyota Modelleri
                  </h4>
                  <p style={{ margin: '0 0 16px', fontSize: 12, color: '#6B7280' }}>
                    Ziyaretçilerin filtre kriterlerine göre en çok önerilen araçlar.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {analytics?.topModels && analytics.topModels.length > 0 ? (
                      analytics.topModels.map(m => (
                        <div key={m.matched_vehicle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#F9FAFB', borderRadius: 6 }}>
                          <span style={{ fontWeight: 700, color: '#111827' }}>{m.matched_vehicle}</span>
                          <span style={{ fontSize: 12, color: '#EB0A1E', fontWeight: 800 }}>{m.count} kez eşleşti</span>
                        </div>
                      ))
                    ) : (
                      <div style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', padding: '16px 0' }}>
                        Henüz araç önerisi tamamlanmış oturum bulunmuyor.
                      </div>
                    )}
                  </div>
                </div>

                {/* Device Breakdown */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 800, color: '#111827' }}>
                    Cihaz & Platform Dağılımı
                  </h4>
                  <p style={{ margin: '0 0 16px', fontSize: 12, color: '#6B7280' }}>
                    Kullanıcıların masaüstü ve mobil cihaz oranları.
                  </p>

                  {(() => {
                    const total = (analytics?.summary?.desktopCount || 0) + (analytics?.summary?.mobileCount || 0);
                    const dPercent = total > 0 ? Math.round(((analytics?.summary?.desktopCount || 0) / total) * 100) : 50;
                    const mPercent = total > 0 ? 100 - dPercent : 50;
                    return (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                          <span style={{ color: '#111827', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <DisplayIcon size={14} color="#111827" /> Masaüstü: %{dPercent} ({analytics?.summary?.desktopCount || 0})
                          </span>
                          <span style={{ color: '#EB0A1E', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <PhoneIcon size={14} color="#EB0A1E" /> Mobil: %{mPercent} ({analytics?.summary?.mobileCount || 0})
                          </span>
                        </div>
                        <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden' }}>
                          <div style={{ width: `${dPercent}%`, background: '#111827' }} />
                          <div style={{ width: `${mPercent}%`, background: '#EB0A1E' }} />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>


              {/* Recent User Sessions Table */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: 10,
                border: '1px solid #E5E7EB',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
              }}>
                <div style={{ marginBottom: 16 }}>
                  <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#111827' }}>
                    Son Gerçek Ziyaretçi Oturumları (Canlı Akış)
                  </h4>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                    SQLite veritabanına anlık düşen tekil oturum kayıtları ve son durumları.
                  </p>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', textAlign: 'left', color: '#4B5563' }}>
                        <th style={{ padding: '8px 12px', fontWeight: 700 }}>Oturum Kodu</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700 }}>Cihaz</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700 }}>Başlangıç Zamanı</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700 }}>Ulaşılan Son Adım</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700 }}>Toplam Süre</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700 }}>Durum</th>
                        <th style={{ padding: '8px 12px', fontWeight: 700 }}>Eşleşen Model</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics?.recentSessions && analytics.recentSessions.length > 0 ? (
                        analytics.recentSessions.map(sess => (
                          <tr key={sess.session_id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                            <td style={{ padding: '10px 12px', fontFamily: 'monospace', color: '#4B5563' }}>
                              {sess.session_id.slice(0, 18)}...
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              <span style={{
                                padding: '2px 8px',
                                borderRadius: 10,
                                fontSize: 11,
                                fontWeight: 700,
                                background: sess.device_type === 'mobile' ? '#FEF2F2' : '#F3F4F6',
                                color: sess.device_type === 'mobile' ? '#DC2626' : '#374151'
                              }}>
                                {sess.device_type === 'mobile' ? 'Mobil' : 'Masaüstü'}
                              </span>
                            </td>
                            <td style={{ padding: '10px 12px', color: '#6B7280' }}>
                              {new Date(sess.started_at).toLocaleString('tr-TR')}
                            </td>
                            <td style={{ padding: '10px 12px', fontWeight: 700, color: '#111827' }}>
                              {sess.last_step_name || sess.last_step}
                            </td>
                            <td style={{ padding: '10px 12px', color: '#4B5563', fontWeight: 600 }}>
                              {sess.total_duration_seconds} sn
                            </td>
                            <td style={{ padding: '10px 12px' }}>
                              {sess.completed_lead ? (
                                <span style={{ color: '#16A34A', fontWeight: 700 }}>Teklif Formu Gönderdi</span>
                              ) : sess.reached_result ? (
                                <span style={{ color: '#2563EB', fontWeight: 700 }}>Sonuç Gördü</span>
                              ) : (
                                <span style={{ color: '#DC2626', fontWeight: 500 }}>Ayrıldı</span>
                              )}
                            </td>
                            <td style={{ padding: '10px 12px', fontWeight: 600, color: '#111827' }}>
                              {sess.matched_vehicle || '—'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: '#9CA3AF' }}>
                            Kayıtlı oturum bulunamadı.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 1. QUESTIONS SECTION                                     */}
          {/* ======================================================== */}
          {activeNav === 'questions' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigateToTab('questions')}
                    style={{
                      background: '#111827',
                      color: '#FFFFFF',
                      border: '1px solid #111827',
                      padding: '7px 16px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Profil Soruları ({questions.length})
                  </button>
                  <button
                    onClick={() => navigateToTab('categories')}
                    style={{
                      background: '#FFFFFF',
                      color: '#4B5563',
                      border: '1px solid #E5E7EB',
                      padding: '7px 16px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Kategori & Özellik Balonları ({categories.length})
                  </button>
                  <button
                    onClick={openCreateQuestionModal}
                    style={{
                      background: '#EB0A1E',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '7px 16px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 1px 3px rgba(235,10,30,0.2)'
                    }}
                  >
                    <PlusIcon size={14} color="#fff" />
                    <span>Yeni Soru Ekle</span>
                  </button>
                </div>
              </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 16 }}>
                  {questions.map((q) => {
                    const qRules = getRulesForQuestion(q);
                    return (
                      <div
                        key={q.id}
                        style={{
                          background: '#FFFFFF',
                          borderRadius: 10,
                          border: '1px solid #E5E7EB',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 14,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                              <span style={{
                                background: '#FEE2E2',
                                color: '#991B1B',
                                padding: '2px 8px',
                                borderRadius: 4,
                                fontSize: 11,
                                fontWeight: 700
                              }}>
                                Aşama {q.order_num}
                              </span>
                              <span style={{
                                background: '#F3F4F6',
                                color: '#4B5563',
                                padding: '2px 8px',
                                borderRadius: 4,
                                fontSize: 11,
                                fontWeight: 600
                              }}>
                                {q.category_type}
                              </span>
                            </div>
                            <h4 style={{ margin: 0, fontSize: 15, color: '#111827', fontWeight: 700 }}>{q.title}</h4>
                            {q.subtitle && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>{q.subtitle}</p>}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              onClick={() => openEditQuestionModal(q)}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #D1D5DB',
                                color: '#374151',
                                padding: '5px 10px',
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              <PencilIcon size={12} color="#374151" />
                              <span>Düzenle</span>
                            </button>

                            <button
                              onClick={() => handleDeleteQuestion(q.id, q.title)}
                              style={{
                                background: '#FEE2E2',
                                border: '1px solid #FECACA',
                                color: '#DC2626',
                                padding: '5px 8px',
                                borderRadius: 6,
                                fontSize: 12,
                                cursor: 'pointer'
                              }}
                            >
                              <TrashIcon size={12} color="#DC2626" />
                            </button>

                            <button
                              onClick={() => handleToggleQ(q.id)}
                              style={{
                                background: q.is_active ? '#DEF7EC' : '#F3F4F6',
                                color: q.is_active ? '#03543F' : '#6B7280',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              {q.is_active ? 'Aktif' : 'Pasif'}
                            </button>
                          </div>
                        </div>

                        <div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: 6 }}>
                            Seçenekler ({q.options?.length || 0})
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {q.options?.map((opt, i) => (
                              <span
                                key={i}
                                style={{
                                  background: '#F9FAFB',
                                  border: '1px solid #E5E7EB',
                                  padding: '4px 8px',
                                  borderRadius: 4,
                                  fontSize: 12,
                                  color: '#374151'
                                }}
                              >
                                {opt.title}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 10 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: 6 }}>
                            Eşleşen Toyota Modelleri:
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {qRules.length > 0 ? (
                              qRules.map((r, ri) => (
                                <span
                                  key={ri}
                                  style={{
                                    background: '#FEE2E2',
                                    border: '1px solid #FECACA',
                                    color: '#991B1B',
                                    padding: '3px 8px',
                                    borderRadius: 4,
                                    fontSize: 11,
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6
                                  }}
                                >
                                  <strong>{r.vehicle_id.toUpperCase()}</strong>
                                  <span style={{ color: '#047857', fontWeight: 800 }}>+{r.weight}p</span>
                                </span>
                              ))
                            ) : (
                              <span style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>
                                Doğrudan kural atanmamış
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 1.1 CATEGORIES & FILTER BUBBLES SECTION                 */}
          {/* ======================================================== */}
          {activeNav === 'categories' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => navigateToTab('questions')}
                    style={{
                      background: '#FFFFFF',
                      color: '#4B5563',
                      border: '1px solid #E5E7EB',
                      padding: '7px 16px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Profil Soruları ({questions.length})
                  </button>
                  <button
                    onClick={() => navigateToTab('categories')}
                    style={{
                      background: '#111827',
                      color: '#FFFFFF',
                      border: '1px solid #111827',
                      padding: '7px 16px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Kategori & Özellik Balonları ({categories.length})
                  </button>
                  <button
                    onClick={openCreateCategoryModal}
                    style={{
                      background: '#EB0A1E',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '7px 16px',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      boxShadow: '0 1px 3px rgba(235,10,30,0.2)'
                    }}
                  >
                    <PlusIcon size={14} color="#fff" />
                    <span>Yeni Balon Ekle</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
                  {categories.map((c) => {
                    const cRules = getRulesForCategory(c);
                    return (
                      <div
                        key={c.id}
                        style={{
                          background: '#FFFFFF',
                          borderRadius: 10,
                          border: '1px solid #E5E7EB',
                          padding: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 12,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              background: c.color || '#5B8DBF',
                              display: 'inline-block'
                            }} />
                            <div>
                              <h4 style={{ margin: 0, fontSize: 15, color: '#111827', fontWeight: 700 }}>{c.name}</h4>
                              <span style={{ fontSize: 11, color: '#6B7280' }}>Tip: {c.vehicle_type}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              onClick={() => openEditCategoryModal(c)}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #D1D5DB',
                                color: '#374151',
                                padding: '5px 10px',
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              <PencilIcon size={12} color="#374151" />
                              <span>Düzenle</span>
                            </button>

                            <button
                              onClick={() => handleDeleteCategory(c.id, c.name)}
                              style={{
                                background: '#FEE2E2',
                                border: '1px solid #FECACA',
                                color: '#DC2626',
                                padding: '5px 8px',
                                borderRadius: 6,
                                fontSize: 12,
                                cursor: 'pointer'
                              }}
                            >
                              <TrashIcon size={12} color="#DC2626" />
                            </button>

                            <button
                              onClick={() => handleToggleCat(c.id)}
                              style={{
                                background: c.is_active ? '#DEF7EC' : '#F3F4F6',
                                color: c.is_active ? '#03543F' : '#6B7280',
                                border: 'none',
                                padding: '5px 10px',
                                borderRadius: 6,
                                fontSize: 11,
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              {c.is_active ? 'Aktif' : 'Pasif'}
                            </button>
                          </div>
                        </div>

                        {c.options?.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {c.options.map((opt, oi) => (
                              <span
                                key={oi}
                                style={{
                                  background: '#F9FAFB',
                                  border: '1px solid #E5E7EB',
                                  padding: '3px 7px',
                                  borderRadius: 4,
                                  fontSize: 11,
                                  color: '#4B5563'
                                }}
                              >
                                {opt}
                              </span>
                            ))}
                          </div>
                        )}

                        <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 10 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: 6 }}>
                            Eşleşen Araçlar & Puanları:
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {cRules.length > 0 ? (
                              cRules.map((r, ri) => (
                                <span
                                  key={ri}
                                  style={{
                                    background: '#F3F4F6',
                                    border: '1px solid #E5E7EB',
                                    color: '#111827',
                                    padding: '3px 7px',
                                    borderRadius: 4,
                                    fontSize: 11,
                                    fontWeight: 600
                                  }}
                                >
                                  <strong>{r.vehicle_id.toUpperCase()}</strong> (+{r.weight}p)
                                </span>
                              ))
                            ) : (
                              <span style={{ fontSize: 11, color: '#9CA3AF', fontStyle: 'italic' }}>
                                Genel filtreleme
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. TOYOTA VEHICLES SECTION                               */}
          {/* ======================================================== */}
          {activeNav === 'vehicles' && (
            <div>
              <div style={{
                background: '#FFFFFF',
                borderRadius: 10,
                border: '1px solid #E5E7EB',
                padding: '16px 20px',
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, color: '#111827', fontWeight: 700 }}>
                    Toyota Türkiye Resmi Cardb & Fiyat Listesi
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                    Tüm başlangıç fiyatları, motor tipleri ve 360° stüdyo görselleri resmi Toyota API servisinden anlık alınır. Manuel fiyat girişi kapalıdır.
                  </p>
                </div>

                <button
                  onClick={handleToyotaSync}
                  disabled={syncing}
                  style={{
                    background: '#EB0A1E',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <ArrowRepeatIcon size={14} color="#fff" />
                  <span>{syncing ? 'Senkronize Ediliyor...' : 'Toyota API ile Senkronize Et'}</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {vehicles.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 12,
                      border: '1px solid #E5E7EB',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                    }}
                  >
                    <div style={{
                      height: 180,
                      background: '#F9FAFB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 16,
                      position: 'relative'
                    }}>
                      <img
                        src={v.cardb_image || DEFAULT_CAR_FALLBACK}
                        alt={v.name}
                        onError={handleImgError}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        color: '#374151',
                        padding: '2px 8px',
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 700
                      }}>
                        {v.type === 'binek' ? 'BİNEK' : 'TİCARİ'} • {v.segment || 'MODEL'}
                      </span>

                      <button
                        onClick={() => handleToggleV(v.id)}
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: v.is_active ? '#DEF7EC' : '#F3F4F6',
                          color: v.is_active ? '#03543F' : '#6B7280',
                          border: 'none',
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {v.is_active ? 'Aktif' : 'Pasif'}
                      </button>
                    </div>

                    <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>{v.name}</h4>
                        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          <span style={{
                            background: '#FEE2E2',
                            color: '#991B1B',
                            padding: '2px 6px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 700
                          }}>
                            {v.powertrain || 'Hibrit'}
                          </span>
                          <span style={{
                            background: '#F3F4F6',
                            color: '#4B5563',
                            padding: '2px 6px',
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 600
                          }}>
                            {v.specs?.bodyType || 'Kasa'}
                          </span>
                        </div>
                      </div>

                      <div style={{
                        background: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: 8,
                        padding: '10px 12px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                          <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>Tavsiye Edilen Başlangıç Fiyatı</span>
                          <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>✓ Resmi Toyota API</span>
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>
                          {formatPrice(v.starting_price)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3. MATCHING MATRIX SECTION                               */}
          {/* ======================================================== */}
          {activeNav === 'matrix' && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>
                  Akıllı Eşleştirme Matrisi (Ağırlık Motoru)
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                  Hücreye tıklayarak sorunun veya balonun ilgili Toyota modeline ekleyeceği puanı ve neden rozetini güncelleyebilirsiniz.
                </p>
              </div>

              <div style={{
                background: '#FFFFFF',
                borderRadius: 10,
                border: '1px solid #E5E7EB',
                overflowX: 'auto',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                      <th style={{ padding: '12px 16px', minWidth: 240, color: '#374151', fontWeight: 700 }}>
                        Soru / Balon Kaynağı
                      </th>
                      {vehicles.slice(0, 8).map(v => (
                        <th key={v.id} style={{ padding: '10px 12px', textAlign: 'center', minWidth: 90, color: '#111827', fontWeight: 700 }}>
                          <div>{v.name}</div>
                          <div style={{ fontSize: 10, color: '#6B7280', fontWeight: 500 }}>{v.type}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrixSources.map((src, sIdx) => (
                      <tr
                        key={src.id}
                        style={{
                          borderBottom: '1px solid #F3F4F6',
                          background: sIdx % 2 === 0 ? '#FFFFFF' : '#FAFAFA'
                        }}
                      >
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>
                          <span style={{
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: src.type === 'question' ? '#EB0A1E' : '#3B82F6',
                            marginRight: 8
                          }} />
                          {src.label}
                        </td>

                        {vehicles.slice(0, 8).map(v => {
                          const existingRule = rules.find(r => r.source_id === src.id && r.vehicle_id === v.id);
                          const w = existingRule?.weight || 0;

                          return (
                            <td
                              key={v.id}
                              onClick={() => {
                                setActiveCell({
                                  source_id: src.id,
                                  source_label: src.label,
                                  source_type: src.type,
                                  vehicle_id: v.id,
                                  vehicle_name: v.name
                                });
                                setCellWeight(w || 25);
                                setCellBadge(existingRule?.reason_badge || '');
                              }}
                              style={{
                                padding: '8px 12px',
                                textAlign: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              {w > 0 ? (
                                <span style={{
                                  background: w >= 30 ? '#FEE2E2' : '#DEF7EC',
                                  color: w >= 30 ? '#991B1B' : '#03543F',
                                  padding: '3px 6px',
                                  borderRadius: 4,
                                  fontSize: 11,
                                  fontWeight: 800
                                }}>
                                  +{w}p
                                </span>
                              ) : (
                                <span style={{ color: '#D1D5DB' }}>—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 4. CANLI TEST ODASI (SIMULATOR & SKOR ANALİZÖRÜ)        */}
          {/* ======================================================== */}
          {/* ======================================================== */}
          {/* 4. CANLI TEST ODASI (SIMULATOR & SKOR ANALİZÖRÜ)        */}
          {/* ======================================================== */}
          {activeNav === 'simulator' && (
            <div>
              {/* Guidance Banner & Quick Preset Scenarios */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: 12,
                border: '1px solid #E5E7EB',
                padding: '20px 24px',
                marginBottom: 20,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ maxWidth: 850 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{
                        background: '#FEE2E2',
                        color: '#EB0A1E',
                        fontSize: 11,
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 4,
                        letterSpacing: '0.5px'
                      }}>
                        CANLI TEST LABORATUVARI
                      </span>
                      <span style={{ fontSize: 13, color: '#6B7280' }}>
                        Gerçek Ziyaretçi Deneyimi & Algoritma Skor Analizörü
                      </span>
                    </div>
                    <h3 style={{ margin: 0, fontSize: 18, color: '#111827', fontWeight: 800 }}>
                      Kullanıcı Seçimleri Modelleri Nasıl Sıralıyor?
                    </h3>
                    <p style={{ margin: '6px 0 0', fontSize: 13, color: '#4B5563', lineHeight: 1.6 }}>
                      Web sitenize gelen müşterinin seçimlerini simüle edin. Sol panelden soru yanıtlarını ve balonları işaretledikçe; sağ panelde <strong>her modelin hangi kuraldan kaç puan alarak kaçıncı sıraya yerleştiğini</strong> ve lider modelin neden kazandığını canlı olarak izleyin.
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button
                      onClick={handleResetSimulator}
                      style={{
                        background: '#F3F4F6',
                        border: '1px solid #D1D5DB',
                        color: '#374151',
                        padding: '8px 16px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Seçimleri Sıfırla
                    </button>
                  </div>
                </div>

                {/* Quick Presets Bar (Tek Tıkla Hazır Müşteri Profilleri) */}
                <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', marginBottom: 10 }}>
                    Tek Tıkla Hazır Müşteri Profili Test Et:
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {SIM_PRESETS.map((p) => {
                      const isActive = simCategory === p.category &&
                        p.answers.every(a => simAnswers.includes(a)) &&
                        p.bubbles.every(b => simSelectedBubbles.includes(b));

                      return (
                        <button
                          key={p.id}
                          onClick={() => handleApplyPreset(p)}
                          style={{
                            background: isActive ? '#111827' : '#F9FAFB',
                            color: isActive ? '#FFFFFF' : '#1F2937',
                            border: `1px solid ${isActive ? '#111827' : '#E5E7EB'}`,
                            padding: '8px 14px',
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            transition: 'all 0.15s'
                          }}
                        >
                          <span>{p.title}</span>
                          <span style={{
                            background: isActive ? 'rgba(255,255,255,0.2)' : '#E5E7EB',
                            color: isActive ? '#FFFFFF' : '#4B5563',
                            fontSize: 11,
                            padding: '1px 6px',
                            borderRadius: 4,
                            fontWeight: 600
                          }}>
                            {p.expected}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main Grid: Left Selection Panel vs Right Analysis Panel */}
              <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 20, alignItems: 'start' }}>
                {/* ----------------- LEFT: ZİYARETÇİ SEÇİMLERİ ----------------- */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 12,
                  border: '1px solid #E5E7EB',
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20
                }}>
                  {/* Step 1: Vehicle Type */}
                  <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#EB0A1E', letterSpacing: '0.5px' }}>
                        1. ADIM
                      </span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>Zorunlu Başlangıç</span>
                    </div>
                    <h4 style={{ margin: '0 0 10px', fontSize: 14, color: '#111827', fontWeight: 800 }}>
                      Araç Kullanım Amacı
                    </h4>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {['Binek Araç', 'Ticari Araç'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => handleSimCategoryChange(cat)}
                          style={{
                            flex: 1,
                            padding: '10px 0',
                            borderRadius: 8,
                            background: simCategory === cat ? '#EB0A1E' : '#F3F4F6',
                            color: simCategory === cat ? '#FFFFFF' : '#374151',
                            border: 'none',
                            fontSize: 13,
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            transition: 'all 0.15s'
                          }}
                        >
                          {simCategory === cat && <CheckIcon size={14} color="#fff" />}
                          <span>{cat}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Profile Questions */}
                  <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#EB0A1E', letterSpacing: '0.5px' }}>
                        2. ADIM: PROFİL SORULARI ({simAvailableQuestions.length} Soru)
                      </span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>
                        {simAnswers.length} Seçili
                      </span>
                    </div>
                    <p style={{ margin: '0 0 14px', fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
                      Müşterinin seçeceği şıkları tıklayarak aktif edin:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      {simAvailableQuestions.map((q) => (
                        <div key={q.id} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '12px 14px' }}>
                          <div style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>{q.title}</span>
                          </div>

                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {q.options?.map((opt, oi) => {
                              const isSelected = simAnswers.includes(opt.title);
                              return (
                                <button
                                  key={oi}
                                  onClick={() => handleToggleSimAnswer(opt.title)}
                                  style={{
                                    padding: '7px 12px',
                                    borderRadius: 6,
                                    background: isSelected ? '#EB0A1E' : '#FFFFFF',
                                    color: isSelected ? '#FFFFFF' : '#374151',
                                    border: isSelected ? '1px solid #EB0A1E' : '1px solid #D1D5DB',
                                    fontSize: 12,
                                    fontWeight: isSelected ? 800 : 500,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    boxShadow: isSelected ? '0 2px 4px rgba(235,10,30,0.2)' : 'none',
                                    transition: 'all 0.15s'
                                  }}
                                >
                                  {isSelected && <CheckIcon size={12} color="#fff" />}
                                  <span>{opt.title}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Bubbles */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#EB0A1E', letterSpacing: '0.5px' }}>
                        3. ADIM: İHTİYAÇ BALONLARI ({simAvailableBubbles.length} Balon)
                      </span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>
                        {simSelectedBubbles.length} Seçili
                      </span>
                    </div>
                    <p style={{ margin: '0 0 12px', fontSize: 12, color: '#6B7280', lineHeight: 1.4 }}>
                      Müşterinin işaretlediği donanım ve konfor özellikleri:
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {simAvailableBubbles.map((c) => {
                        const isSelected = simSelectedBubbles.includes(c.name);
                        return (
                          <button
                            key={c.id}
                            onClick={() => handleToggleSimBubble(c.name)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 20,
                              background: isSelected ? '#111827' : '#FFFFFF',
                              color: isSelected ? '#FFFFFF' : '#374151',
                              border: isSelected ? '1px solid #111827' : '1px solid #D1D5DB',
                              fontSize: 12,
                              fontWeight: isSelected ? 800 : 500,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6,
                              boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
                              transition: 'all 0.15s'
                            }}
                          >
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color || '#5B8DBF' }} />
                            <span>{c.name}</span>
                            {isSelected && <CheckIcon size={12} color="#fff" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ----------------- RIGHT: CANLI PUANLAMA & VİTRİN ----------------- */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* View Mode Toggle Header */}
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: 10,
                    border: '1px solid #E5E7EB',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 12
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#111827' }}>Görünüm Modu:</span>
                      <button
                        onClick={() => setSimViewMode('breakdown')}
                        style={{
                          background: simViewMode === 'breakdown' ? '#111827' : '#F3F4F6',
                          color: simViewMode === 'breakdown' ? '#FFFFFF' : '#374151',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        <i className="bi bi-calculator me-1"></i>
                        <span>Algoritma & Puan Müfettişi</span>
                      </button>
                      <button
                        onClick={() => setSimViewMode('preview')}
                        style={{
                          background: simViewMode === 'preview' ? '#EB0A1E' : '#F3F4F6',
                          color: simViewMode === 'preview' ? '#FFFFFF' : '#374151',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <i className="bi bi-display me-1"></i>
                        <span>Müşteri Arayüzü Önizleme</span>
                      </button>
                    </div>

                    <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>
                      {simCalculating ? 'Hesaplanıyor...' : `${simResults?.length || 0} Model Puanlandı`}
                    </div>
                  </div>

                  {/* Active Criteria Pills */}
                  <div style={{
                    background: '#FFFFFF',
                    borderRadius: 10,
                    border: '1px solid #E5E7EB',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase' }}>
                      Müşterinin Seçtikleri ({simAnswers.length + simSelectedBubbles.length}):
                    </span>
                    {simAnswers.map((a, i) => (
                      <span key={i} style={{ background: '#FEE2E2', color: '#991B1B', padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                        {a}
                      </span>
                    ))}
                    {simSelectedBubbles.map((b, i) => (
                      <span key={i} style={{ background: '#EFF6FF', color: '#1E40AF', padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                        {b}
                      </span>
                    ))}
                    {simAnswers.length === 0 && simSelectedBubbles.length === 0 && (
                      <span style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>Hiçbir kriter seçilmedi (Yalnızca taban 50p geçerli)</span>
                    )}
                  </div>

                  {/* WINNER EXECUTIVE SUMMARY CARD */}
                  {topWinner && (
                    <div style={{
                      background: '#F0FDF4',
                      border: '1px solid #86EFAC',
                      borderRadius: 10,
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      flexWrap: 'wrap'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <img
                          src={topWinner.cardb_image || DEFAULT_CAR_FALLBACK}
                          alt={topWinner.name}
                          onError={handleImgError}
                          style={{ width: 88, height: 52, objectFit: 'contain' }}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{
                              background: '#16A34A',
                              color: '#FFFFFF',
                              fontSize: 11,
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: 4
                            }}>
                              1. SIRADA ÖNERİLEN MODEL
                            </span>
                            <span style={{ fontSize: 16, fontWeight: 900, color: '#166534' }}>
                              {topWinner.name}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, color: '#15803D', lineHeight: 1.5 }}>
                            <strong>Algoritmanın Karar Gerekçesi:</strong> Bu model, müşterinin yaptığı seçimlerden{' '}
                            <strong>{winnerBonusCount} kural eşleşmesi</strong> yakalayarak toplam <strong>{topWinner.score} puana</strong> ve{' '}
                            <strong>%{topWinner.matchPercent} uyuma</strong> ulaştı.{' '}
                            {secondWinner && (
                              <span>En yakın rakibi {secondWinner.name} ({secondWinner.score} puan) modeline {topWinner.score - secondWinner.score} puan fark attı.</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 24, fontWeight: 900, color: '#16A34A' }}>
                          %{topWinner.matchPercent}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#15803D' }}>
                          Toplam: {topWinner.score} Puan
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB CONTENT: BREAKDOWN vs PREVIEW */}
                  {simViewMode === 'breakdown' && (
                    <>
                      {/* VISUAL SCORE COMPARISON BAR CHART (LEADERBOARD) */}
                      <div style={{
                        background: '#FFFFFF',
                        borderRadius: 10,
                        border: '1px solid #E5E7EB',
                        padding: '18px 20px'
                      }}>
                        <div style={{ fontSize: 12, fontWeight: 800, color: '#111827', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <i className="bi bi-bar-chart-line" style={{ color: '#EB0A1E' }}></i>
                          <span>Canlı Sıralama & Puan Kıyaslama Grafiği</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                          {simResults?.map((res, idx) => {
                            const isFirst = idx === 0;
                            const isSecond = idx === 1;
                            const maxScore = simResults[0]?.score || 100;
                            const barPercent = Math.min(100, Math.max(15, Math.round((res.score / maxScore) * 100)));

                            return (
                              <div key={res.id} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 90px 80px', alignItems: 'center', gap: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: '50%',
                                    background: isFirst ? '#EB0A1E' : isSecond ? '#111827' : '#F3F4F6',
                                    color: isFirst || isSecond ? '#FFFFFF' : '#4B5563',
                                    fontSize: 11,
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}>
                                    {idx + 1}
                                  </span>
                                  <span style={{ fontSize: 13, fontWeight: isFirst ? 800 : 600, color: '#111827' }}>
                                    {res.name}
                                  </span>
                                </div>

                                {/* Progress Bar */}
                                <div style={{ background: '#F3F4F6', borderRadius: 6, height: 14, overflow: 'hidden' }}>
                                  <div
                                    style={{
                                      width: `${barPercent}%`,
                                      height: '100%',
                                      background: isFirst ? 'linear-gradient(90deg, #EB0A1E, #F87171)' : isSecond ? '#374151' : '#9CA3AF',
                                      borderRadius: 6,
                                      transition: 'width 0.3s ease'
                                    }}
                                  />
                                </div>

                                <div style={{ textAlign: 'right', fontSize: 12, fontWeight: 800, color: '#111827' }}>
                                  {res.score} Puan
                                </div>

                                <div style={{ textAlign: 'right', fontSize: 13, fontWeight: 900, color: isFirst ? '#EB0A1E' : '#059669' }}>
                                  %{res.matchPercent}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* DETAILED X-RAY POINT COMPASS CARDS */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {simResults?.map((res, idx) => {
                          const isTop1 = idx === 0;
                          const isTop2 = idx === 1;

                          return (
                            <div
                              key={res.id}
                              style={{
                                background: '#FFFFFF',
                                borderRadius: 10,
                                border: `1px solid ${isTop1 ? '#EB0A1E' : '#E5E7EB'}`,
                                padding: '18px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 14,
                                boxShadow: isTop1 ? '0 4px 14px rgba(235,10,30,0.08)' : 'none'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                  <span style={{
                                    background: isTop1 ? '#EB0A1E' : isTop2 ? '#111827' : '#F3F4F6',
                                    color: isTop1 || isTop2 ? '#FFFFFF' : '#4B5563',
                                    padding: '4px 10px',
                                    borderRadius: 6,
                                    fontSize: 12,
                                    fontWeight: 800
                                  }}>
                                    {idx + 1}. SIRA {isTop1 ? '• EN ÇOK ÖNERİLEN' : isTop2 ? '• ALTERNATİF MODEL' : ''}
                                  </span>

                                  <img
                                    src={res.cardb_image || DEFAULT_CAR_FALLBACK}
                                    alt={res.name}
                                    onError={handleImgError}
                                    style={{ width: 64, height: 40, objectFit: 'contain' }}
                                  />

                                  <div>
                                    <h4 style={{ margin: 0, fontSize: 15, color: '#111827', fontWeight: 800 }}>{res.name}</h4>
                                    <span style={{ fontSize: 12, color: '#6B7280' }}>
                                      {res.powertrain || 'Hibrit'} • {formatPrice(res.starting_price)}
                                    </span>
                                  </div>
                                </div>

                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontSize: 20, fontWeight: 900, color: isTop1 ? '#EB0A1E' : '#059669' }}>
                                    %{res.matchPercent || 85} Uyum
                                  </div>
                                  <span style={{
                                    background: '#F3F4F6',
                                    color: '#111827',
                                    padding: '2px 8px',
                                    borderRadius: 4,
                                    fontSize: 11,
                                    fontWeight: 700
                                  }}>
                                    Toplam: {res.score || 50} Puan
                                  </span>
                                </div>
                              </div>

                              {/* Mathematical Score Breakdown (Transparent Analysis) */}
                              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '12px 16px' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', marginBottom: 8 }}>
                                  Puanın Hesaplanma Mantığı (Adım Adım):
                                </div>

                                {res.breakdown && res.breakdown.length > 0 ? (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {res.breakdown.map((item, bIdx) => (
                                      <div
                                        key={bIdx}
                                        style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          fontSize: 12
                                        }}
                                      >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                          <span style={{
                                            color: '#059669',
                                            fontWeight: 800,
                                            background: '#DEF7EC',
                                            padding: '1px 6px',
                                            borderRadius: 4
                                          }}>
                                            +{item.points}p
                                          </span>
                                          <span style={{ color: '#111827', fontWeight: 600 }}>{item.label}</span>
                                          {item.badge && item.badge !== item.label && (
                                            <span style={{ color: '#6B7280', fontSize: 11 }}>({item.badge})</span>
                                          )}
                                        </div>

                                        <span style={{ fontSize: 11, color: '#9CA3AF' }}>
                                          {item.type === 'base' ? 'Taban Başlangıç' : item.type === 'question' ? 'Soru Kuralı' : item.type === 'category' ? 'Balon Kuralı' : 'Donanım Uyum'}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div style={{ fontSize: 12, color: '#6B7280' }}>
                                    Seçilen kriterlerden bu modele ekstra puan eklenmedi (Sadece taban puan 50p).
                                  </div>
                                )}
                              </div>

                              {/* Badges Earned */}
                              {res.reasons && res.reasons.length > 0 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase' }}>
                                    Neden Rozetleri:
                                  </span>
                                  {res.reasons.map((r, ri) => (
                                    <span
                                      key={ri}
                                      style={{
                                        background: '#F3F4F6',
                                        border: '1px solid #E5E7EB',
                                        color: '#111827',
                                        padding: '2px 8px',
                                        borderRadius: 4,
                                        fontSize: 11,
                                        fontWeight: 600
                                      }}
                                    >
                                      {r}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {/* PREVIEW MODE: MÜŞTERİNİN WEB SİTESİNDE GÖRECEĞİ VİTRİN */}
                  {simViewMode === 'preview' && (
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: 12,
                      border: '1px solid #E5E7EB',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 24
                    }}>
                      <div style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: 16 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#EB0A1E', letterSpacing: '0.5px' }}>
                          WEB SİTESİ CANLI VİTRİNİ
                        </span>
                        <h3 style={{ margin: '4px 0 0', fontSize: 20, color: '#111827', fontWeight: 900 }}>
                          Sizin İçin En İdeal Toyota Modelleri
                        </h3>
                        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6B7280' }}>
                          Yapılan seçimlere göre eşleştirilen sonuç sayfası önizlemesi:
                        </p>
                      </div>

                      {topWinner && (
                        <div style={{
                          background: '#FFFFFF',
                          border: '2px solid #EB0A1E',
                          borderRadius: 12,
                          padding: '24px',
                          display: 'grid',
                          gridTemplateColumns: '1fr 340px',
                          gap: 24,
                          boxShadow: '0 8px 24px rgba(235,10,30,0.08)'
                        }}>
                          <div>
                            <div style={{ display: 'inline-block', background: '#EB0A1E', color: '#FFFFFF', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 800, marginBottom: 12 }}>
                              1. TERCİH • %{topWinner.matchPercent} EŞLEŞME ORANI
                            </div>
                            <h2 style={{ margin: 0, fontSize: 28, color: '#111827', fontWeight: 900 }}>
                              {topWinner.name}
                            </h2>
                            <div style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
                              {topWinner.powertrain || 'Akıllı Hibrit Teknolojisi'}
                            </div>

                            <div style={{ margin: '16px 0', fontSize: 22, fontWeight: 900, color: '#111827' }}>
                              {formatPrice(topWinner.starting_price)} <span style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>'den başlayan fiyatlarla</span>
                            </div>

                            <div style={{ marginTop: 16 }}>
                              <div style={{ fontSize: 12, fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: 8 }}>
                                Neden Bu Model Sizin İçin İdeal?
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {topWinner.reasons?.map((r, i) => (
                                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#111827' }}>
                                    <span style={{ color: '#059669', fontWeight: 800 }}>✓</span>
                                    <span>{r}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                              <button style={{
                                background: '#EB0A1E',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '12px 20px',
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}>
                                Yetkili Satıcıdan Teklif Al
                              </button>
                              <button style={{
                                background: '#111827',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '12px 20px',
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 800,
                                cursor: 'pointer'
                              }}>
                                Test Sürüşü Randevusu
                              </button>
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                              src={topWinner.cardb_image || DEFAULT_CAR_FALLBACK}
                              alt={topWinner.name}
                              onError={handleImgError}
                              style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }}
                            />
                            <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: '#9CA3AF' }}>
                              Resmi Toyota Cardb 3D Stüdyo Modeli
                            </div>
                          </div>
                        </div>
                      )}

                      {secondWinner && (
                        <div style={{
                          background: '#F9FAFB',
                          border: '1px solid #E5E7EB',
                          borderRadius: 10,
                          padding: '18px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 20
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                            <img
                              src={secondWinner.cardb_image || DEFAULT_CAR_FALLBACK}
                              alt={secondWinner.name}
                              onError={handleImgError}
                              style={{ width: 120, height: 70, objectFit: 'contain' }}
                            />
                            <div>
                              <div style={{ display: 'inline-block', background: '#374151', color: '#FFFFFF', padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>
                                2. ALTERNATİF MODEL • %{secondWinner.matchPercent} UYUM
                              </div>
                              <h4 style={{ margin: 0, fontSize: 18, color: '#111827', fontWeight: 800 }}>
                                {secondWinner.name}
                              </h4>
                              <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
                                {secondWinner.powertrain || 'Hibrit'} • {formatPrice(secondWinner.starting_price)}
                              </div>
                            </div>
                          </div>

                          <button style={{
                            background: '#FFFFFF',
                            border: '1px solid #D1D5DB',
                            color: '#111827',
                            padding: '10px 18px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}>
                            Modeli İncele
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 5. LEADS MANAGEMENT SECTION                              */}
          {/* ======================================================== */}
          {activeNav === 'leads' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>
                    Müşteri Başvuru Talepleri
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                    Testi tamamlayıp bayiden teklif veya aranma talep eden müşteriler.
                  </p>
                </div>

                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700
                }}>
                  Toplam {leads.length} Talep
                </div>
              </div>

              <div style={{
                background: '#FFFFFF',
                borderRadius: 10,
                border: '1px solid #E5E7EB',
                overflow: 'hidden'
              }}>
                {leads.length === 0 ? (
                  <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF' }}>
                    Henüz kayıtlı müşteri talebi bulunmuyor.
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                        <th style={{ padding: '12px 16px', color: '#4B5563' }}>Müşteri Adı</th>
                        <th style={{ padding: '12px 16px', color: '#4B5563' }}>İletişim</th>
                        <th style={{ padding: '12px 16px', color: '#4B5563' }}>İlgilenilen Model</th>
                        <th style={{ padding: '12px 16px', color: '#4B5563' }}>Tarih</th>
                        <th style={{ padding: '12px 16px', color: '#4B5563' }}>Durum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((l) => {
                        const modelName = l.preferred_model || l.preferredModel || l.matched_model || l.matchedModel || l.vehicle_name || l.vehicle_id || 'Model Belirtilmedi';
                        const customerName = l.full_name || l.fullName || 'Ziyaretçi';
                        const leadDate = l.created_at || l.createdAt ? new Date(l.created_at || l.createdAt).toLocaleString('tr-TR') : '-';

                        return (
                          <tr key={l.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                            <td style={{ padding: '12px 16px', fontWeight: 700, color: '#111827' }}>
                              {customerName}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#4B5563' }}>
                              <div>{l.phone}</div>
                              {l.email && <div style={{ fontSize: 11, color: '#9CA3AF' }}>{l.email}</div>}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#111827', fontWeight: 600 }}>
                              <span style={{
                                background: '#FEE2E2',
                                color: '#991B1B',
                                padding: '4px 8px',
                                borderRadius: 4,
                                fontSize: 12,
                                fontWeight: 700,
                                display: 'inline-block'
                              }}>
                                {modelName}
                              </span>
                              {l.notes && (
                                <div style={{ fontSize: 11, color: '#6B7280', marginTop: 4, maxWidth: 320, whiteSpace: 'normal', lineHeight: 1.4 }}>
                                  {l.notes}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '12px 16px', color: '#6B7280', fontSize: 12 }}>
                              {leadDate}
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              <select
                                value={l.status || 'Yeni'}
                                onChange={(e) => handleStatusChange(l.id, e.target.value)}
                                style={{
                                  background: '#FFFFFF',
                                  border: '1px solid #D1D5DB',
                                  color: '#111827',
                                  padding: '4px 8px',
                                  borderRadius: 6,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="Yeni">Yeni</option>
                                <option value="Arandı">Arandı</option>
                                <option value="Görüşüldü">Görüşüldü</option>
                                <option value="Tamamlandı">Tamamlandı</option>
                              </select>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 6. SEO & SITE SETTINGS SECTION                           */}
          {/* ======================================================== */}
          {activeNav === 'seo' && (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: 12, marginBottom: 20 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>
                    SEO ve Sayfa Ayarları
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                    Marka logosu, favicon, renk paleti, arama motoru meta etiketleri ve özel kod entegrasyonu.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  style={{
                    background: '#EB0A1E',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <i className="bi bi-check2"></i>
                  <span>{savingSettings ? 'Kaydediliyor...' : 'Tüm Ayarları Kaydet'}</span>
                </button>
              </div>

              <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* 1. Sihirbaz / Sayfa Durumu Yönetimi (Açık / Kapalı) */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 14, color: '#111827', fontWeight: 800 }}>
                        Sihirbaz & Sayfa Durumu (Açık / Kapalı)
                      </h4>
                      <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                        Sayfayı geçici olarak bakıma alabilir, ilk açılış sayfasındaki "Aracınızı Bulalım" butonunu devre dışı bırakabilirsiniz.
                      </p>
                    </div>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 700,
                      background: settings.wizard_status === 'closed' ? '#FEE2E2' : '#DCFCE7',
                      color: settings.wizard_status === 'closed' ? '#991B1B' : '#166534'
                    }}>
                      {settings.wizard_status === 'closed' ? 'Hizmete Kapalı (Bakım Modu)' : 'Yayında (Aktif)'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                    <button
                      type="button"
                      onClick={() => setSettings({ ...settings, wizard_status: 'open' })}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: 8,
                        border: settings.wizard_status !== 'closed' ? '2px solid #16A34A' : '1px solid #E5E7EB',
                        background: settings.wizard_status !== 'closed' ? '#F0FDF4' : '#FFFFFF',
                        color: settings.wizard_status !== 'closed' ? '#166534' : '#4B5563',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <i className="bi bi-check-circle-fill" style={{ color: settings.wizard_status !== 'closed' ? '#16A34A' : '#9CA3AF' }}></i>
                      <span>Sihirbaz Açık (Normal Çalışma)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSettings({ ...settings, wizard_status: 'closed' })}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        borderRadius: 8,
                        border: settings.wizard_status === 'closed' ? '2px solid #DC2626' : '1px solid #E5E7EB',
                        background: settings.wizard_status === 'closed' ? '#FEF2F2' : '#FFFFFF',
                        color: settings.wizard_status === 'closed' ? '#991B1B' : '#4B5563',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <i className="bi bi-x-circle-fill" style={{ color: settings.wizard_status === 'closed' ? '#DC2626' : '#9CA3AF' }}></i>
                      <span>Sihirbaz Kapalı (Bakım / Pasif)</span>
                    </button>
                  </div>

                  {settings.wizard_status === 'closed' && (
                    <div style={{ marginTop: 14, background: '#F9FAFB', padding: 14, borderRadius: 8, border: '1px solid #E5E7EB' }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                        Ziyaretçiye Gösterilecek Kapalı Durum Açıklama Metni
                      </label>
                      <textarea
                        value={settings.wizard_closed_message ?? 'Toyota Araç Seçici sihirbazımız şu anda güncelleme ve bakım nedeniyle geçici olarak kapalıdır. Anlayışınız için teşekkür ederiz.'}
                        onChange={(e) => setSettings({ ...settings, wizard_closed_message: e.target.value })}
                        rows={3}
                        placeholder="Ziyaretçiye gösterilecek açıklama..."
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: 6,
                          border: '1px solid #D1D5DB',
                          fontSize: 13,
                          color: '#111827',
                          outline: 'none',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                      <p style={{ margin: '6px 0 0', fontSize: 11, color: '#DC2626', fontWeight: 600 }}>
                        ⚠️ Kapalı durumdayken ilk sayfadaki "Aracınızı Bulalım" butonu devre dışı bırakılır, tıklanamaz hale gelir ve bu açıklama ziyaretçiye gösterilir.
                      </p>
                    </div>
                  )}
                </div>

                {/* 2-Column Grid for Brand & SEO */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 20 }}>
                  
                  {/* Left Column: Brand, Logo & Theme */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Marka & Logo Yönetimi */}
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: 10,
                      border: '1px solid #E5E7EB',
                      padding: '20px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <i className="bi bi-image" style={{ color: '#EB0A1E', fontSize: 16 }}></i>
                        <h4 style={{ margin: 0, fontSize: 14, color: '#111827', fontWeight: 800 }}>
                          Marka ve Logo Yönetimi
                        </h4>
                      </div>

                      {/* File Upload Box for Logo */}
                      <input
                        type="file"
                        ref={logoFileRef}
                        onChange={(e) => handleFileUpload(e, 'logo')}
                        accept=".svg,.png,.jpg,.jpeg,.webp"
                        style={{ display: 'none' }}
                      />

                      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 16 }}>
                        {/* Live Preview Box */}
                        <div style={{
                          width: 140,
                          height: 70,
                          border: '1px dashed #D1D5DB',
                          borderRadius: 8,
                          background: '#F9FAFB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 8,
                          flexShrink: 0
                        }}>
                          {settings.site_logo ? (
                            <img
                              src={settings.site_logo}
                              alt="Logo"
                              style={{ maxHeight: 42, maxWidth: '100%', objectFit: 'contain' }}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <ToyotaLogo height={28} />
                          )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <button
                            type="button"
                            onClick={() => logoFileRef.current?.click()}
                            disabled={uploadingLogo}
                            style={{
                              background: '#111827',
                              color: '#FFFFFF',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6
                            }}
                          >
                            <i className="bi bi-cloud-arrow-up"></i>
                            <span>{uploadingLogo ? 'Yükleniyor...' : 'Logo Yükle (SVG / PNG)'}</span>
                          </button>
                          <span style={{ fontSize: 11, color: '#6B7280' }}>
                            Ön yüz üst barında gösterilecek resmi kurumsal logo.
                          </span>
                        </div>
                      </div>

                      {/* Quick Presets & Manual URL */}
                      <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#4B5563', marginBottom: 6 }}>
                          Hazır Toyota Logoları:
                        </label>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => setSettings({ ...settings, site_logo: '/official_figma_toyota_logo.svg' })}
                            style={{
                              background: settings.site_logo === '/official_figma_toyota_logo.svg' ? '#FEF2F2' : '#F9FAFB',
                              border: `1px solid ${settings.site_logo === '/official_figma_toyota_logo.svg' ? '#EB0A1E' : '#E5E7EB'}`,
                              borderRadius: 6,
                              padding: '6px 12px',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: '#111827'
                            }}
                          >
                            Toyota Kırmızı Logo
                          </button>
                          <button
                            type="button"
                            onClick={() => setSettings({ ...settings, site_logo: '/toyota_real_logo.svg' })}
                            style={{
                              background: settings.site_logo === '/toyota_real_logo.svg' ? '#FEF2F2' : '#F9FAFB',
                              border: `1px solid ${settings.site_logo === '/toyota_real_logo.svg' ? '#EB0A1E' : '#E5E7EB'}`,
                              borderRadius: 6,
                              padding: '6px 12px',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              color: '#111827'
                            }}
                          >
                            Toyota Siyah / Krom Logo
                          </button>
                        </div>
                      </div>

                      {/* Favicon Upload */}
                      <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                          <i className="bi bi-browser-chrome" style={{ color: '#4B5563' }}></i>
                          <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', margin: 0 }}>
                            Favicon (Tarayıcı Sekme İkonu)
                          </label>
                        </div>

                        <input
                          type="file"
                          ref={faviconFileRef}
                          onChange={(e) => handleFileUpload(e, 'favicon')}
                          accept=".ico,.png,.svg"
                          style={{ display: 'none' }}
                        />

                        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                          <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: 6,
                            border: '1px solid #E5E7EB',
                            background: '#F9FAFB',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {settings.site_favicon ? (
                              <img src={settings.site_favicon} alt="Favicon" style={{ width: 20, height: 20, objectFit: 'contain' }} />
                            ) : (
                              <span style={{ fontSize: 11, color: '#9CA3AF' }}>ICO</span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => faviconFileRef.current?.click()}
                            disabled={uploadingFavicon}
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #D1D5DB',
                              color: '#374151',
                              padding: '6px 14px',
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 6
                            }}
                          >
                            <i className="bi bi-cloud-arrow-up"></i>
                            <span>{uploadingFavicon ? 'Yükleniyor...' : 'Favicon Yükle (.ico / .png / .svg)'}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Tema ve Duyuru Bandı */}
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: 10,
                      border: '1px solid #E5E7EB',
                      padding: '20px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <i className="bi bi-palette" style={{ color: '#EB0A1E', fontSize: 16 }}></i>
                        <h4 style={{ margin: 0, fontSize: 14, color: '#111827', fontWeight: 800 }}>
                          Görsel Tema & Üst Duyuru Bandı
                        </h4>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 6 }}>
                            Vurgu Rengi (Primary Accent)
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <input
                              type="color"
                              value={settings.primary_color || '#EB0A1E'}
                              onChange={e => setSettings({ ...settings, primary_color: e.target.value })}
                              style={{ width: 40, height: 36, padding: 2, border: '1px solid #D1D5DB', borderRadius: 6, cursor: 'pointer', background: '#fff' }}
                            />
                            <input
                              type="text"
                              value={settings.primary_color || '#EB0A1E'}
                              onChange={e => setSettings({ ...settings, primary_color: e.target.value })}
                              placeholder="#EB0A1E"
                              style={{ width: 100, height: 36, padding: '0 10px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: 13, fontWeight: 700 }}
                            />
                            <div style={{ display: 'flex', gap: 6 }}>
                              {['#EB0A1E', '#111827', '#003B71', '#2563EB'].map(c => (
                                <span
                                  key={c}
                                  onClick={() => setSettings({ ...settings, primary_color: c })}
                                  style={{
                                    width: 22,
                                    height: 22,
                                    borderRadius: '50%',
                                    background: c,
                                    cursor: 'pointer',
                                    border: '2px solid #FFFFFF',
                                    boxShadow: '0 0 0 1px #D1D5DB'
                                  }}
                                  title={c}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 6 }}>
                            Üst Kampanya / Duyuru Bandı Metni
                          </label>
                          <input
                            type="text"
                            value={settings.announcement_banner || ''}
                            onChange={e => setSettings({ ...settings, announcement_banner: e.target.value })}
                            placeholder="Örn: Yeni Hibrit Modellerimizde 0 Faiz Fırsatı!"
                            style={{
                              width: '100%',
                              height: 38,
                              padding: '0 12px',
                              borderRadius: 6,
                              border: '1px solid #D1D5DB',
                              fontSize: 12,
                              color: '#111827',
                              boxSizing: 'border-box'
                            }}
                          />
                          <span style={{ fontSize: 11, color: '#6B7280', marginTop: 4, display: 'block' }}>
                            Boş bırakılırsa üst duyuru bandı müşteri ekranında gizlenir.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: SEO Meta & Analytics */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Google Snippet Preview */}
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: 10,
                      border: '1px solid #E5E7EB',
                      padding: '16px 20px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: 8 }}>
                        Google Arama Önizlemesi:
                      </div>
                      <div style={{ fontFamily: 'arial, sans-serif' }}>
                        <div style={{ fontSize: 12, color: '#202124', marginBottom: 2 }}>
                          {settings.canonical_url || 'https://toyota.com.tr/arac-bulucu'}
                        </div>
                        <div style={{ fontSize: 16, color: '#1a0dab', fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>
                          {settings.meta_title || 'Size Uygun Toyota Hangisi? | Araç Filtreleme'}
                        </div>
                        <div style={{ fontSize: 12, color: '#4d5156', lineHeight: 1.4 }}>
                          {settings.meta_description || 'Birkaç kısa soruyla ihtiyaçlarınıza en uygun Toyota modelini birlikte bulalım.'}
                        </div>
                      </div>
                    </div>

                    {/* SEO Metadata Form */}
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: 10,
                      border: '1px solid #E5E7EB',
                      padding: '20px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 14
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <i className="bi bi-search" style={{ color: '#EB0A1E', fontSize: 15 }}></i>
                        <h4 style={{ margin: 0, fontSize: 14, color: '#111827', fontWeight: 800 }}>
                          Arama Motoru Meta Bilgileri
                        </h4>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 6 }}>
                          Sayfa Başlığı (Meta Title)
                        </label>
                        <input
                          type="text"
                          value={settings.meta_title || ''}
                          onChange={e => setSettings({ ...settings, meta_title: e.target.value })}
                          style={{
                            width: '100%',
                            height: 38,
                            padding: '0 12px',
                            borderRadius: 6,
                            border: '1px solid #D1D5DB',
                            fontSize: 13,
                            color: '#111827',
                            boxSizing: 'border-box'
                          }}
                        />
                        <span style={{ fontSize: 11, color: '#6B7280', marginTop: 4, display: 'block' }}>
                          Önerilen: 50-60 karakter ({settings.meta_title?.length || 0} karakter)
                        </span>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 6 }}>
                          Meta Açıklaması (Meta Description)
                        </label>
                        <textarea
                          rows={3}
                          value={settings.meta_description || ''}
                          onChange={e => setSettings({ ...settings, meta_description: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: 6,
                            border: '1px solid #D1D5DB',
                            fontSize: 12,
                            color: '#111827',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                            lineHeight: 1.4
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 6 }}>
                          Canonical URL
                        </label>
                        <input
                          type="text"
                          value={settings.canonical_url || ''}
                          onChange={e => setSettings({ ...settings, canonical_url: e.target.value })}
                          placeholder="https://toyota.com.tr/arac-bulucu"
                          style={{
                            width: '100%',
                            height: 36,
                            padding: '0 12px',
                            borderRadius: 6,
                            border: '1px solid #D1D5DB',
                            fontSize: 12,
                            color: '#111827',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>

                    {/* Analitik & Takip Kodları */}
                    <div style={{
                      background: '#FFFFFF',
                      borderRadius: 10,
                      border: '1px solid #E5E7EB',
                      padding: '20px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <i className="bi bi-graph-up" style={{ color: '#EB0A1E', fontSize: 15 }}></i>
                        <h4 style={{ margin: 0, fontSize: 14, color: '#111827', fontWeight: 800 }}>
                          Analitik & Takip Entegrasyonları
                        </h4>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                        <div>
                          <label style={{ display: 'block', fontSize: 11, color: '#4B5563', fontWeight: 700, marginBottom: 4 }}>
                            Google Tag Manager ID
                          </label>
                          <input
                            type="text"
                            value={settings.gtm_id || ''}
                            onChange={e => setSettings({ ...settings, gtm_id: e.target.value })}
                            placeholder="GTM-XXXXXXX"
                            style={{
                              width: '100%',
                              height: 36,
                              padding: '0 10px',
                              borderRadius: 6,
                              border: '1px solid #D1D5DB',
                              fontSize: 12,
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: 11, color: '#4B5563', fontWeight: 700, marginBottom: 4 }}>
                            Google Analytics 4 ID
                          </label>
                          <input
                            type="text"
                            value={settings.ga4_id || ''}
                            onChange={e => setSettings({ ...settings, ga4_id: e.target.value })}
                            placeholder="G-XXXXXXXXXX"
                            style={{
                              width: '100%',
                              height: 36,
                              padding: '0 10px',
                              borderRadius: 6,
                              border: '1px solid #D1D5DB',
                              fontSize: 12,
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: 11, color: '#4B5563', fontWeight: 700, marginBottom: 4 }}>
                            Meta (Facebook) Pixel ID
                          </label>
                          <input
                            type="text"
                            value={settings.pixel_id || ''}
                            onChange={e => setSettings({ ...settings, pixel_id: e.target.value })}
                            placeholder="XXXXXXXXXXXXXXX"
                            style={{
                              width: '100%',
                              height: 36,
                              padding: '0 10px',
                              borderRadius: 6,
                              border: '1px solid #D1D5DB',
                              fontSize: 12,
                              boxSizing: 'border-box'
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full-width Advanced Code Section */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}>
                  <div
                    onClick={() => setShowAdvancedCode(!showAdvancedCode)}
                    style={{
                      padding: '16px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: showAdvancedCode ? '#F9FAFB' : '#FFFFFF',
                      borderBottom: showAdvancedCode ? '1px solid #E5E7EB' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <i className="bi bi-code-slash" style={{ fontSize: 18, color: '#EB0A1E' }}></i>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>
                          Gelişmiş: Ön Yüze Özel CSS ve JavaScript Entegrasyonu
                        </div>
                        <div style={{ fontSize: 11, color: '#6B7280' }}>
                          Müşteri sayfalarına doğrudan stil veya script (canlı destek, takip kodu) enjekte edin.
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#4B5563' }}>
                      {showAdvancedCode ? 'Kapat ▲' : 'Kod Alanlarını Aç ▼'}
                    </span>
                  </div>

                  {showAdvancedCode && (
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <label style={{ fontSize: 12, color: '#111827', fontWeight: 700 }}>
                            Özel CSS Kodu (Custom CSS)
                          </label>
                          <span style={{ fontSize: 11, color: '#6B7280' }}>
                            (Müşteri ekranının &lt;head&gt; bölümüne otomatik enjekte edilir)
                          </span>
                        </div>
                        <textarea
                          rows={6}
                          value={settings.custom_css || ''}
                          onChange={e => setSettings({ ...settings, custom_css: e.target.value })}
                          placeholder="/* Özel CSS kuralları */&#10;.header-custom { background: #000; }&#10;body { font-size: 14px; }"
                          style={{
                            width: '100%',
                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                            fontSize: 12,
                            background: '#1E1E1E',
                            color: '#4ADE80',
                            border: '1px solid #374151',
                            borderRadius: 6,
                            padding: '12px',
                            boxSizing: 'border-box',
                            lineHeight: 1.5,
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                          <label style={{ fontSize: 12, color: '#111827', fontWeight: 700 }}>
                            Özel JavaScript & Takip Kodu (Custom JS)
                          </label>
                          <span style={{ fontSize: 11, color: '#6B7280' }}>
                            (Canlı destek, WhatsApp widget'ı veya analiz kodları)
                          </span>
                        </div>
                        <textarea
                          rows={6}
                          value={settings.custom_js || ''}
                          onChange={e => setSettings({ ...settings, custom_js: e.target.value })}
                          placeholder="// Özel JavaScript kodları&#10;console.log('Sayfa yüklendi');"
                          style={{
                            width: '100%',
                            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                            fontSize: 12,
                            background: '#1E1E1E',
                            color: '#38BDF8',
                            border: '1px solid #374151',
                            borderRadius: 6,
                            padding: '12px',
                            boxSizing: 'border-box',
                            lineHeight: 1.5,
                            resize: 'vertical'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* 7. SECURITY & TEAM SECTION                               */}
          {/* ======================================================== */}
          {activeNav === 'security' && (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E5E7EB', paddingBottom: 12, marginBottom: 20 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>
                    Ekip & Sistem Güvenliği
                  </h3>
                  <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                    Yönetim paneline erişecek yetkili ekip üyeleri, roller ve şifre yönetimi.
                  </p>
                </div>

                <button
                  onClick={openCreateUserModal}
                  style={{
                    background: '#EB0A1E',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <PlusIcon size={14} color="#fff" />
                  <span>Yeni Ekip Üyesi Ekle</span>
                </button>
              </div>

              {/* 2-Column Responsive Layout: Team Members (left) & Change Password (right) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: 20, alignItems: 'start' }}>
                
                {/* Ekip Üyeleri Listesi */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, borderBottom: '1px solid #F3F4F6', paddingBottom: 12 }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: 14, color: '#111827', fontWeight: 700 }}>
                        Kayıtlı Ekip Üyeleri ({users.length})
                      </h4>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>
                        Panel erişimi tanımlanmış kullanıcılar ve yetki seviyeleri.
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {users.map(u => {
                      const isSelf = currentUserId === u.id;
                      const roleLabel = u.role === 'admin' 
                        ? 'Süper Yönetici' 
                        : u.role === 'editor' 
                        ? 'İçerik Editörü' 
                        : 'Gözlemci';
                      const roleIcon = u.role === 'admin'
                        ? 'bi bi-shield-lock'
                        : u.role === 'editor'
                        ? 'bi bi-pencil-square'
                        : 'bi bi-eye';
                      const roleBg = u.role === 'admin' 
                        ? '#FEE2E2' 
                        : u.role === 'editor' 
                        ? '#DBEAFE' 
                        : '#F3F4F6';
                      const roleColor = u.role === 'admin' 
                        ? '#991B1B' 
                        : u.role === 'editor' 
                        ? '#1E40AF' 
                        : '#374151';

                      return (
                        <div
                          key={u.id}
                          style={{
                            background: '#F9FAFB',
                            border: '1px solid #E5E7EB',
                            padding: '12px 14px',
                            borderRadius: 8,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 12,
                            flexWrap: 'wrap'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              background: u.role === 'admin' ? '#EB0A1E' : '#2563EB',
                              color: '#FFFFFF',
                              fontWeight: 800,
                              fontSize: 13,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textTransform: 'uppercase'
                            }}>
                              {u.username.slice(0, 2)}
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <strong style={{ fontSize: 13, color: '#111827' }}>
                                  {u.full_name || u.username}
                                </strong>
                                {isSelf && (
                                  <span style={{ background: '#E0E7FF', color: '#4338CA', padding: '1px 6px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                                    Siz
                                  </span>
                                )}
                                <span style={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  background: u.is_active ? '#10B981' : '#9CA3AF'
                                }} title={u.is_active ? 'Aktif' : 'Pasif'} />
                              </div>
                              <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                                @{u.username} • Kayıt: {new Date(u.created_at).toLocaleDateString('tr-TR')}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{
                              background: roleBg,
                              color: roleColor,
                              padding: '3px 8px',
                              borderRadius: 4,
                              fontSize: 11,
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4
                            }}>
                              <i className={roleIcon}></i>
                              {roleLabel}
                            </span>

                            <button
                              onClick={() => openEditUserModal(u)}
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid #D1D5DB',
                                color: '#374151',
                                padding: '5px 10px',
                                borderRadius: 5,
                                fontSize: 12,
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}
                            >
                              <PencilIcon size={12} color="#374151" />
                              <span>Yetki</span>
                            </button>

                            {!isSelf && (
                              <button
                                onClick={() => handleDeleteUser(u.id, u.username)}
                                style={{
                                  background: '#FEE2E2',
                                  border: '1px solid #FECACA',
                                  color: '#DC2626',
                                  padding: '5px 8px',
                                  borderRadius: 5,
                                  fontSize: 12,
                                  cursor: 'pointer'
                                }}
                                title="Kullanıcıyı Sil"
                              >
                                <TrashIcon size={12} color="#DC2626" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Kendi Şifrenizi Değiştirin */}
                <form onSubmit={handleChangePassword} style={{
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #E5E7EB',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ borderBottom: '1px solid #F3F4F6', paddingBottom: 12 }}>
                    <h4 style={{ margin: 0, fontSize: 14, color: '#111827', fontWeight: 700 }}>
                      Kendi Yönetici Şifrenizi Değiştirin
                    </h4>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>
                      Mevcut şifrenizi doğrulayarak yeni şifre belirleyin.
                    </span>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#374151', fontWeight: 600, marginBottom: 4 }}>
                      Mevcut Şifre *
                    </label>
                    <input
                      type="password"
                      value={currentPwd}
                      onChange={e => setCurrentPwd(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        height: 38,
                        background: '#FFFFFF',
                        border: '1px solid #D1D5DB',
                        borderRadius: 6,
                        color: '#111827',
                        padding: '0 10px',
                        fontSize: 13,
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: '#374151', fontWeight: 600, marginBottom: 4 }}>
                        Yeni Şifre *
                      </label>
                      <input
                        type="password"
                        value={newPwd}
                        onChange={e => setNewPwd(e.target.value)}
                        required
                        placeholder="En az 6 karakter"
                        style={{
                          width: '100%',
                          height: 38,
                          background: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: 6,
                          color: '#111827',
                          padding: '0 10px',
                          fontSize: 13,
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 11, color: '#374151', fontWeight: 600, marginBottom: 4 }}>
                        Yeni Şifre Tekrar *
                      </label>
                      <input
                        type="password"
                        value={confirmPwd}
                        onChange={e => setConfirmPwd(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          height: 38,
                          background: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: 6,
                          color: '#111827',
                          padding: '0 10px',
                          fontSize: 13,
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={pwdLoading}
                    style={{
                      height: 38,
                      background: '#EB0A1E',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                      padding: '0 18px',
                      marginTop: 4
                    }}
                  >
                    {pwdLoading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: QUESTION CREATE OR EDIT (WITH VEHICLE MAPPING)   */}
      {/* ======================================================== */}
      {showQuestionModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            width: '100%',
            maxWidth: 750,
            maxHeight: '90vh',
            background: '#FFFFFF',
            borderRadius: 14,
            border: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>
                  {questionModalMode === 'edit' ? 'Soruyu ve Araç Eşleştirmelerini Düzenle' : 'Yeni Soru ve Araç Eşleştirmesi Ekle'}
                </h3>
                <span style={{ fontSize: 12, color: '#6B7280' }}>
                  Soru detaylarını ve bu soruya yanıt verildiğinde öne çıkacak Toyota modellerini belirleyin.
                </span>
              </div>
              <button
                onClick={() => setShowQuestionModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 4 }}
              >
                <CloseIcon size={18} color="#6B7280" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                  Soru Başlığı *
                </label>
                <input
                  type="text"
                  value={qTitle}
                  onChange={e => setQTitle(e.target.value)}
                  placeholder="Örn: Hafta sonları araçla nereye gidersiniz?"
                  required
                  style={{
                    width: '100%',
                    height: 40,
                    background: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    borderRadius: 6,
                    color: '#111827',
                    padding: '0 12px',
                    fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                    Alt Başlık / İpucu
                  </label>
                  <input
                    type="text"
                    value={qSubtitle}
                    onChange={e => setQSubtitle(e.target.value)}
                    placeholder="Örn: İdeal kasa tipini belirler."
                    style={{
                      width: '100%',
                      height: 38,
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 6,
                      color: '#111827',
                      padding: '0 10px',
                      fontSize: 12,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                    Kategori Türü
                  </label>
                  <select
                    value={qCategoryType}
                    onChange={e => setQCategoryType(e.target.value)}
                    style={{
                      width: '100%',
                      height: 38,
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 6,
                      color: '#111827',
                      padding: '0 8px',
                      fontSize: 12
                    }}
                  >
                    <option value="Binek Araç">Binek Araç</option>
                    <option value="Ticari Araç">Ticari Araç</option>
                    <option value="Her İkisi de">Her İkisi de</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                    Aşama (Adım)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={qStep}
                    onChange={e => setQStep(parseInt(e.target.value, 10))}
                    style={{
                      width: '100%',
                      height: 38,
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 6,
                      color: '#111827',
                      padding: '0 10px',
                      fontSize: 12,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 12, color: '#374151', fontWeight: 700 }}>
                    Seçenekler ({qOptions.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setQOptions([...qOptions, ''])}
                    style={{
                      background: '#F3F4F6',
                      border: '1px solid #D1D5DB',
                      color: '#374151',
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    + Seçenek Ekle
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {qOptions.map((opt, i) => (
                    <div key={i} style={{ display: 'flex', gap: 6 }}>
                      <input
                        type="text"
                        value={opt}
                        onChange={e => {
                          const updated = [...qOptions];
                          updated[i] = e.target.value;
                          setQOptions(updated);
                        }}
                        placeholder={`Seçenek ${i + 1}`}
                        style={{
                          flex: 1,
                          height: 36,
                          background: '#FFFFFF',
                          border: '1px solid #D1D5DB',
                          borderRadius: 6,
                          color: '#111827',
                          padding: '0 10px',
                          fontSize: 13
                        }}
                      />
                      {qOptions.length > 2 && (
                        <button
                          type="button"
                          onClick={() => setQOptions(qOptions.filter((_, idx) => idx !== i))}
                          style={{
                            background: '#FEE2E2',
                            border: '1px solid #FECACA',
                            color: '#DC2626',
                            padding: '0 10px',
                            borderRadius: 6,
                            cursor: 'pointer'
                          }}
                        >
                          <TrashIcon size={12} color="#DC2626" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: 8,
                padding: '16px'
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 4 }}>
                  Bu Soru İle Eşleşecek Toyota Modellerini Seçin
                </div>
                <p style={{ margin: '0 0 12px', fontSize: 11, color: '#6B7280' }}>
                  Aşağıdaki araçlardan bu soruyu seçen müşterilere önerilecek olanları işaretleyin ve puanlarını belirleyin.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 8 }}>
                  {vehicles.map(v => {
                    const sel = qVehicleSelections[v.id] || { selected: false, weight: 25, badge: '' };
                    return (
                      <div
                        key={v.id}
                        style={{
                          background: sel.selected ? '#FEE2E2' : '#FFFFFF',
                          border: `1px solid ${sel.selected ? '#FECACA' : '#E5E7EB'}`,
                          borderRadius: 6,
                          padding: '8px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 6
                        }}
                      >
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={sel.selected}
                            onChange={e => {
                              setQVehicleSelections({
                                ...qVehicleSelections,
                                [v.id]: { ...sel, selected: e.target.checked }
                              });
                            }}
                          />
                          <img src={v.cardb_image || DEFAULT_CAR_FALLBACK} alt={v.name} onError={handleImgError} style={{ width: 40, height: 24, objectFit: 'contain' }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{v.name}</span>
                        </label>

                        {sel.selected && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                            <select
                              value={sel.weight}
                              onChange={e => {
                                setQVehicleSelections({
                                  ...qVehicleSelections,
                                  [v.id]: { ...sel, weight: parseInt(e.target.value, 10) }
                                });
                              }}
                              style={{
                                flex: 1,
                                height: 26,
                                background: '#FFFFFF',
                                border: '1px solid #D1D5DB',
                                borderRadius: 4,
                                color: '#111827',
                                fontSize: 11,
                                fontWeight: 700,
                                padding: '0 4px'
                              }}
                            >
                              <option value={15}>+15p (Hafif Uyum)</option>
                              <option value={25}>+25p (Yüksek Uyum)</option>
                              <option value={35}>+35p (En İyi Seçim)</option>
                            </select>

                            <input
                              type="text"
                              value={sel.badge}
                              placeholder="Rozet"
                              onChange={e => {
                                setQVehicleSelections({
                                  ...qVehicleSelections,
                                  [v.id]: { ...sel, badge: e.target.value }
                                });
                              }}
                              style={{
                                width: 90,
                                height: 26,
                                background: '#FFFFFF',
                                border: '1px solid #D1D5DB',
                                borderRadius: 4,
                                color: '#111827',
                                fontSize: 11,
                                padding: '0 6px'
                              }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                <button
                  type="button"
                  onClick={() => setShowQuestionModal(false)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    color: '#4B5563',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  İptal
                </button>

                <button
                  type="submit"
                  style={{
                    background: '#EB0A1E',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {questionModalMode === 'edit' ? 'Değişiklikleri Kaydet' : 'Soruyu ve Eşleştirmeleri Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: CATEGORY CREATE OR EDIT (WITH VEHICLE MAPPING) */}
      {/* ======================================================== */}
      {showCategoryModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            width: '100%',
            maxWidth: 700,
            maxHeight: '90vh',
            background: '#FFFFFF',
            borderRadius: 14,
            border: '1px solid #E5E7EB',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, color: '#111827', fontWeight: 800 }}>
                  {categoryModalMode === 'edit' ? 'Kategori Balonunu Düzenle' : 'Yeni Kategori Balonu Ekle'}
                </h3>
                <span style={{ fontSize: 12, color: '#6B7280' }}>
                  Filtre balonunu ve seçildiğinde puan kazanacak Toyota modellerini belirleyin.
                </span>
              </div>
              <button
                onClick={() => setShowCategoryModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', padding: 4 }}
              >
                <CloseIcon size={18} color="#6B7280" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                  Balon Başlığı / Özellik Adı *
                </label>
                <input
                  type="text"
                  value={catName}
                  onChange={e => setCatName(e.target.value)}
                  placeholder="Örn: Sessiz Hibrit Sürüş, Geniş Bagaj Hacmi..."
                  required
                  style={{
                    width: '100%',
                    height: 40,
                    background: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    borderRadius: 6,
                    color: '#111827',
                    padding: '0 12px',
                    fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                    Balon Rengi
                  </label>
                  <input
                    type="color"
                    value={catColor}
                    onChange={e => setCatColor(e.target.value)}
                    style={{
                      width: '100%',
                      height: 38,
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 6,
                      padding: '2px',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                    Araç Grubu
                  </label>
                  <select
                    value={catVehicleType}
                    onChange={e => setCatVehicleType(e.target.value)}
                    style={{
                      width: '100%',
                      height: 38,
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 6,
                      color: '#111827',
                      padding: '0 10px',
                      fontSize: 12
                    }}
                  >
                    <option value="binek">Binek Araçlar</option>
                    <option value="ticari">Ticari Araçlar</option>
                    <option value="all">Tüm Araçlar</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                  Alt Seçenekler (Varsa)
                </label>
                <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <input
                    type="text"
                    value={catOptionInput}
                    onChange={e => setCatOptionInput(e.target.value)}
                    placeholder="Seçenek yazıp ekle'ye basın"
                    style={{
                      flex: 1,
                      height: 36,
                      background: '#FFFFFF',
                      border: '1px solid #D1D5DB',
                      borderRadius: 6,
                      color: '#111827',
                      padding: '0 10px',
                      fontSize: 12
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (catOptionInput.trim()) {
                        setCatOptions([...catOptions, catOptionInput.trim()]);
                        setCatOptionInput('');
                      }
                    }}
                    style={{
                      background: '#111827',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '0 14px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Ekle
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {catOptions.map((opt, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#F3F4F6',
                        border: '1px solid #E5E7EB',
                        padding: '3px 8px',
                        borderRadius: 4,
                        fontSize: 12,
                        color: '#111827',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      {opt}
                      <span
                        onClick={() => setCatOptions(catOptions.filter((_, idx) => idx !== i))}
                        style={{ cursor: 'pointer', color: '#DC2626', fontWeight: 800 }}
                      >
                        ✕
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                background: '#F9FAFB',
                border: '1px solid #E5E7EB',
                borderRadius: 8,
                padding: '16px'
              }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#111827', marginBottom: 4 }}>
                  Bu Balon Seçildiğinde Öne Çıkacak Toyota Modelleri
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8, marginTop: 8 }}>
                  {vehicles.map(v => {
                    const sel = catVehicleSelections[v.id] || { selected: false, weight: 25, badge: '' };
                    return (
                      <div
                        key={v.id}
                        style={{
                          background: sel.selected ? '#EFF6FF' : '#FFFFFF',
                          border: `1px solid ${sel.selected ? '#BFDBFE' : '#E5E7EB'}`,
                          borderRadius: 6,
                          padding: '8px 10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 4
                        }}
                      >
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={sel.selected}
                            onChange={e => {
                              setCatVehicleSelections({
                                ...catVehicleSelections,
                                [v.id]: { ...sel, selected: e.target.checked }
                              });
                            }}
                          />
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{v.name}</span>
                        </label>

                        {sel.selected && (
                          <select
                            value={sel.weight}
                            onChange={e => {
                              setCatVehicleSelections({
                                ...catVehicleSelections,
                                [v.id]: { ...sel, weight: parseInt(e.target.value, 10) }
                              });
                            }}
                            style={{
                              height: 24,
                              background: '#FFFFFF',
                              border: '1px solid #D1D5DB',
                              borderRadius: 4,
                              color: '#111827',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '0 4px',
                              marginTop: 2
                            }}
                          >
                            <option value={15}>+15p (Hafif Uyum)</option>
                            <option value={25}>+25p (Yüksek Uyum)</option>
                            <option value={35}>+35p (En İyi Seçim)</option>
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                <button
                  type="button"
                  onClick={() => setShowCategoryModal(false)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    color: '#4B5563',
                    padding: '8px 16px',
                    borderRadius: 6,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  İptal
                </button>

                <button
                  type="submit"
                  style={{
                    background: '#EB0A1E',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {categoryModalMode === 'edit' ? 'Değişiklikleri Kaydet' : 'Balonu ve Eşleştirmeleri Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: MATRIX CELL EDITOR                              */}
      {/* ======================================================== */}
      {activeCell && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            width: '100%',
            maxWidth: 380,
            background: '#FFFFFF',
            borderRadius: 12,
            border: '1px solid #E5E7EB',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
          }}>
            <h4 style={{ margin: 0, fontSize: 15, color: '#111827', fontWeight: 800 }}>
              Kural Ağırlığını Düzenle
            </h4>

            <div style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              padding: '10px 12px',
              borderRadius: 6,
              fontSize: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <div><strong style={{ color: '#6B7280' }}>Kaynak:</strong> {activeCell.source_label}</div>
              <div><strong style={{ color: '#6B7280' }}>Araç:</strong> {activeCell.vehicle_name}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#374151', fontWeight: 700, marginBottom: 6 }}>
                Eşleşme Puanı (+{cellWeight}p)
              </label>
              <input
                type="range"
                min={0}
                max={50}
                step={5}
                value={cellWeight}
                onChange={e => setCellWeight(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, color: '#374151', fontWeight: 700, marginBottom: 4 }}>
                Neden Rozeti
              </label>
              <input
                type="text"
                value={cellBadge}
                onChange={e => setCellBadge(e.target.value)}
                placeholder="Örn: İdeal Şehir Aracı"
                style={{
                  width: '100%',
                  height: 36,
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: 6,
                  color: '#111827',
                  padding: '0 10px',
                  fontSize: 12,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
              <button
                type="button"
                onClick={() => setActiveCell(null)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  color: '#4B5563',
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: 12,
                  cursor: 'pointer'
                }}
              >
                Kapat
              </button>

              <button
                type="button"
                onClick={handleSaveCell}
                style={{
                  background: '#EB0A1E',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '6px 16px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ekip Üyesi Ekle / Düzenle Modal */}
      {showUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 16,
            width: '100%',
            maxWidth: 520,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #E5E7EB',
            overflow: 'hidden',
            animation: 'fadeIn 0.15s ease-out'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#F9FAFB'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className={userModalMode === 'create' ? 'bi bi-person-plus-fill' : 'bi bi-person-gear'} style={{ color: '#EB0A1E' }}></i>
                  {userModalMode === 'create' ? 'Yeni Ekip Üyesi Ekle' : 'Ekip Üyesini Düzenle'}
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6B7280' }}>
                  Panel erişim yetkilerini ve hesap bilgilerini yapılandırın.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF',
                  fontSize: 20,
                  lineHeight: 1,
                  padding: 4
                }}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, maxHeight: 'calc(80vh - 140px)', overflowY: 'auto' }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                  Ad Soyad
                </label>
                <input
                  type="text"
                  value={uFullName}
                  onChange={(e) => setUFullName(e.target.value)}
                  placeholder="Örn: Ahmet Yılmaz"
                  style={{
                    width: '100%',
                    height: 40,
                    padding: '0 12px',
                    borderRadius: 8,
                    border: '1px solid #D1D5DB',
                    fontSize: 13,
                    color: '#111827',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                  Kullanıcı Adı (Giriş için) <span style={{ color: '#EB0A1E' }}>*</span>
                </label>
                <input
                  type="text"
                  value={uUsername}
                  onChange={(e) => setUUsername(e.target.value)}
                  placeholder="Örn: ahmet.yilmaz"
                  disabled={userModalMode === 'edit'}
                  style={{
                    width: '100%',
                    height: 40,
                    padding: '0 12px',
                    borderRadius: 8,
                    border: '1px solid #D1D5DB',
                    fontSize: 13,
                    color: '#111827',
                    background: userModalMode === 'edit' ? '#F3F4F6' : '#FFFFFF',
                    boxSizing: 'border-box'
                  }}
                />
                {userModalMode === 'edit' && (
                  <span style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4, display: 'block' }}>
                    Kullanıcı adı benzersiz kimlik olduğu için değiştirilemez.
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                  {userModalMode === 'create' ? 'Şifre' : 'Yeni Şifre (İsteğe Bağlı)'} <span style={{ color: '#EB0A1E' }}>{userModalMode === 'create' ? '*' : ''}</span>
                </label>
                <input
                  type="password"
                  value={uPassword}
                  onChange={(e) => setUPassword(e.target.value)}
                  placeholder={userModalMode === 'create' ? 'Minimum 6 karakter' : 'Değiştirmek istemiyorsanız boş bırakın'}
                  style={{
                    width: '100%',
                    height: 40,
                    padding: '0 12px',
                    borderRadius: 8,
                    border: '1px solid #D1D5DB',
                    fontSize: 13,
                    color: '#111827',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Yetki Seviyesi Seçimi */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
                  Yetki Seviyesi (Rol) <span style={{ color: '#EB0A1E' }}>*</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: uRole === 'admin' ? '2px solid #EB0A1E' : '1px solid #E5E7EB',
                      background: uRole === 'admin' ? '#FEF2F2' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <input
                      type="radio"
                      name="userRole"
                      checked={uRole === 'admin'}
                      onChange={() => setURole('admin')}
                      style={{ marginTop: 3, accentColor: '#EB0A1E' }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="bi bi-shield-lock" style={{ color: '#EB0A1E' }}></i>
                        <span>Süper Yönetici (Admin)</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                        Tüm modüller, güvenlik, ekip üyeleri, SEO ve CSS/JS yönetimi dahil tam erişim yetkisi.
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: uRole === 'editor' ? '2px solid #2563EB' : '1px solid #E5E7EB',
                      background: uRole === 'editor' ? '#EFF6FF' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <input
                      type="radio"
                      name="userRole"
                      checked={uRole === 'editor'}
                      onChange={() => setURole('editor')}
                      style={{ marginTop: 3, accentColor: '#2563EB' }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="bi bi-pencil-square" style={{ color: '#2563EB' }}></i>
                        <span>İçerik Editörü (Editor)</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                        Soru havuzunu, kategori balonlarını, araç eşleştirmelerini ve SEO başlıklarını düzenleyebilir.
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: uRole === 'viewer' ? '2px solid #059669' : '1px solid #E5E7EB',
                      background: uRole === 'viewer' ? '#ECFDF5' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <input
                      type="radio"
                      name="userRole"
                      checked={uRole === 'viewer'}
                      onChange={() => setURole('viewer')}
                      style={{ marginTop: 3, accentColor: '#059669' }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <i className="bi bi-eye" style={{ color: '#059669' }}></i>
                        <span>Gözlemci (Viewer)</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                        Tüm eşleştirmeleri ve ayarları inceleyebilir, simüle edebilir; hiçbir kaydı değiştiremez veya silemez.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Hesap Durumu */}
              <div style={{ paddingTop: 8, borderTop: '1px solid #F3F4F6' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={uIsActive}
                    onChange={(e) => setUIsActive(e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: '#10B981' }}
                  />
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>Hesap Aktif</span>
                    <p style={{ margin: 0, fontSize: 11, color: '#6B7280' }}>
                      İşareti kaldırırsanız bu kullanıcının sisteme girişi askıya alınır.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 12,
              background: '#F9FAFB'
            }}>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 8,
                  border: '1px solid #D1D5DB',
                  background: '#FFFFFF',
                  color: '#374151',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleSaveUser}
                style={{
                  padding: '9px 22px',
                  borderRadius: 8,
                  border: 'none',
                  background: '#EB0A1E',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 2px 4px rgba(235, 10, 30, 0.2)'
                }}
              >
                <i className="bi bi-check2-circle"></i>
                {userModalMode === 'create' ? 'Ekip Üyesini Ekle' : 'Değişiklikleri Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ======================================================== */}
      {/* 9. RESET ANALYTICS CONFIRMATION MODAL                   */}
      {/* ======================================================== */}
      {showResetModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.55)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 20
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: 12,
            width: '100%',
            maxWidth: 460,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ padding: '24px 24px 20px', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#FEE2E2',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <TrashIcon size={20} color="#DC2626" />
              </div>
              <div>
                <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 800, color: '#111827' }}>
                  Analitik Verilerini Sıfırla
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: '#4B5563', lineHeight: '1.5' }}>
                  Sistemde kayıtlı tüm ziyaretçi akış hunisi, adımlardaki terk süreleri ve oturum hareketleri kalıcı olarak silinecektir. Bu işlem geri alınamaz.
                </p>
                <div style={{ marginTop: 12, padding: '8px 12px', background: '#FEF2F2', borderRadius: 6, fontSize: 12, color: '#991B1B' }}>
                  Gerçek ziyaretçilerin oluşturduğu veriler sıfırlanacak ve sayaçlar 0'dan başlayacaktır.
                </div>
              </div>
            </div>

            <div style={{
              padding: '14px 24px',
              background: '#F9FAFB',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 10
            }}>
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                disabled={resetting}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  color: '#374151',
                  padding: '8px 16px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleResetAnalytics}
                disabled={resetting}
                style={{
                  background: '#DC2626',
                  border: 'none',
                  color: '#FFFFFF',
                  padding: '8px 18px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <TrashIcon size={14} color="#FFFFFF" />
                <span>{resetting ? 'Sıfırlanıyor...' : 'Evet, Verileri Sıfırla'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 10. EXECUTIVE ANALYTICS REPORT MODAL (PRINT & CSV)      */}
      {/* ======================================================== */}
      {showReportModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 20
        }}>
          {/* Print Specific CSS Style Injection */}
          <style>{`
            @media print {
              body * {
                visibility: hidden !important;
              }
              #toyota-printable-report, #toyota-printable-report * {
                visibility: visible !important;
              }
              #toyota-printable-report {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 16px !important;
                background: #FFFFFF !important;
                color: #000000 !important;
                box-shadow: none !important;
                border: none !important;
                z-index: 999999 !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}</style>

          <div style={{
            position: 'relative',
            background: '#FFFFFF',
            borderRadius: 12,
            width: '100%',
            maxWidth: 960,
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid #E5E7EB',
            overflow: 'hidden'
          }}>
            {/* Modal Top Control Bar (Hidden during print) */}
            <div className="no-print" style={{
              padding: '16px 56px 16px 24px',
              borderBottom: '1px solid #E5E7EB',
              background: '#F9FAFB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ToyotaLogo height={24} color="#EB0A1E" />
                <div>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: '#111827' }}>
                    Yönetici Analitik Raporu & Çıktı
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#6B7280' }}>
                    Aşağıdaki raporu A4 formatında yazdırabilir / PDF kaydedebilir veya ham verileri CSV olarak indirebilirsiniz.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  style={{
                    background: '#FFFFFF',
                    color: '#374151',
                    border: '1px solid #D1D5DB',
                    padding: '7px 14px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <DownloadIcon size={13} color="#374151" />
                  <span>Excel / CSV İndir</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintReport}
                  style={{
                    background: '#111827',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '7px 16px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <PrinterIcon size={13} color="#FFFFFF" />
                  <span>Yazdır / PDF Kaydet</span>
                </button>
              </div>

              {/* Close Button in top right corner */}
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: 18,
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  color: '#6B7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#111827'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#6B7280'; }}
                title="Kapat"
              >
                <CloseIcon size={16} color="currentColor" />
              </button>
            </div>


            {/* Scrollable Printable Report Container */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', background: '#F3F4F6' }}>
              <div id="toyota-printable-report" style={{
                background: '#FFFFFF',
                borderRadius: 8,
                padding: '36px 40px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                color: '#111827',
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
              }}>
                {/* Report Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #EB0A1E', paddingBottom: 18, marginBottom: 24 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <ToyotaLogo height={28} color="#EB0A1E" />
                      <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.3px', color: '#111827' }}>
                        TOYOTA TÜRKİYE
                      </span>
                    </div>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#374151' }}>
                      Akıllı Araç Bulma Motoru — Ziyaretçi & Huni Analitik Raporu
                    </h2>
                  </div>

                  <div style={{ textAlign: 'right', fontSize: 11, color: '#4B5563', lineHeight: '1.6' }}>
                    <div><b>Rapor Tarihi:</b> {new Date().toLocaleString('tr-TR')}</div>
                    <div><b>Hazırlayan Yönetici:</b> {username}</div>
                    <div><b>Rapor No:</b> REP-{Date.now().toString().slice(-6)}</div>
                  </div>
                </div>

                {/* 1. Summary KPI Cards */}
                <div style={{ marginBottom: 28 }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4B5563' }}>
                    1. Temel Performans Göstergeleri (KPI)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: '14px 16px', background: '#F9FAFB' }}>
                      <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>Toplam Başlayan Oturum</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginTop: 4 }}>
                        {analytics?.summary?.totalSessions ?? 0}
                      </div>
                      <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>
                        Masaüstü: {analytics?.summary?.desktopCount ?? 0} · Mobil: {analytics?.summary?.mobileCount ?? 0}
                      </div>
                    </div>

                    <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: '14px 16px', background: '#F9FAFB' }}>
                      <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>Sonuç Görme (Dönüşüm)</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#16A34A', marginTop: 4 }}>
                        %{analytics?.summary?.resultRate ?? 0}
                      </div>
                      <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>
                        {analytics?.summary?.resultCount ?? 0} kullanıcı araç ekranına ulaştı
                      </div>
                    </div>

                    <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: '14px 16px', background: '#F9FAFB' }}>
                      <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>İletişim / Teklif Formu</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#EB0A1E', marginTop: 4 }}>
                        %{analytics?.summary?.leadRate ?? 0}
                      </div>
                      <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>
                        {analytics?.summary?.leadCount ?? 0} kullanıcı bayi aranma talebi bıraktı
                      </div>
                    </div>

                    <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: '14px 16px', background: '#F9FAFB' }}>
                      <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600 }}>Ort. Araç Bulma Süresi</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginTop: 4 }}>
                        {analytics?.summary?.avgResultDuration ? `${analytics.summary.avgResultDuration} sn` : '—'}
                      </div>
                      <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>
                        Genel oturum ort.: {analytics?.summary?.avgDuration ?? 0} sn
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Step-by-Step Funnel & Drop-off Timing Table */}
                <div style={{ marginBottom: 28 }}>
                  <h4 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4B5563' }}>
                    2. Kullanıcı Akış Hunisi & Adım Terk Süreleri
                  </h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr style={{ background: '#F3F4F6', borderBottom: '2px solid #E5E7EB', textAlign: 'left', color: '#374151' }}>
                        <th style={{ padding: '8px 10px', fontWeight: 700 }}>Aşama / Adım</th>
                        <th style={{ padding: '8px 10px', fontWeight: 700 }}>Giren Kullanıcı</th>
                        <th style={{ padding: '8px 10px', fontWeight: 700 }}>Devam Eden</th>
                        <th style={{ padding: '8px 10px', fontWeight: 700 }}>Terk Eden</th>
                        <th style={{ padding: '8px 10px', fontWeight: 700 }}>Terk Oranı (%)</th>
                        <th style={{ padding: '8px 10px', fontWeight: 700 }}>Ortalama Terk Saniyesi</th>
                        <th style={{ padding: '8px 10px', fontWeight: 700 }}>Adımda Kalma Süresi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics?.funnel && analytics.funnel.length > 0 ? (
                        analytics.funnel.map((step, idx) => (
                          <tr key={step.stepId} style={{ borderBottom: '1px solid #E5E7EB' }}>
                            <td style={{ padding: '8px 10px', fontWeight: 700, color: '#111827' }}>
                              {idx + 1}. {step.label}
                            </td>
                            <td style={{ padding: '8px 10px', fontWeight: 600 }}>{step.visitors}</td>
                            <td style={{ padding: '8px 10px', color: '#16A34A', fontWeight: 700 }}>
                              {Math.max(0, step.visitors - step.dropoffs)}
                            </td>
                            <td style={{ padding: '8px 10px', color: step.dropoffs > 0 ? '#DC2626' : '#6B7280', fontWeight: step.dropoffs > 0 ? 700 : 500 }}>
                              {step.dropoffs} kişi
                            </td>
                            <td style={{ padding: '8px 10px', fontWeight: 700 }}>
                              %{step.dropoffRate}
                            </td>
                            <td style={{ padding: '8px 10px', color: step.dropoffs > 0 ? '#DC2626' : '#6B7280', fontWeight: 600 }}>
                              {step.dropoffs > 0 ? `Ort. ${step.avgDropoffSeconds}. sn` : '—'}
                            </td>
                            <td style={{ padding: '8px 10px', color: '#4B5563' }}>
                              {step.avgTimeOnStep > 0 ? `${step.avgTimeOnStep} sn` : '—'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ padding: '16px', textAlign: 'center', color: '#6B7280' }}>
                            Kayıtlı akış verisi bulunamadı.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* 3. Top Matched Models & Device Distribution */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                  <div>
                    <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4B5563' }}>
                      3. En Çok Eşleşen Toyota Modelleri
                    </h4>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ background: '#F3F4F6', borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                          <th style={{ padding: '6px 10px', fontWeight: 700 }}>Model</th>
                          <th style={{ padding: '6px 10px', fontWeight: 700, textAlign: 'right' }}>Eşleşme Sayısı</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analytics?.topModels && analytics.topModels.length > 0 ? (
                          analytics.topModels.map(m => (
                            <tr key={m.matched_vehicle} style={{ borderBottom: '1px solid #E5E7EB' }}>
                              <td style={{ padding: '6px 10px', fontWeight: 700 }}>{m.matched_vehicle}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right', color: '#EB0A1E', fontWeight: 700 }}>
                                {m.count} kez
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={2} style={{ padding: '10px', textAlign: 'center', color: '#6B7280' }}>
                              Model eşleşme verisi yok.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#4B5563' }}>
                      4. Cihaz / Platform Dağılımı
                    </h4>
                    {(() => {
                      const total = (analytics?.summary?.desktopCount || 0) + (analytics?.summary?.mobileCount || 0);
                      const dPercent = total > 0 ? Math.round(((analytics?.summary?.desktopCount || 0) / total) * 100) : 50;
                      const mPercent = total > 0 ? 100 - dPercent : 50;
                      return (
                        <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: '14px 16px', background: '#F9FAFB' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                            <span>Masaüstü: %{dPercent} ({analytics?.summary?.desktopCount || 0})</span>
                            <span style={{ color: '#EB0A1E' }}>Mobil: %{mPercent} ({analytics?.summary?.mobileCount || 0})</span>
                          </div>
                          <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ width: `${dPercent}%`, background: '#111827' }} />
                            <div style={{ width: `${mPercent}%`, background: '#EB0A1E' }} />
                          </div>
                          <div style={{ marginTop: 10, fontSize: 11, color: '#6B7280' }}>
                            Toplam {total} tekil oturum üzerinden hesaplanmıştır.
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 5. Report Footer Note */}
                <div style={{
                  borderTop: '1px solid #E5E7EB',
                  paddingTop: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 10,
                  color: '#9CA3AF'
                }}>
                  <div>
                    Toyota Türkiye Pazarlama ve Satış A.Ş. — Gizli & Şirket İçi Analitik Raporu
                  </div>
                  <div>
                    Doğrulanmış SQLite Telemetri Veritabanı
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


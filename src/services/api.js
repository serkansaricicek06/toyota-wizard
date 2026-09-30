// API Client for Toyota Dynamic Wizard & Admin Panel

const API_HOST = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';
const BASE_URL = `${API_HOST}/api`;

export async function fetchFlow(category = 'all') {
  try {
    const res = await fetch(`${BASE_URL}/wizard/flow?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Flow fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('[API] Flow endpoint unreachable, using local fallback:', err);
    return null;
  }
}

export async function calculateRemoteMatch({ category, businessType, answers, selections }) {
  try {
    const res = await fetch(`${BASE_URL}/wizard/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, businessType, answers, selections })
    });
    if (!res.ok) throw new Error('Match failed');
    const data = await res.json();
    return data.matches;
  } catch (err) {
    console.warn('[API] Match endpoint unreachable, using local fallback:', err);
    return null;
  }
}

export async function submitLead(payload) {
  const res = await fetch(`${BASE_URL}/wizard/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Talep gönderilemedi');
  }
  return data;
}

// Track Funnel & Drop-off Step (Reliable keepalive fetch telemetry)
export function trackWizardStep(payload) {
  try {
    if (!payload?.sessionId && typeof window !== 'undefined') {
      let sid = sessionStorage.getItem('toyota_wizard_sess');
      if (!sid) {
        sid = 'toyota_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
        sessionStorage.setItem('toyota_wizard_sess', sid);
      }
      payload.sessionId = sid;
    }
    const bodyStr = JSON.stringify(payload);
    fetch(`${BASE_URL}/wizard/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyStr,
      keepalive: true
    }).catch(err => {
      console.warn('[Telemetry Error]', err);
    });
  } catch (e) {
    // Non-blocking telemetry
  }
}

// Admin API
function handleAuthResponse(res, defaultError) {
  if (res.status === 401 || res.status === 403) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('toyota_admin_token');
    }
    throw new Error('Yetkisiz erişim: Oturum süresi doldu veya geçersiz token (401).');
  }
  if (!res.ok) throw new Error(defaultError);
}

export async function adminLogin(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Giriş başarısız');
  return data;
}

export async function adminGetStats(token) {
  const res = await fetch(`${BASE_URL}/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Stats fetch failed');
  return await res.json();
}

export async function adminGetAnalytics(token) {
  const res = await fetch(`${BASE_URL}/admin/analytics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Analytics fetch failed');
  return await res.json();
}

export async function adminResetAnalytics(token) {
  const res = await fetch(`${BASE_URL}/admin/analytics/reset`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Reset failed');
  return await res.json();
}


export async function adminGetQuestions(token) {
  const res = await fetch(`${BASE_URL}/admin/questions`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Questions fetch failed');
  const data = await res.json();
  if (data?.questions) {
    data.questions = data.questions.map(q => ({
      ...q,
      order_num: q.order_num ?? q.orderNum,
      category_type: q.category_type || q.categoryType,
      select_type: q.select_type || q.selectType,
      max_select: q.max_select ?? q.maxSelect,
      is_active: q.is_active !== undefined ? (q.is_active ? 1 : 0) : (q.isActive ? 1 : 0),
      options: (q.options || []).map(o => ({
        ...o,
        order_num: o.order_num ?? o.orderNum,
        tags: o.tags || (typeof o.tagsJson === 'string' ? JSON.parse(o.tagsJson || '[]') : [])
      }))
    }));
  }
  return data;
}

export async function adminToggleQuestion(id, token) {
  const res = await fetch(`${BASE_URL}/admin/questions/${id}/toggle`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function adminGetCategories(token) {
  const res = await fetch(`${BASE_URL}/admin/categories`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Categories fetch failed');
  const data = await res.json();
  if (data?.categories) {
    data.categories = data.categories.map(c => ({
      ...c,
      vehicle_type: c.vehicle_type || c.vehicleType,
      is_radio: c.is_radio ?? (c.isRadio ? 1 : 0),
      has_tow: c.has_tow ?? (c.hasTow ? 1 : 0),
      no_opts: c.no_opts ?? (c.noOpts ? 1 : 0),
      is_active: c.is_active !== undefined ? (c.is_active ? 1 : 0) : (c.isActive ? 1 : 0),
      options: c.options || (typeof c.optionsJson === 'string' ? JSON.parse(c.optionsJson || '[]') : []),
      exclusivePair: c.exclusivePair || (typeof c.exclusivePairJson === 'string' ? JSON.parse(c.exclusivePairJson || '[]') : [])
    }));
  }
  return data;
}

export async function adminToggleCategory(id, token) {
  const res = await fetch(`${BASE_URL}/admin/categories/${id}/toggle`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function adminGetVehicles(token) {
  const res = await fetch(`${BASE_URL}/admin/vehicles`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Vehicles fetch failed');
  const data = await res.json();
  if (data?.vehicles) {
    data.vehicles = data.vehicles.map(v => ({
      ...v,
      cardb_image: v.cardb_image || v.cardbImage,
      cardbImage: v.cardb_image || v.cardbImage,
      starting_price: v.starting_price ?? v.startingPrice,
      startingPrice: v.starting_price ?? v.startingPrice,
      is_active: v.is_active !== undefined ? (v.is_active ? 1 : 0) : (v.isActive ? 1 : 0),
      isActive: v.is_active !== undefined ? Boolean(v.is_active) : Boolean(v.isActive),
      model_code: v.model_code || v.modelCode,
      modelCode: v.model_code || v.modelCode,
      toyota_url: v.toyota_url || v.toyotaUrl,
      toyotaUrl: v.toyota_url || v.toyotaUrl,
      supported_tags_json: v.supported_tags_json || v.supportedTagsJson,
      specs_json: v.specs_json || v.specsJson
    }));
  }
  return data;
}

export async function adminToggleVehicle(id, token) {
  const res = await fetch(`${BASE_URL}/admin/vehicles/${id}/toggle`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function adminUpdateVehicle(id, payload, token) {
  const res = await fetch(`${BASE_URL}/admin/vehicles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Araç güncellenemedi');
  return data;
}

export async function adminGetLeads(token) {
  const res = await fetch(`${BASE_URL}/admin/leads`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Leads fetch failed');
  const data = await res.json();
  if (data?.leads) {
    data.leads = data.leads.map(l => {
      const model = l.preferred_model || l.preferredModel || l.matched_model || l.matchedModel || l.vehicle_name || '';
      return {
        ...l,
        full_name: l.full_name || l.fullName || 'Ziyaretçi',
        fullName: l.fullName || l.full_name || 'Ziyaretçi',
        preferred_model: model,
        preferredModel: model,
        matched_model: model,
        matchedModel: model,
        vehicle_name: model,
        created_at: l.created_at || l.createdAt,
        createdAt: l.createdAt || l.created_at
      };
    });
  }
  return data;
}

export async function adminUpdateLeadStatus(id, status, token) {
  const res = await fetch(`${BASE_URL}/admin/leads/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  return await res.json();
}

export async function adminGetRules(token) {
  const res = await fetch(`${BASE_URL}/admin/rules`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Rules fetch failed');
  const data = await res.json();
  if (data?.rules) {
    data.rules = data.rules.map(r => ({
      ...r,
      source_type: r.source_type || r.sourceType,
      source_id: r.source_id || r.sourceId,
      source_label: r.source_label || r.sourceLabel,
      vehicle_id: r.vehicle_id || r.vehicleId,
      reason_badge: r.reason_badge || r.reasonBadge
    }));
  }
  return data;
}

export async function adminSaveRule(payload, token) {
  const res = await fetch(`${BASE_URL}/admin/rules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kural kaydedilemedi');
  return data;
}

export async function adminUpdateRuleCell(payload, token) {
  const res = await fetch(`${BASE_URL}/admin/rules/cell`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kural güncellenemedi');
  return data;
}

export async function adminDeleteRule(id, token) {
  const res = await fetch(`${BASE_URL}/admin/rules/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

export async function adminCreateQuestionWithRules(payload, token) {
  const res = await fetch(`${BASE_URL}/admin/questions-with-rules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Soru oluşturulamadı');
  return data;
}

export async function adminUpdateQuestionWithRules(id, payload, token) {
  const res = await fetch(`${BASE_URL}/admin/questions-with-rules/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Soru güncellenemedi');
  return data;
}

export async function adminDeleteQuestion(id, token) {
  const res = await fetch(`${BASE_URL}/admin/questions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Soru silinemedi');
  return data;
}

export async function adminCreateCategoryWithRules(payload, token) {
  const res = await fetch(`${BASE_URL}/admin/categories-with-rules`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kategori oluşturulamadı');
  return data;
}

export async function adminUpdateCategoryWithRules(id, payload, token) {
  const res = await fetch(`${BASE_URL}/admin/categories-with-rules/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kategori güncellenemedi');
  return data;
}

export async function adminDeleteCategory(id, token) {
  const res = await fetch(`${BASE_URL}/admin/categories/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kategori silinemedi');
  return data;
}

export async function adminSyncToyota(token) {
  const res = await fetch(`${BASE_URL}/admin/sync-toyota`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Senkronizasyon başarısız');
  return data;
}

export async function adminGetSettings(token) {
  const res = await fetch(`${BASE_URL}/admin/settings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Ayarlar yüklenemedi');
  return await res.json();
}

export async function adminSaveSettings(payload, token) {
  const res = await fetch(`${BASE_URL}/admin/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ayarlar kaydedilemedi');
  return data;
}

export async function adminGetUsers(token) {
  const res = await fetch(`${BASE_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  handleAuthResponse(res, 'Kullanıcılar yüklenemedi');
  return await res.json();
}

export async function adminCreateUser(payload, token) {
  const res = await fetch(`${BASE_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kullanıcı oluşturulamadı');
  return data;
}

export async function adminUpdateUser(id, payload, token) {
  const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kullanıcı güncellenemedi');
  return data;
}

export async function adminDeleteUser(id, token) {
  const res = await fetch(`${BASE_URL}/admin/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Kullanıcı silinemedi');
  return data;
}

export async function adminChangePassword(payload, token) {
  const res = await fetch(`${BASE_URL}/admin/users/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Şifre değiştirilemedi');
  return data;
}

export async function adminUploadAsset(dataUrl, filename, type, token) {
  const res = await fetch(`${BASE_URL}/admin/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ dataUrl, filename, type })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Yükleme başarısız');
  return data;
}

export async function fetchPublicSettings() {
  try {
    const res = await fetch(`${BASE_URL}/wizard/settings`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.settings;
  } catch (err) {
    return null;
  }
}

/**
 * Dynamically updates the browser tab favicon with proper MIME type and cache busting.
 */
export function updateDocumentFavicon(url) {
  if (!url || typeof document === 'undefined') return;

  try {
    let type = 'image/x-icon';
    const cleanUrl = url.split('?')[0].toLowerCase();
    if (cleanUrl.endsWith('.svg') || cleanUrl.startsWith('data:image/svg')) {
      type = 'image/svg+xml';
    } else if (cleanUrl.endsWith('.png') || cleanUrl.startsWith('data:image/png')) {
      type = 'image/png';
    } else if (cleanUrl.endsWith('.ico') || cleanUrl.startsWith('data:image/x-icon') || cleanUrl.startsWith('data:image/vnd.microsoft.icon')) {
      type = 'image/x-icon';
    }

    let targetHref = url;
    if (!url.startsWith('data:')) {
      const sep = url.includes('?') ? '&' : '?';
      targetHref = `${url}${sep}v=${Date.now()}`;
    }

    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach(el => el.parentNode?.removeChild(el));

    const linkIcon = document.createElement('link');
    linkIcon.rel = 'icon';
    linkIcon.type = type;
    linkIcon.href = targetHref;
    document.head.appendChild(linkIcon);

    const linkShortcut = document.createElement('link');
    linkShortcut.rel = 'shortcut icon';
    linkShortcut.type = type;
    linkShortcut.href = targetHref;
    document.head.appendChild(linkShortcut);
  } catch (e) {
    console.warn('[Favicon] Failed to update dynamic favicon:', e);
  }
}



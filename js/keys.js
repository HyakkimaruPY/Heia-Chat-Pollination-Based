/* ─── Keys ──────────────────────────────────────────── */
const Keys = {
  async handleSubmit() {
    const key=document.getElementById('key-input').value.trim(); if (!key) return;
    const btn=document.getElementById('key-submit');
    btn.disabled=true;
    btn.innerHTML=`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`;
    const valid=await API.validateKey(key);
    btn.disabled=false;
    btn.innerHTML=`<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg><span>${t('enter')}</span>`;
    if (!valid) { document.getElementById('key-error').classList.add('visible'); return; }
    document.getElementById('key-error').classList.remove('visible');
    if (!state.keys.includes(key)) state.keys.push(key);
    state.activeKey=key; Store.saveKeys(); localStorage.setItem(KEYS.KEYS_MAP.ACTIVE_KEY,key);
    App.enter();
  },
  async handleRenew() {
    const key=document.getElementById('renew-key-input').value.trim(); if (!key) return;
    const btn=document.getElementById('renew-submit'); btn.disabled=true;
    const valid=await API.validateKey(key); btn.disabled=false;
    if (!valid) { UI.showToast(t('keyError')); return; }
    if (!state.keys.includes(key)) state.keys.push(key);
    state.activeKey=key; Store.saveKeys(); localStorage.setItem(KEYS.KEYS_MAP.ACTIVE_KEY,key);
    document.getElementById('expired-banner').classList.remove('visible');
    UI.showToast(t('keySaved'));
  },
  activate(key) { state.activeKey=key; localStorage.setItem(KEYS.KEYS_MAP.ACTIVE_KEY,key); Modals.renderSettings(); UI.showToast(t('keySaved')); },
  async add() {
    const inp=document.getElementById('new-key-input');
    const key=inp.value.trim(); if (!key) return;
    if (!state.keys.includes(key)) { state.keys.push(key); Store.saveKeys(); }
    inp.value=''; Modals.renderSettings(); UI.showToast(t('keySaved'));
  },
  delete(key) {
    state.keys=state.keys.filter(k=>k!==key);
    if (state.activeKey===key) { state.activeKey=state.keys[0]||null; localStorage.setItem(KEYS.KEYS_MAP.ACTIVE_KEY,state.activeKey||''); }
    Store.saveKeys(); Modals.renderSettings(); UI.showToast(t('keyDeleted'));
  },
  setModel(id) { state.model=id; localStorage.setItem(KEYS.KEYS_MAP.MODEL,id); UI.renderModelPill(); Modals.renderSettings(); },
  setModelAndUpdate(id) { state.model=id; localStorage.setItem(KEYS.KEYS_MAP.MODEL,id); UI.renderModelPill(); Account.invalidate(); Modals.renderModelPicker(); },
  async _loadModels() {
    try {
      // Send auth header so the API returns only models accessible to this user's tier.
      // The Pollinations API filters models by tier when authenticated:
      // Seed (free) → standard models; Flower/Nectar (paid) → advanced + all models.
      const headers = state.activeKey ? {'Authorization':`Bearer ${state.activeKey}`} : {};
      const r = await fetch(`${API_BASE}/v1/models`, {headers});
      if (r.ok) {
        const data = await r.json();

        // Exclude all non-chat/text types: image generators, TTS, STT, video, music, etc.
        const exclKeywords = [
          'flux','image','gptimage','tts','whisper','audio','video',
          'speech','scribe','music','veo','seedance','wan','ltx',
          'nanobanana','kontext','seedream','grok-video','grok-imagine',
          'imagen','klein','zimage','elevenlabs'
        ];
        const models = (data.data || [])
          .filter(m => !exclKeywords.some(kw => m.id.toLowerCase().includes(kw)))
          .map(m => ({
            id: m.id,
            label: m.id,
            // pollen = estimated cost per request in pollen units (1 pollen = $1 USD)
            // e.g. 0.01 pollen = ~1 cent per request
            pollen: (m.pollen !== undefined && m.pollen !== null) ? Number(m.pollen)
                  : (m.cost   !== undefined && m.cost   !== null) ? Number(m.cost)
                  : null
          }));

        if (models.length > 0) {
          state.models = models;
          // If previously selected model is no longer accessible, pick first available
          if (!state.models.find(m => m.id === state.model)) {
            state.model = state.models[0]?.id || 'nova-fast';
            localStorage.setItem(KEYS.KEYS_MAP.MODEL, state.model);
          }
        }
      }
    } catch {}
    if (!localStorage.getItem(KEYS.KEYS_MAP.MODEL)) {
      state.model = state.models[0]?.id || 'nova-fast';
    }
    UI.renderModelPill();
  }
};

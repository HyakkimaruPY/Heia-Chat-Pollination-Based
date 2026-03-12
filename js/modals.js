/* ─── Modals ────────────────────────────────────────── */
const Modals = {
  _credit() {
    return `<div style="margin-top:24px;padding-top:16px;border-top:1px solid var(--border)">
      <a href="https://pollinations.ai" target="_blank" style="display:flex;align-items:center;gap:10px;text-decoration:none;padding:10px 12px;border-radius:10px;border:1px solid rgba(255,120,20,.25);background:rgba(255,100,10,.05);transition:background .2s" onmouseover="this.style.background='rgba(255,100,10,.1)'" onmouseout="this.style.background='rgba(255,100,10,.05)'">
        <img src="https://raw.githubusercontent.com/pollinations/pollinations/main/assets/logo.svg" alt="Pollinations.ai" height="18" style="filter:invert(60%) sepia(80%) saturate(300%) hue-rotate(5deg) brightness(1.2);opacity:.9;flex-shrink:0">
        <div><div style="font-size:12.5px;font-weight:600;color:rgba(255,140,30,.9)">${t('poweredBy')} Pollinations.ai</div>
        <div style="font-size:11px;color:var(--text3);margin-top:1px">${t('pollinationsDesc')}</div></div>
        <svg style="margin-left:auto;flex-shrink:0;opacity:.4" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a></div>`;
  },
  renderSettings() {
    const body=document.getElementById('settings-body');
    if (state.settingsTab==='keys') {
      body.innerHTML=`<div class="sec-title">${t('keysSection')}</div>
        <div class="sec-card">
          ${!state.keys.length?`<div style="padding:16px;color:var(--text2);font-size:13.5px">${t('noKeySaved')}</div>`:''}
          ${state.keys.map(k=>`<div class="key-item">
            <div class="ki-text"><div class="ki-label">${k.slice(0,6)}${'•'.repeat(8)}${k.slice(-4)}</div>
            <div class="ki-val">${k===state.activeKey?'● '+t('activeKey'):t('inactiveKey')}</div></div>
            ${k!==state.activeKey?`<button class="btn-sm ghost" onclick="Keys.activate('${k}')">${t('useKey')}</button>`:`<span class="ki-badge active">${t('activeKey')}</span>`}
            <button class="btn-sm danger" onclick="Keys.delete('${k}')" style="padding:8px 10px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
          </div>`).join('')}
        </div>
        <div class="add-form">
          <input type="password" id="new-key-input" placeholder="${t('keyPlaceholder')}" autocomplete="off">
          <button class="btn-sm" onclick="Keys.add()">${t('addKey')}</button>
        </div>${Modals._credit()}`;
    } else {
      body.innerHTML=`<div class="sec-title">${t('themeLabel')}</div>
        <div class="sec-card" style="margin-bottom:20px">
          ${['auto','light','dark'].map(th=>`<div class="sec-row" style="cursor:pointer" onclick="Theme.apply('${th}');Modals.renderSettings()">
            <div class="sec-row-label">${th==='auto'?t('themeAuto'):th==='dark'?t('themeDark'):t('themeLight')}</div>
            ${state.theme===th?`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:''}
          </div>`).join('')}
        </div>
        <div class="sec-title">${t('bgSection')}</div>
        <div class="sec-card" style="margin-bottom:20px">
          <div class="sec-row" style="cursor:pointer" onclick="setHoneycomb(!state.honeycomb);Modals.renderSettings()">
            <div class="sec-row-l"><div class="sec-row-label">${t('honeycombLabel')}</div><div class="sec-row-desc">${t('honeycombDesc')}</div></div>
            <button class="toggle ${state.honeycomb?'on':''}" style="pointer-events:none"></button>
          </div>
        </div>
        <div class="sec-title">${t('currentModel')}</div>
        <div class="sec-card">
          ${state.models.map(m=>`<div class="sec-row" style="cursor:pointer" onclick="Keys.setModel('${m.id}')">
            <div class="sec-row-label">${Renderer.escHtml(m.label||m.id)}</div>
            ${state.model===m.id?`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:''}
          </div>`).join('')}
        </div>${Modals._credit()}`;
    }
  },
  renderMemory() {
    const body=document.getElementById('memory-body');
    if (!state.memory.length) {
      body.innerHTML=`<div style="text-align:center;padding:40px 20px;color:var(--text2)">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:auto;display:block;opacity:.3"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
        <div style="margin-top:14px;font-weight:500">${t('noMemory')}</div>
        <div style="font-size:13px;margin-top:5px">${t('memoryDesc')}</div></div>`;
      return;
    }
    body.innerHTML=`<div style="font-size:13px;color:var(--text2);margin-bottom:12px">${t('memoryDesc')}</div>
      <div class="sec-card">${state.memory.map((m,i)=>`
        <div class="mem-item" id="mi-${i}">
          <div class="mem-num">${i+1}</div>
          <div class="mem-text" id="mt-${i}" contenteditable="false">${Renderer.escHtml(m)}</div>
          <div class="mem-acts">
            <button class="mem-btn" onclick="Memory.editItem(${i})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
            <button class="mem-btn del" onclick="Memory.deleteItem(${i})"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg></button>
          </div>
        </div>`).join('')}</div>`;
  },
  async renderModelPicker() {
    const body = document.getElementById('model-body'); if(!body) return;

    // ── Model rows ──────────────────────────────────────────────────────────
    // pollen field = estimated cost per request (1 pollen = $1 USD)
    const modelRows = state.models.map(m => {
      const active = m.id === state.model;
      let costBadge;
      if (m.pollen !== null && m.pollen !== undefined) {
        // Show cost in pollen (e.g. "0.01 🌸")
        const displayCost = Number(m.pollen) < 0.001
          ? Number(m.pollen).toFixed(6)
          : Number(m.pollen) < 1
          ? Number(m.pollen).toFixed(4).replace(/\.?0+$/, '')
          : Number(m.pollen).toString();
        costBadge = `<span class="mp-cost-badge">${displayCost}&nbsp;🌸</span>`;
      } else {
        costBadge = `<span class="mp-cost-badge" style="font-size:10px;opacity:.5">?&nbsp;🌸</span>`;
      }
      return `<div class="mp-model-row${active?' mp-active':''}" onclick="Keys.setModelAndUpdate('${m.id}')">
        <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0">
          ${active?`<div style="width:6px;height:6px;background:var(--accent2);border-radius:50%;flex-shrink:0"></div>`:`<div style="width:6px;height:6px;border-radius:50%;flex-shrink:0"></div>`}
          <span style="font-size:13.5px;font-weight:${active?'600':'400'};color:${active?'var(--accent2)':'var(--text)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${Renderer.escHtml(m.label||m.id)}</span>
        </div>
        ${costBadge}
        ${active?`<svg style="flex-shrink:0;color:var(--accent2)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`:'<div style="width:14px"></div>'}
      </div>`;
    }).join('');

    body.innerHTML = `<div class="mp-models-wrap"><div class="sec-card" style="margin:0">${modelRows}</div></div><div id="mp-balance-card" class="mp-balance-card"><div style="color:var(--text3);font-size:13px;display:flex;align-items:center;gap:6px"><div class="stream-dot" style="animation:spin 1s linear infinite;width:8px;height:8px"></div>${t('loadingBalance')}</div></div>`;

    // ── Fetch real account data ─────────────────────────────────────────────
    const data = await Account.fetch();
    const card = document.getElementById('mp-balance-card'); if(!card) return;

    const selModel = state.models.find(m => m.id === state.model) || {id: state.model, pollen: null};
    // Cost per request in pollen (1 pollen = $1 USD)
    const cost = selModel.pollen !== undefined && selModel.pollen !== null ? Number(selModel.pollen) : null;

    const bal      = data?.balance;
    const tierBal  = data?.tierBalance;
    const packBal  = data?.packBalance;
    const tier     = data?.tier;
    const keyType  = data?.keyType;
    const perms    = data?.permissions;
    const nextResetAt = data?.nextResetAt
      ? new Date(data.nextResetAt).toLocaleDateString(state.lang, {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'})
      : null;

    // ── Estimated requests ──────────────────────────────────────────────────
    // Formula: floor(totalBalance / costPerRequest)
    // We also calculate how many are covered just by the daily free grant.
    let estTotal = null, estFromTier = null;
    if (cost !== null && cost > 0) {
      if (bal !== null && bal !== undefined)     estTotal    = Math.floor(Number(bal) / cost);
      if (tierBal !== null && tierBal !== undefined) estFromTier = Math.floor(Number(tierBal) / cost);
    }

    // ── Balance display helpers ─────────────────────────────────────────────
    const fmtBal = v => Account.fmt(v);

    // Cost display: show pollen value and its USD equivalent in cents
    let costDisplay;
    if (cost !== null) {
      const cents = cost * 100;
      const centStr = cents < 0.1 ? cents.toFixed(3) : cents < 1 ? cents.toFixed(2) : cents.toFixed(1);
      const displayCost = cost < 0.001 ? cost.toFixed(6) : cost < 1 ? cost.toFixed(4).replace(/\.?0+$/, '') : cost.toString();
      costDisplay = `<span style="font-size:16px;font-weight:700;color:var(--text)">${displayCost}&nbsp;🌸</span><div style="font-size:10px;color:var(--text3);margin-top:2px">≈ $${centStr.replace('.',',')} cents</div>`;
    } else {
      costDisplay = `<span style="color:var(--text3)">—</span>`;
    }

    // ── Tier badge ──────────────────────────────────────────────────────────
    const tierColors = {
      microbe:'#888', spore:'#aaa', seed:'var(--success)',
      flower:'var(--accent2)', nectar:'#f5a623', router:'#f87171'
    };
    const tierColor = tier ? (tierColors[tier.toLowerCase()] || 'var(--accent2)') : 'var(--accent2)';

    // ── Balance breakdown ───────────────────────────────────────────────────
    // Show tierBalance and packBalance separately when available
    let balBreakdown = '';
    if (tierBal !== null && tierBal !== undefined) {
      balBreakdown += `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:12px;color:var(--text2)">🌱 ${t('dailyGrant')}</span>
        <span style="font-size:12px;font-weight:600;color:var(--success)">${fmtBal(tierBal)} 🌸</span>
      </div>`;
    }
    if (packBal !== null && packBal !== undefined && Number(packBal) > 0) {
      balBreakdown += `<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0">
        <span style="font-size:12px;color:var(--text2)">💳 ${t('purchasedPollen')}</span>
        <span style="font-size:12px;font-weight:600;color:var(--accent2)">${fmtBal(packBal)} 🌸</span>
      </div>`;
    }

    card.innerHTML = `
      <div style="border-top:1px solid var(--border);margin-top:14px;padding-top:14px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
          <div class="mp-stat-card">
            <div class="mp-stat-icon">🌸</div>
            <div class="mp-stat-val" style="font-size:${fmtBal(bal).length>6?'16px':'22px'}">${fmtBal(bal)}</div>
            <div class="mp-stat-lbl">${t('pollenBalance')}</div>
          </div>
          <div class="mp-stat-card">
            <div class="mp-stat-icon">⚡</div>
            <div class="mp-stat-val" style="font-size:14px;line-height:1.3">${costDisplay}</div>
            <div class="mp-stat-lbl">${t('modelCostLabel')}</div>
          </div>
          <div class="mp-stat-card" style="grid-column:1/-1">
            <div class="mp-stat-icon">💬</div>
            <div class="mp-stat-val" style="font-size:${estTotal!==null&&estTotal>9999?'18px':'22px'}">${estTotal !== null ? estTotal.toLocaleString(state.lang) : '—'}</div>
            <div class="mp-stat-lbl">${t('estimatedReqs')} · ${Renderer.escHtml(selModel.label||selModel.id)}
              ${estFromTier !== null && estFromTier !== estTotal ? `<span style="display:block;font-size:10px;margin-top:2px;opacity:.7">${t('dailyGrant')}: ~${estFromTier.toLocaleString(state.lang)}</span>` : ''}</div>
          </div>
        </div>
        ${balBreakdown ? `<div style="background:var(--bg3);border-radius:var(--radius-sm);padding:8px 12px;margin-bottom:8px">${balBreakdown}</div>` : ''}
        ${tier ? `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg3);border-radius:var(--radius-sm);margin-bottom:6px"><span style="font-size:12.5px;color:var(--text2)">${t('accountTier')}</span><span style="font-size:12.5px;font-weight:600;text-transform:capitalize;color:${tierColor}">${tier}</span></div>` : ''}
        ${keyType ? `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg3);border-radius:var(--radius-sm);margin-bottom:6px"><span style="font-size:12.5px;color:var(--text2)">🔑 ${t('keyType')||'Tipo de Chave'}</span><span style="font-size:12px;font-weight:600;color:var(--text2);text-transform:capitalize">${keyType}</span></div>` : ''}
        ${perms && perms.length ? `<div style="padding:8px 12px;background:var(--bg3);border-radius:var(--radius-sm);margin-bottom:6px"><div style="font-size:11px;color:var(--text3);margin-bottom:5px">${t('keyPermissions')||'Permissões'}</div><div style="display:flex;flex-wrap:wrap;gap:4px">${(Array.isArray(perms)?perms:String(perms).split(',')).map(p=>`<span style="font-size:10.5px;padding:2px 7px;background:var(--accent-glow);color:var(--accent2);border-radius:6px;font-weight:500">${String(p).trim()}</span>`).join('')}</div></div>` : ''}
        ${nextResetAt ? `<div style="text-align:center;font-size:11.5px;color:var(--text3)">${t('resetAt')} ${nextResetAt}</div>` : ''}
        ${!data ? `<div style="text-align:center;font-size:12.5px;color:var(--text3);padding:8px 0">${t('balanceUnavailable')}</div>` : ''}
      </div>`;
  },
  renderHelp() {
    const body = document.getElementById('help-body');
    const sections = [
      { title: t('helpMemoryTitle'), icon: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>', text: t('helpMemoryText') },
      { title: t('helpModelsTitle'), icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h6M3 15h6"/>', text: t('helpModelsText') },
      { title: t('helpAppearanceTitle'), icon: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>', text: t('helpAppearanceText') },
      { title: t('helpKeysTitle'), icon: '<path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>', text: t('helpKeysText') },
    ];
    body.innerHTML = sections.map(s => `
      <div style="margin-bottom:20px">
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:8px">
          <div style="width:32px;height:32px;background:var(--accent-glow);border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${s.icon}</svg>
          </div>
          <div style="font-size:14px;font-weight:600;color:var(--text)">${s.title}</div>
        </div>
        <div style="font-size:13px;color:var(--text2);line-height:1.7;padding-left:41px">${s.text}</div>
      </div>`).join('<div style="height:1px;background:var(--border);margin:4px 0 20px"></div>') + Modals._credit();
  },
  switchTab(tab) {
    state.settingsTab=tab;
    document.getElementById('tab-keys').classList.toggle('active',tab==='keys');
    document.getElementById('tab-appearance').classList.toggle('active',tab==='appearance');
    Modals.renderSettings();
  }
};

/* ─── UI ────────────────────────────────────────────── */
const UI = {
  _toastT: null,
  _closeSidebarMobile() {
    if (window.innerWidth<=680) {
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('sb-overlay').classList.remove('visible');
    }
  },
  showToast(msg) {
    const el=document.getElementById('toast');
    el.textContent=msg; el.classList.add('show');
    clearTimeout(UI._toastT); UI._toastT=setTimeout(()=>el.classList.remove('show'),2500);
  },
  showExpiredBanner() { document.getElementById('expired-banner').classList.add('visible'); },
  autoResize(el) { el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,168)+'px'; },
  focusInput() {
    // Only auto-focus on desktop — on mobile this would open the keyboard unexpectedly
    if (!('ontouchstart' in window) && !navigator.maxTouchPoints) {
      document.getElementById('msg-input').focus();
    }
  },
  handleInputKey(e) { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();Chat.send();} },
  togglePasswordVis(id) {
    const el=document.getElementById(id);
    if (el) el.type = el.type==='password' ? 'text' : 'password';
  },
  setStreaming(v) {
    state.isStreaming=v;
    document.getElementById('send-btn').classList.toggle('hidden',v);
    document.getElementById('stop-btn').classList.toggle('visible',v);
    const ss=document.getElementById('stream-status');
    if (ss) { ss.classList.toggle('visible',v); if (!v) ss.classList.remove('code-mode'); }
  },
  updateStreamStatus(text) {
    const ss=document.getElementById('stream-status'), st=document.getElementById('stream-status-text');
    if (!ss||!st) return;
    const isCode=text.includes('```');
    ss.classList.toggle('code-mode',isCode);
    st.textContent=isCode ? t('streamCode') : t('streamText');
  },
  chatArea() { return document.getElementById('chat-area'); },
  scrollToBottom(force=true) {
    const area=UI.chatArea(); if (!area) return;
    if (force) state.autoScroll=true;
    area.scrollTo({top:area.scrollHeight, behavior:force?'smooth':'instant'});
    document.getElementById('scroll-btn').classList.remove('visible');
  },
  maybeScroll() {
    if (state.autoScroll) { const a=UI.chatArea(); if (a) a.scrollTop=a.scrollHeight; }
  },
  initScrollDetection() {
    let _scrollTick=false;
    UI.chatArea().addEventListener('scroll', () => {
      if (_scrollTick) return;
      _scrollTick=true;
      requestAnimationFrame(()=>{
        _scrollTick=false;
        const a=UI.chatArea();
        const atBottom=(a.scrollHeight-a.scrollTop-a.clientHeight)<60;
        state.autoScroll=atBottom;
        document.getElementById('scroll-btn').classList.toggle('visible',!atBottom);
      });
    },{passive:true});
  },
  addTypingIndicator() {
    const c=document.getElementById('messages');
    const row=document.createElement('div');
    row.className='msg-row ai'; row.id='typing-row';
    row.innerHTML=`<div class="msg-bubble"><div class="typing-indicator"><div class="td"></div><div class="td"></div><div class="td"></div></div></div>`;
    c.appendChild(row);
    if (state.autoScroll) UI.scrollToBottom(false);
    return row;
  },
  addBubble(role, content) {
    const c=document.getElementById('messages');
    c.querySelector('.empty-state')?.remove();
    const isAI=role==='assistant';
    const row=document.createElement('div');
    row.className=`msg-row ${role}`;
    let bubbleContent = isAI ? Renderer.parseMarkdown(content) : Renderer.escHtml(content);
    let collapseHtml='';
    if (!isAI && content.length>80) {
      const prev=Renderer.escHtml(content.slice(0,80));
      bubbleContent=`<span class="msg-text-full" style="display:none">${Renderer.escHtml(content)}</span><span class="msg-text-preview">${prev}…</span>`;
      collapseHtml=`<br><button class="msg-collapse-btn" onclick="UI.toggleMsgCollapse(this)"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg> ${t('showAll')}</button>`;
    }
    row.innerHTML=`
      ${isAI?`<div class="msg-avatar"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3"/></svg></div>`:''}
      <div class="msg-bubble">${bubbleContent}${collapseHtml}</div>
      ${!isAI?`<div class="msg-avatar"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`:''}`;
    c.appendChild(row);
    return row.querySelector('.msg-bubble');
  },
  toggleMsgCollapse(btn) {
    const bubble=btn.closest('.msg-bubble');
    const full=bubble.querySelector('.msg-text-full'), prev=bubble.querySelector('.msg-text-preview');
    const expanded=full.style.display!=='none';
    full.style.display=expanded?'none':'inline'; prev.style.display=expanded?'inline':'none';
    const pts=expanded?'6 9 12 15 18 9':'18 15 12 9 6 15';
    btn.innerHTML=`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="${pts}"/></svg> ${expanded?t('showAll'):t('showLess')}`;
  },
  collapseAllUserMsgs() {
    document.querySelectorAll('.msg-row.user .msg-bubble').forEach(b => {
      const full=b.querySelector('.msg-text-full'), prev=b.querySelector('.msg-text-preview'), btn=b.querySelector('.msg-collapse-btn');
      if (full&&prev) { full.style.display='none'; prev.style.display='inline'; }
      if (btn) btn.innerHTML=`<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg> ${t('showAll')}`;
    });
  },
  addMessageActions(lastRow) {
    if (!lastRow||lastRow.classList.contains('msg-actions')) return;
    const acts=document.createElement('div'); acts.className='msg-actions';
    setTimeout(()=>acts.classList.add('visible'),600);
    acts.innerHTML=`
      <button class="msg-action-btn" onclick="Chat.regenerate()"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg> ${t('regen')}</button>
      <button class="msg-action-btn" onclick="Chat.copyLastResponse()"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> ${t('copy')}</button>`;
    document.getElementById('messages').appendChild(acts);
  },
  openModal(type) {
    if (type==='settings') { document.getElementById('settings-modal').classList.add('visible'); Modals.renderSettings(); }
    else if (type==='help') { document.getElementById('help-modal').classList.add('visible'); Modals.renderHelp(); }
    else if (type==='model') { document.getElementById('model-modal').classList.add('visible'); Modals.renderModelPicker(); }
    else { document.getElementById('memory-modal').classList.add('visible'); Modals.renderMemory(); }
  },
  closeModal(id) { document.getElementById(id).classList.remove('visible'); },
  updateTopbar() {
    const chat=Chat.getActive();
    const newChatTitles=new Set(Object.values(STRINGS).map(s=>s.newChatTitle).filter(Boolean));
    const raw=chat?.title||'';
    document.getElementById('chat-title').textContent=newChatTitles.has(raw)?t('newChatTitle'):(raw||'Chat');
  },
  renderMessages() {
    const chat=Chat.getActive(), c=document.getElementById('messages');
    c.innerHTML='';
    if (!chat||!chat.messages.length) {
      c.innerHTML=`<div class="empty-state"><div class="empty-icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg></div><h2>${t('emptyTitle')}</h2><p>${t('emptyDesc')}</p></div>`;
      return;
    }
    chat.messages.forEach((msg,i)=>{
      UI.addBubble(msg.role, msg.content);
      if (msg.role==='assistant'&&i===chat.messages.length-1) UI.addMessageActions(c.lastElementChild);
    });
    UI.scrollToBottom(false);
  },
  renderModelPill() {
    const lbl = document.getElementById('model-pill-label');
    if (lbl) lbl.textContent = state.model;
  },
  renderChatList() {
    const list=document.getElementById('chat-list'); list.innerHTML='';
    const newChatTitles=new Set(Object.values(STRINGS).map(s=>s.newChatTitle).filter(Boolean));
    state.chats.forEach(chat => {
      const item=document.createElement('div');
      item.className='chat-item'+(chat.id===state.activeChatId?' active':'');
      item.onclick=()=>Chat.switchTo(chat.id);
      const displayTitle=newChatTitles.has(chat.title)?t('newChatTitle'):chat.title;
      item.innerHTML=`<div class="ci-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <div class="ci-title">${Renderer.escHtml(displayTitle)}</div>
        <button class="ci-del" onclick="Chat.delete('${chat.id}',event)" title="${t('deleteChat')}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`;
      list.appendChild(item);
    });
  },
  updateMemoryBadge() {
    const count=state.memory.length, badge=document.getElementById('mem-badge');
    if (badge) { badge.textContent=count; badge.style.display=count>0?'inline-flex':'none'; }
    document.getElementById('brain-btn')?.classList.toggle('has-mem',count>0);
  }
};

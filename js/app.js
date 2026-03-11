/* ─── App ────────────────────────────────────────────── */
const App = {
  async enter() {
    document.getElementById('key-screen').classList.add('hidden');
    document.getElementById('app').classList.add('visible');
    await Keys._loadModels();
    if (!state.chats.length) Chat.create();
    else { UI.renderChatList(); UI.renderMessages(); UI.updateTopbar(); }
    UI.updateMemoryBadge(); UI.renderModelPill(); UI.initScrollDetection();
    requestAnimationFrame(drawChatHoneycomb);
    window.addEventListener('resize', ()=>requestAnimationFrame(drawChatHoneycomb),{passive:true});
  }
};

/* ─── Bootstrap ─────────────────────────────────────── */
async function init() {
  drawHoneycomb();
  Theme.apply(localStorage.getItem(KEYS.KEYS_MAP.THEME)||'auto');
  I18n.load();
  state.honeycomb = localStorage.getItem('pollen_honeycomb') !== '0';
  state.keys   = Store.load(KEYS.KEYS_MAP.KEYS, []);
  state.memory = Store.load(KEYS.KEYS_MAP.MEMORY, []);
  state.chats  = Store.load(KEYS.KEYS_MAP.CHATS, []);
  state.model  = localStorage.getItem(KEYS.KEYS_MAP.MODEL)||'nova-fast';
  const savedKey=localStorage.getItem(KEYS.KEYS_MAP.ACTIVE_KEY);
  const savedChat=localStorage.getItem(KEYS.KEYS_MAP.ACTIVE_CHAT);
  if (savedKey&&state.keys.includes(savedKey)) {
    state.activeKey=savedKey;
    state.activeChatId=savedChat&&state.chats.find(c=>c.id===savedChat) ? savedChat : (state.chats[0]?.id||null);
    const valid=await API.validateKey(savedKey);
    if (!valid) { UI.showExpiredBanner(); return; }
    App.enter();
  }
}
init();
</script>

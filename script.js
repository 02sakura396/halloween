(() => {
  let config = { targetUrl: 'https://www.yahoo.co.jp/', password: 'halloween', heroImage: 'hero.jpg' };
  const form = document.getElementById('gateForm');
  const pw = document.getElementById('password');
  const msg = document.getElementById('message');
  const toggle = document.getElementById('togglePw');
  const submitBtn = document.getElementById('submitBtn');
  const heroImgEl = document.getElementById('heroImage');

  // 設定の読込（ローカルファイルで開く場合は fetch が失敗することがあります）
  fetch('./config.json', { cache: 'no-store' })
    .then(r => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      if (data && typeof data === 'object') config = { ...config, ...data };
    })
    .catch(() => {
      // 何もしない: デフォルト設定で動作
    })
    .finally(() => {
      if (heroImgEl && config.heroImage) {
        heroImgEl.src = String(config.heroImage);
      }
    });

  toggle.addEventListener('click', () => {
    const type = pw.getAttribute('type') === 'password' ? 'text' : 'password';
    pw.setAttribute('type', type);
    toggle.textContent = type === 'password' ? '👀' : '🙈';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = pw.value.trim();
    msg.textContent = '';
    msg.classList.remove('error', 'success');
    pw.classList.remove('shake');

    if (!value) {
      msg.textContent = 'パスワードを入れてね！';
      msg.classList.add('error');
      pw.classList.add('shake');
      return;
    }

    submitBtn.disabled = true;

    const ok = value === String(config.password || '');
    if (ok) {
      msg.textContent = 'ようこそ！お菓子あげるね🍬';
      msg.classList.add('success');
      setTimeout(() => {
        window.location.href = String(config.targetUrl || 'https://www.yahoo.co.jp/');
      }, 500);
    } else {
      msg.textContent = 'ちがうみたい…もう一回試してね';
      msg.classList.add('error');
      pw.classList.add('shake');
      submitBtn.disabled = false;
    }
  });
})();



function createAndRenderRateCard() {
  // 1. 检查页面是否有侧边栏
  const asideContent = document.getElementById('aside-content');
  if (!asideContent) return;

  // 2. 避免重复创建
  if (document.getElementById('card-rate-widget')) return;

  // 3. 创建卡片容器
  const rateCard = document.createElement('div');
  rateCard.className = 'card-widget card-rate-widget';
  rateCard.id = 'card-rate-widget';

  rateCard.innerHTML = `
    <div class="item-headline">
      <i class="fas fa-money-bill-wave"></i>
      <span>实时汇率监测</span>
    </div>
    <div class="rate-box">
      <div class="rate-card-item">
        <div class="rate-flag">🇺🇸 <span>USD / CNY</span></div>
        <div class="rate-num" id="usd-cny">加载中...</div>
      </div>
      <div class="rate-card-item">
        <div class="rate-flag">🇭🇰 <span>HKD / CNY</span></div>
        <div class="rate-num" id="hkd-cny">加载中...</div>
      </div>
      <div class="rate-foot">
        <span id="rate-time-text">更新中...</span>
        <i class="fas fa-sync-alt rate-refresh-btn" id="rate-refresh-icon" onclick="fetchExchangeRates()" title="刷新汇率"></i>
      </div>
    </div>
  `;

  // 4. 将卡片插入到侧边栏的第 2 个位置（个人信息卡片下方）
  if (asideContent.children.length > 1) {
    asideContent.insertBefore(rateCard, asideContent.children[1]);
  } else {
    asideContent.appendChild(rateCard);
  }

  // 5. 拉取实时汇率
  fetchExchangeRates();
}

async function fetchExchangeRates() {
  const usdEl = document.getElementById('usd-cny');
  const hkdEl = document.getElementById('hkd-cny');
  const timeEl = document.getElementById('rate-time-text');
  const iconEl = document.getElementById('rate-refresh-icon');

  if (!usdEl || !hkdEl) return;

  if (iconEl) iconEl.classList.add('fa-spin');

  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();

    if (data && data.result === 'success') {
      const usdToCny = data.rates.CNY;
      const usdToHkd = data.rates.HKD;
      const hkdToCny = usdToCny / usdToHkd;

      usdEl.innerText = usdToCny.toFixed(4);
      hkdEl.innerText = hkdToCny.toFixed(4);

      const now = new Date();
      timeEl.innerText = `更新于 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    } else {
      throw new Error('API Error');
    }
  } catch (err) {
    usdEl.innerText = '失败';
    hkdEl.innerText = '失败';
    timeEl.innerText = '网络异常';
  } finally {
    if (iconEl) iconEl.classList.remove('fa-spin');
  }
}

// 页面加载和 PJAX 切换时自动挂载
document.addEventListener('DOMContentLoaded', createAndRenderRateCard);
document.addEventListener('pjax:complete', createAndRenderRateCard);
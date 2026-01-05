// Popup Script - Settings Handler
document.getElementById('start_btn').addEventListener('click', startMonitoring);
document.getElementById('stop_btn').addEventListener('click', stopMonitoring);

window.addEventListener('load', loadSettings);

function startMonitoring() {
  const webhook = document.getElementById('webhook_url').value;
  const message = document.getElementById('custom_message').value;
  const interval = document.getElementById('monitor_interval').value || 15;
  
  if (!webhook) {
    alert('⚠️ Please enter webhook URL first!');
    return;
  }
  
  chrome.storage.local.set({
    webhook_url: webhook,
    custom_message: message,
    monitor_interval: parseInt(interval)
  });
  
  chrome.runtime.sendMessage({
    type: 'START_MONITOR',
    settings: {
      webhook_url: webhook,
      custom_message: message,
      interval: parseInt(interval)
    }
  }, (response) => {
    updateStatus('RUNNING', true);
    console.log('▶️ Monitoring started');
  });
}

function stopMonitoring() {
  chrome.runtime.sendMessage({ type: 'STOP_MONITOR' }, (response) => {
    updateStatus('STOPPED', false);
    console.log('⏹️ Monitoring stopped');
  });
}

function loadSettings() {
  chrome.storage.local.get([
    'webhook_url',
    'custom_message',
    'monitor_interval',
    'processedNumbers'
  ], (result) => {
    if (result.webhook_url) {
      document.getElementById('webhook_url').value = result.webhook_url;
    }
    if (result.custom_message) {
      document.getElementById('custom_message').value = result.custom_message;
    }
    if (result.monitor_interval) {
      document.getElementById('monitor_interval').value = result.monitor_interval;
    }
    if (result.processedNumbers) {
      document.getElementById('lead_count').textContent = result.processedNumbers.length;
    }
  });
}

function updateStatus(text, isActive) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = `Status: ${text}`;
  statusEl.className = isActive ? 'status active' : 'status inactive';
}

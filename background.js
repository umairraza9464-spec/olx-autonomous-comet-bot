// OLX Autonomous Bot - Background Service Worker with Deduplication
// 15 SEC INTERVAL + NO REPEATED CUSTOMERS

const API_KEYS = {
  groq: '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',
  gemini: 'AIzaSyDhFMt5eDk-bqKi993xZGcbyNVflmXB5Jg'
};

let monitoringActive = false;
let processedListings = new Set();
let processedNumbers = new Set(); // DEDUPLICATION for phone numbers

chrome.runtime.onInstalled.addListener(() => {
  console.log('🚗 OLX Auto Lead Bot v2 - INSTALLED WITH DEDUPLICATION');
  // Load previously processed numbers from storage
  chrome.storage.local.get(['processedNumbers'], (result) => {
    if (result.processedNumbers) {
      processedNumbers = new Set(result.processedNumbers);
      console.log(`✅ Loaded ${processedNumbers.size} previously processed numbers`);
    }
  });
  chrome.storage.local.set({ monitoringActive: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'START_MONITOR') {
    startMonitoring(request.settings);
    sendResponse({ status: 'monitoring_started' });
  } else if (request.type === 'STOP_MONITOR') {
    stopMonitoring();
    sendResponse({ status: 'monitoring_stopped' });
  } else if (request.type === 'LEAD_FOUND') {
    handleLeadData(request.data);
    sendResponse({ status: 'lead_saved' });
  }
});

function startMonitoring(settings) {
  monitoringActive = true;
  console.log('▶️ Monitoring started with 15 SEC INTERVAL + DEDUPLICATION');
  
  // 15 SECONDS interval instead of 60
  setInterval(() => {
    if (monitoringActive) {
      scanOLXListings(settings);
    }
  }, 15000); // 15 seconds
}

function stopMonitoring() {
  monitoringActive = false;
  console.log('⏹️ Monitoring stopped');
}

async function scanOLXListings(settings) {
  try {
    const response = await fetch(settings.searchUrl);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const listings = doc.querySelectorAll('[data-listing-id]');
    let newCount = 0;
    
    listings.forEach(listing => {
      const id = listing.getAttribute('data-listing-id');
      if (!processedListings.has(id)) {
        processedListings.add(id);
        newCount++;
        
        const listingUrl = listing.querySelector('a')?.href;
        if (listingUrl) {
          chrome.tabs.create({ url: listingUrl, active: false }, (tab) => {
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id, { type: 'PROCESS_LISTING' });
            }, 3000);
          });
        }
      }
    });
    
    if (newCount > 0) {
      notifyNewListings(newCount);
    }
  } catch (e) {
    console.error('Scan error:', e);
  }
}

async function handleLeadData(data) {
  // CHECK IF NUMBER ALREADY PROCESSED
  if (processedNumbers.has(data.mobile)) {
    console.log('⚠️ DUPLICATE DETECTED - SKIPPING:', data.mobile);
    notifyDuplicate(data.mobile);
    return; // DON'T PROCESS
  }
  
  const webhookUrl = await getWebhookUrl();
  if (!webhookUrl) return;
  
  try {
    const payload = {
      DATE: new Date().toISOString().split('T')[0],
      NAME: data.name || '',
      MOBILE: data.mobile || '',
      REG_NO: data.regNo || '',
      CAR_MODEL: data.model || '',
      VARIANT: data.variant || '',
      YEAR: data.year || '',
      KM: data.km || '',
      ADDRESS: data.address || '',
      FOLLOW_UP: '',
      SOURCE: 'OLX',
      CONTEXT: '',
      LICENSE: '',
      REMARK: ''
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      // ADD TO PROCESSED LIST
      processedNumbers.add(data.mobile);
      // SAVE TO STORAGE (persist across restart)
      chrome.storage.local.set({
        processedNumbers: Array.from(processedNumbers)
      });
      
      console.log('✅ NEW LEAD - Saved to sheet:', data.mobile);
      console.log(`📊 Total processed: ${processedNumbers.size}`);
      notifyLeadSaved(data);
    }
  } catch (e) {
    console.error('Webhook error:', e);
  }
}

function notifyNewListings(count) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: '🚗 New Listings Found!',
    message: `${count} fresh listing(s) detected. Processing...`,
    priority: 2
  });
}

function notifyLeadSaved(lead) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: '✅ UNIQUE LEAD SAVED!',
    message: `${lead.model} - ${lead.mobile}`,
    priority: 2
  });
}

function notifyDuplicate(mobile) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: '⚠️ Duplicate Skipped',
    message: `${mobile} already in sheet`,
    priority: 1
  });
}

async function getWebhookUrl() {
  return new Promise(resolve => {
    chrome.storage.local.get(['webhook_url'], result => {
      resolve(result.webhook_url || null);
    });
  });
}

// OLX Content Script - Page Processor
console.log('🚗 Content script loaded on OLX');

// Listen for background messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'PROCESS_LISTING') {
    console.log('🗐️ Processing listing...');
    processListing();
  }
});

function processListing() {
  try {
    const data = {
      url: window.location.href,
      name: extractOwnerName(),
      model: extractCarModel(),
      variant: extractVariant(),
      year: extractYear(),
      km: extractKM(),
      price: extractPrice(),
      address: extractAddress(),
      mobile: null,
      regNo: null,
      context: document.body.innerText.substring(0, 500)
    };

    console.log('🗐️ Listing data extracted:', data);
    
    // Monitor for mobile number in chat
    monitorChat(data);
  } catch (e) {
    console.error('Error processing listing:', e);
  }
}

function extractOwnerName() {
  const nameEl = document.querySelector('[data-aut-id="itemSellerName"]') ||
                 document.querySelector('[class*="seller"]') ||
                 document.querySelector('h1');
  return nameEl?.textContent?.trim().substring(0, 50) || 'Unknown';
}

function extractCarModel() {
  const titleEl = document.querySelector('h1') || 
                  document.querySelector('[data-aut-id="itemTitle"]');
  const title = titleEl?.textContent || '';
  const match = title.match(/(\w+\s+\w+)/i);
  return match ? match[0] : 'Unknown';
}

function extractVariant() {
  const text = document.body.innerText;
  const match = text.match(/Variant[:\s]+(\w+)/i);
  return match ? match[1] : 'Unknown';
}

function extractYear() {
  const text = document.body.innerText;
  const match = text.match(/(202\d|201\d|200\d|199\d)/i);
  return match ? match[0] : 'Unknown';
}

function extractKM() {
  const text = document.body.innerText;
  const match = text.match(/(\d+,?\d*\s*km)/i);
  return match ? match[0] : 'Unknown';
}

function extractPrice() {
  const priceEl = document.querySelector('[data-aut-id="itemPrice"]');
  return priceEl?.textContent?.trim() || 'Unknown';
}

function extractAddress() {
  const addrEl = document.querySelector('[data-aut-id="item-location"]');
  return addrEl?.textContent?.trim() || 'Unknown';
}

function monitorChat(listingData) {
  // Click "Show Phone" button
  const showPhoneBtn = document.querySelector('[data-aut-id="chatButtonShowPhone"]') ||
                       document.querySelector('button[class*="phone"]') ||
                       Array.from(document.querySelectorAll('button')).find(btn => 
                         btn.textContent.toLowerCase().includes('show') && 
                         btn.textContent.toLowerCase().includes('phone')
                       );
  
  if (showPhoneBtn) {
    console.log('🗐️ Clicking Show Phone button...');
    showPhoneBtn.click();
    
    // Wait for phone to appear in chat
    setTimeout(() => {
      const mobilePattern = /(\+91|0)?[6-9]\d{9}/g;
      const pageText = document.body.innerText;
      const mobiles = pageText.match(mobilePattern);
      
      if (mobiles && mobiles.length > 0) {
        const mobile = mobiles[0];
        console.log('🗐️ Mobile extracted:', mobile);
        
        listingData.mobile = mobile;
        
        // Send to background.js
        chrome.runtime.sendMessage({
          type: 'LEAD_FOUND',
          data: listingData
        }, (response) => {
          console.log('✅ Lead saved:', response);
        });
      }
    }, 2000);
  }
}

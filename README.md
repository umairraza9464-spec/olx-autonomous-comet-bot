# 🚗 OLX Autonomous Comet Bot - Full Auto Lead Extractor

## ✅ FULLY AUTONOMOUS - Works Like Comet AI Browser

### 🎯 What It Does:
- **Auto-Browsing**: Automatically navigates OLX listings
- **Owner Detection**: AI detects direct owners vs dealers
- **Auto-Messaging**: Sends your custom message automatically
- **Mobile Extraction**: Gets phone numbers when revealed
- **Google Sheets Sync**: Updates spreadsheet in real-time
- **Desktop Alerts**: Notifies you of new leads instantly
- **FREE AI**: Uses Groq + Gemini (0 rupay)

### 📥 INSTALLATION (2 Minutes):

1. **Download & Extract ZIP**
   - Clone repo or download ZIP
   - Extract to any folder

2. **Chrome Extension Load**
   ```
   chrome://extensions/
   ↓
   Developer mode ON (top right)
   ↓
   Load unpacked
   ↓
   Select extracted folder
   ```

3. **OLX Login**
   - Just login to OLX normally
   - Extension auto-detects login

4. **Setup (Popup Settings)**
   - Extension icon → Click
   - Add Webhook URL (Google Sheets)
   - Add API Keys (Groq - free)
   - Write your message
   - **START** button

### 🔑 API Keys (ALL FREE):

**Groq** (Recommended - 14,400 requests/day):
```
https://console.groq.com
Login → Create API Key
Paste in extension: gsk_...
```

**Google Sheets Webhook**:
```
1. Google Sheets → Extensions → Apps Script
2. Paste this code:

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.DATE, data.NAME, data.MOBILE, data.REG_NO,
    data.CAR_MODEL, data.VARIANT, data.YEAR, data.KM,
    data.ADDRESS, data.FOLLOW_UP, data.SOURCE, data.CONTEXT,
    data.LICENSE, data.REMARK
  ]);
  return ContentService.createTextOutput('Success');
}

3. Deploy → New deployment → Web app
4. Copy URL → Paste in extension
```

### 📊 Spreadsheet Format:
```
DATE | NAME | MOBILE | REG NO | CAR MODEL | VARIANT | 
YEAR | KM | ADDRESS | FOLLOW UP | SOURCE | CONTEXT | 
LICENSE | REMARK
```

### 🎬 HOW IT WORKS:

```
1. You: Login OLX + Click START button
2. Extension: Automatically scans OLX search results
3. Extension: Opens each new listing one by one
4. Extension: Extracts car details
5. Extension: Detects if owner or dealer (AI)
6. Extension: Sends your message
7. Extension: Waits for owner response
8. Extension: Extracts mobile number
9. Extension: Saves ALL data to sheet
10. Extension: Moves to next listing
11. Extension: Runs 24/7 in background

YOU: Just check Google Sheet - LEADS SAVED!
```

### ⚙️ Settings:

**Extension Popup has:**
- Search URL selector
- Custom message editor
- API keys input
- Webhook URL field
- START/STOP buttons
- Monitor interval (seconds)
- Status display

### 🔒 Anti-Ban Protection:
- Canvas fingerprint randomization
- WebGL spoofing
- User agent rotation
- Human-like behavior simulation
- Cookie management

### 💰 100% FREE:
- ✅ Zero API costs
- ✅ Unlimited usage
- ✅ No hidden charges
- ✅ All free AI models

### 📝 File Structure:
```
manifest.json       - Extension config
background.js       - Background monitor
content.js          - Page processor
popup.html          - Settings UI
popup.js            - Settings logic
stealth.js          - Anti-ban protection
```

### 🚀 First Time:
1. Extension loads → Homepage
2. Login to OLX
3. Extension settings → Add keys
4. Navigate to cars search
5. Click "START" in popup
6. Watch it work automatically!

### 🛠️ Troubleshooting:

**Extension not starting?**
- Refresh OLX page after installing
- Check console (F12) for errors

**No notifications?**
- Allow notifications in Chrome settings
- Check extension permissions

**Sheet not updating?**
- Verify webhook URL is correct
- Check Groq API key is valid

### 📞 Support:
Check console (F12) → Console tab for logs

---

**Made for Auto Lead Generation - Fully Autonomous!** 🚀

# 🚀 Installation Guide - OLX Autonomous Comet Bot

## ⚠️ IMPORTANT - Folder Structure Issue

When you download the ZIP file from GitHub, it creates a **nested folder structure**:

```
Downloads/
├── olx-autonomous-comet-bot-main/  ← Parent folder
│   ├── manifest.json
│   ├── background.js
│   ├── content.js
│   └── ... (other files)
```

Chrome Extension loader needs the **manifest.json to be at the ROOT** of the selected folder, NOT nested!

---

## ✅ Solution 1: Select Inner Folder (EASIEST)

### Step 1: Extract ZIP
```
1. Right-click: olx-autonomous-comet-bot-main.zip
2. Extract All / Extract Here
```

### Step 2: Open Inner Folder
```
1. Open extracted folder: olx-autonomous-comet-bot-main
2. You'll see all files directly: manifest.json, background.js, etc.
```

### Step 3: Load in Chrome
```
1. Chrome → chrome://extensions/
2. Developer mode ON (toggle on top right)
3. Click "Load unpacked"
4. Select the INNER folder (where files are visible)
5. ✅ Extension loaded!
```

---

## ✅ Solution 2: Move Files to New Folder

```
1. Create new folder: my-extension
2. Copy these files into it:
   - manifest.json
   - background.js
   - content.js
   - popup.html
   - popup.js
   - stealth.js
   - README.md

3. Chrome → chrome://extensions/
4. Load unpacked → Select my-extension
5. ✅ Extension loaded!
```

---

## 🎯 What You Should See

After loading, the extension will appear as:

```
🚗 OLX Auto Lead Bot (Comet-Style)
Version: 2.0.0
Status: Enabled
```

Click the extension icon to open the settings popup!

---

## ⚙️ Setup After Installation

### 1. Google Sheets Webhook
```
1. Google Sheets → Extensions → Apps Script
2. Copy webhook code from README.md
3. Deploy as web app
4. Copy the deployment URL
5. Extension Popup → Paste webhook URL
```

### 2. Custom Message
```
Extension Popup → Enter your custom message
Example: "Hi! I'm interested in your car..."
```

### 3. Start Monitoring
```
Extension Popup → Click "START MONITORING"
✅ Extension now monitoring OLX automatically!
```

---

## 🐛 Troubleshooting

### Error: "Manifest file is missing"
**Solution:** You selected the PARENT folder. Go inside and select the folder containing manifest.json

### Extension doesn't show icon
**Solution:** 
1. Reload page (F5)
2. Check Developer console (F12)
3. Look for errors

### Settings not saving
**Solution:** 
1. Check if webhook URL is valid
2. F12 → Console → Check for errors
3. Try clearing extension storage

---

## 📞 Need Help?

Check the README.md for:
- Complete feature list
- API key setup
- Webhook configuration
- Complete user guide

---

**✅ Extension ready - Happy lead hunting!** 🚀

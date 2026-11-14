# POTHIK (পথিক) — Travel Platform

**Tagline:** Every Road Leads Somewhere.  
**Official Contact / WhatsApp:** `01576466092`

---

## 1-Click Deploy to Render (Free Web Service)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

### Quick Setup Steps
1. Push or export this project to your GitHub repository.
2. Click **Deploy to Render** above (or open `https://render.com/deploy?repo=YOUR_GITHUB_REPO_URL`).
3. Render automatically reads `render.yaml` (`Free` plan, Node 22, Singapore region).
4. Paste your **`GEMINI_API_KEY`** when prompted and click **Apply**.
5. After deployment, add your new `*.onrender.com` URL to **Firebase Console → Authentication → Settings → Authorized domains**.

---

## Android Mobile App Setup

### Option A: Instant Installable Android App (PWA)
- Open the live Render website on Android Chrome and tap **Install App** (or Chrome menu → **Add to Home screen**).

### Option B: Android APK / Play Store `.aab` via PWABuilder
1. Open [pwabuilder.com](https://www.pwabuilder.com) and enter your live Render URL.
2. Click **Package for Stores → Android** to download a signed `.apk` / `.aab` package.
3. Optional: Set `ANDROID_SHA256_FINGERPRINT` in Render Environment Variables to verify `/.well-known/assetlinks.json`.

### Option C: Capacitor Android Studio Build
```bash
npm install
npm run build
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap add android
npx cap sync android
npx cap open android
```

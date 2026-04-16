<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d43da60e-beea-4dfe-9e03-80d456376656

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Domain Routing (Railway + Hostinger)

To serve this app on `ben.poersch.online`, use this setup:

1. **Railway service**
   - Open your service in Railway.
   - Go to **Settings → Domains**.
   - Add custom domain: `ben.poersch.online`.
   - Railway will show a target host (typically a `*.up.railway.app` hostname).

2. **Hostinger DNS zone**
   - Open DNS Zone Editor for `poersch.online`.
   - Add a **CNAME** record:
     - **Name/Host:** `ben`
     - **Target/Points to:** the Railway target hostname from step 1
     - **TTL:** default/automatic
   - Remove conflicting `A/AAAA/CNAME` records for `ben` if present.

3. **App URL environment variable**
   - In Railway variables, set:
     - `NEXT_PUBLIC_SITE_URL=https://ben.poersch.online`
   - `NEXT_PUBLIC_SITE_URL` must be a full absolute URL including the scheme (`https://`).
   - Do **not** leave it empty and do **not** use only a bare domain like `ben.poersch.online`, because the app parses this value with `new URL(...)`.
   - Use only the site origin (no path), for example:
     - ✅ `https://ben.poersch.online`
     - ❌ `ben.poersch.online`
     - ❌ `https://ben.poersch.online/some/path`
   - Redeploy the service.

4. **Verify**
   - Wait for DNS propagation (usually a few minutes, sometimes longer).
   - Check:
     - `https://ben.poersch.online`
     - SSL certificate status in Railway domain settings.

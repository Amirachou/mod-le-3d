# Castle AR Test

This Expo app opens a hosted Castle model in AR using only React Native `Linking`.

- Android uses `castle.glb` with Google Scene Viewer.
- iPhone/iOS uses `castle.usdz` with AR Quick Look.
- No ViroReact, Unity, ARKit SDK, ARCore SDK, or complex AR library is used.

## Model Files

Put both model files in:

```text
public/models/castle.glb
public/models/castle.usdz
```

After deploying to Vercel, these files should be available at:

```text
https://your-project.vercel.app/models/castle.glb
https://your-project.vercel.app/models/castle.usdz
```

## Update App.js

In `App.js`, replace `YOUR-VERCEL-DOMAIN` with your real Vercel project domain:

```js
const CASTLE_GLB_URL = 'https://YOUR-VERCEL-DOMAIN.vercel.app/models/castle.glb';
const CASTLE_USDZ_URL = 'https://YOUR-VERCEL-DOMAIN.vercel.app/models/castle.usdz';
```

Example:

```js
const CASTLE_GLB_URL = 'https://mod-le-3d.vercel.app/models/castle.glb';
const CASTLE_USDZ_URL = 'https://mod-le-3d.vercel.app/models/castle.usdz';
```

## Push to GitHub

Open a terminal in this project folder:

```sh
git add .
git commit -m "Support Android and iOS AR models"
git push
```

If this is a new checkout with no remote yet:

```sh
git remote add origin https://github.com/Amirachou/mod-le-3d.git
git branch -M main
git push -u origin main
```

## Deploy to Vercel

1. Go to `https://vercel.com`.
2. Sign in with GitHub.
3. Click `Add New Project`.
4. Import the GitHub repository.
5. Keep the default settings.
6. Click `Deploy`.
7. After deploy, test these URLs in a browser:

```text
https://your-project.vercel.app/models/castle.glb
https://your-project.vercel.app/models/castle.usdz
```

## Run the Expo App

Install dependencies:

```sh
npm install
```

Start Expo:

```sh
npx expo start
```

## Test on Android

1. Install Expo Go on an Android phone.
2. Make sure Google Play Services for AR is installed or updated.
3. Scan the Expo QR code with Expo Go.
4. Tap `Open Castle in AR`.
5. Google Scene Viewer should open `castle.glb`.

## Test on iPhone/iOS

1. Install Expo Go on an iPhone.
2. Scan the Expo QR code with Expo Go.
3. Tap `Open Castle in AR`.
4. iOS should open the hosted `castle.usdz` file with AR Quick Look.

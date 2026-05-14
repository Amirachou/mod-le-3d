# AR Model Test

This Expo app opens hosted 3D models in AR using only React Native `Linking`.

- Android uses `free__la_tour_eiffel.glb` with Google Scene Viewer.
- iPhone/iOS uses `Clock_Tower_Big_Ben.usdz` with AR Quick Look.
- No ViroReact, Unity, ARKit SDK, ARCore SDK, or complex AR library is used.

## Model Files

The real model files are:

```text
public/models/free__la_tour_eiffel.glb
public/models/Clock_Tower_Big_Ben.usdz
```

After deploying to Vercel, these files should be available at:

```text
https://your-project.vercel.app/models/free__la_tour_eiffel.glb
https://your-project.vercel.app/models/Clock_Tower_Big_Ben.usdz
```

## Update App.js

In `App.js`, replace `YOUR-VERCEL-DOMAIN` with your real Vercel project domain:

```js
const ANDROID_GLB_URL = 'https://YOUR-VERCEL-DOMAIN.vercel.app/models/free__la_tour_eiffel.glb';
const IOS_USDZ_URL = 'https://YOUR-VERCEL-DOMAIN.vercel.app/models/Clock_Tower_Big_Ben.usdz';
```

Example:

```js
const ANDROID_GLB_URL = 'https://mod-le-3d.vercel.app/models/free__la_tour_eiffel.glb';
const IOS_USDZ_URL = 'https://mod-le-3d.vercel.app/models/Clock_Tower_Big_Ben.usdz';
```

## Deploy to Vercel

1. Push the project to GitHub.
2. Go to `https://vercel.com`.
3. Sign in with GitHub.
4. Click `Add New Project`.
5. Import the GitHub repository.
6. Keep the default settings.
7. Click `Deploy`.
8. After deploy, test these URLs in a browser:

```text
https://your-project.vercel.app/models/free__la_tour_eiffel.glb
https://your-project.vercel.app/models/Clock_Tower_Big_Ben.usdz
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
4. Tap `Open Model in AR`.
5. Google Scene Viewer should open the hosted GLB model.

## Test on iPhone/iOS

1. Install Expo Go on an iPhone.
2. Scan the Expo QR code with Expo Go.
3. Tap `Open Model in AR`.
4. iOS should open the hosted USDZ file with AR Quick Look.

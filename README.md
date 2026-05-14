# GLB Hosting With GitHub, Vercel, and Expo

This project keeps the GLB file at:

```text
public/models/free__la_tour_eiffel.glb
```

When deployed to Vercel, files inside `public` are available from the root of your site. The final direct GLB URL will look like:

```text
https://your-project.vercel.app/models/free__la_tour_eiffel.glb
```

## 1. Push this project to GitHub

Open a terminal in this project folder, then run:

```sh
git init
git add .
git commit -m "Prepare GLB model for Vercel hosting"
git branch -M main
git remote add origin https://github.com/Amirachou/mod-le-3d.git
git push -u origin main
```

If Git says the remote already exists, run:

```sh
git remote set-url origin https://github.com/Amirachou/mod-le-3d.git
git push -u origin main
```

## 2. Import the project into Vercel

1. Go to `https://vercel.com`.
2. Sign in with GitHub.
3. Click `Add New Project`.
4. Choose the GitHub repository `mod-le-3d`.
5. Keep the default settings.
6. Click `Deploy`.

## 3. Get the direct GLB URL

After Vercel finishes deploying, open your project domain. It will look similar to:

```text
https://your-project.vercel.app
```

Add `/models/free__la_tour_eiffel.glb` to the end:

```text
https://your-project.vercel.app/models/free__la_tour_eiffel.glb
```

Open that URL in a browser. If the file downloads or opens, the URL is correct.

## 4. Paste the URL into App.js

In `App.js`, replace:

```js
const MODEL_GLB_URL = 'https://YOUR-VERCEL-DOMAIN.vercel.app/models/free__la_tour_eiffel.glb';
```

with your real Vercel URL, for example:

```js
const MODEL_GLB_URL = 'https://mod-le-3d.vercel.app/models/free__la_tour_eiffel.glb';
```

## 5. Run the Expo app

Install dependencies:

```sh
npm install
```

Start Expo:

```sh
npx expo start
```

## 6. Test the AR button on Android

1. Install Expo Go on an Android phone.
2. Make sure Google Play Services for AR is installed or updated.
3. Scan the Expo QR code with Expo Go.
4. Tap `Open Model in AR`.
5. Google Scene Viewer should open the hosted GLB model.

This app intentionally stays simple and uses `Linking.openURL` with Google Scene Viewer for Android AR.

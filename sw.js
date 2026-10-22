// ビルドで自動生成（src/pwa/serviceWorker.ts）。手で編集しない
const CACHE = 'pomodoro-town-73c3bfbb75cb';
const FILES = [
  "./",
  "./apple-touch-icon.png",
  "./assets/main-CMwQn2ey.js",
  "./assets/main-Dxr2KxIg.css",
  "./assets/timer-Be1UWYug.js",
  "./assets/web-BodkCoG4.js",
  "./assets/web-CKkWDziM.js",
  "./assets/web-D13CYlHT.js",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./index.html",
  "./manifest.webmanifest"
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('pomodoro-town-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('./index.html', { ignoreSearch: true }).then((r) => r || caches.match('./'))));
    return;
  }
  event.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});

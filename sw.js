const CACHE_NAME = 'eduplan-v3'; // Increment this number to trigger the update
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
];

// Install event: Cache the assets
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force the waiting service worker to become the active one
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate event: Clean up old caches and take control
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim()); // Take control of all open pages immediately
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch event: Serve from cache or network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// Listen for skipWaiting message from the frontend
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

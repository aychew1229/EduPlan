const CACHE_NAME = 'eduplan-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png', // Add your local icon
  './sw.js',
  // External Google Fonts - these must be cached while online
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching shell assets');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // Return cached asset if found, otherwise try network
      return res || fetch(e.request);
    })
  );
});

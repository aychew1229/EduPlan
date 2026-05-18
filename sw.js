const CACHE_NAME = 'eduplan-v1.2';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  'icon.png', // Ensure this file exists!
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap'
];

// 1. Install Phase: Cache everything for offline use
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force the new SW to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Caching assets for offline lock');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Phase: Delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Take control of the page immediately
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch Phase: Network-First Strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If online, update the cache with the newest version of the file
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.method === 'GET') {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // If offline, look in the cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Fallback to index.html for navigation if nothing is found
          if (event.request.mode === 'navigate') {
            return caches.match('index.html');
          }
        });
      })
  );
});

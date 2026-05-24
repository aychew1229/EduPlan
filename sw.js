const CACHE_NAME = 'eduplan-v1.8'; // Updated version to force clear old broken caches

const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  // Caching the exact remote icon used in your manifest.json
  'https://cdn-icons-png.flaticon.com/512/3534/3534033.png',
  // Caching the exact font package stylesheet requested by your index.html
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap'
];

// 1. Install Phase: Cache all required assets safely
self.addEventListener('install', (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SW: Pre-caching static assets');
      // Using map with a catch to prevent a single file failure from killing the worker
      return Promise.all(
        ASSETS_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.error('SW: Failed to cache asset:', url, err);
          });
        })
      );
    })
  );
});

// 2. Activate Phase: Purge historical broken caches
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Dropping outdated cache', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. Fetch Phase: Clean fallback routing for true offline operation
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // If we are online, dynamically save/update our assets cache
        if (event.request.method === 'GET' && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Triggered when completely offline
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // Redirect sub-routes or navigation issues directly to index page cache
          if (event.request.mode === 'navigate') {
            return caches.match('index.html') || caches.match('./');
          }
        });
      })
  );
});

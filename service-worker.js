const CACHE_NAME = 'skincare-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './service-worker.js',
  './img/1.png',
  './img/2.png',
  './img/3.png',
  './img/4.png',
  './img/5.png',
  './img/6.png',
  './img/7.png',
  './img/8.png',
  './img/9.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files...');
        // Cache files one by one to identify any problematic ones
        return Promise.all(
          urlsToCache.map(url => {
            return cache.add(url)
              .then(() => console.log('Cached:', url))
              .catch(error => {
                console.error('Failed to cache:', url, error);
                // Continue with other files even if one fails
                return Promise.resolve();
              });
          })
        );
      })
      .then(() => console.log('All files cached successfully!'))
      .catch(error => console.error('Cache installation failed:', error))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

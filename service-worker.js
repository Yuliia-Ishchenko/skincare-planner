const CACHE_NAME = 'skincare-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/img/1.png','/img/2.png','/img/3.png','/img/4.png',
  '/img/5.png','/img/6.png','/img/7.png','/img/8.png','/img/9.png',
 
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

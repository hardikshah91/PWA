var cacheName = 'staticPWA-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/images/thumbs/01.jpg',
  '/images/thumbs/02.jpg',
  '/images/thumbs/03.jpg',
  '/images/thumbs/04.jpg',
  '/images/thumbs/05.jpg',
  '/images/thumbs/06.jpg',
  '/images/thumbs/07.jpg',
  '/images/thumbs/08.jpg'
];

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(async function() {
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  }());
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(async function() {
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  }());
});

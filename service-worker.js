'use strict';

importScripts('serviceworker-cache-polyfill.js');

var cacheName = 'staticPWA-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  'images/thumbs/01.jpg',
  'images/thumbs/02.jpg',
  'images/thumbs/03.jpg',
  'images/thumbs/04.jpg',
  'images/thumbs/05.jpg',
  'images/thumbs/06.jpg',
  'images/thumbs/07.jpg',
  'images/thumbs/08.jpg'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll([
        '/',
        '/index.html',
        '/assets/css/main.css',
        '/assets/images/thumbs/01.jpg',
        '/assets/images/thumbs/02.jpg',
        '/assets/images/thumbs/03.jpg',
        '/assets/images/thumbs/04.jpg',
        '/assets/images/thumbs/05.jpg',
        '/assets/images/thumbs/06.jpg',
        '/assets/images/thumbs/07.jpg',
        '/assets/images/thumbs/08.jpg',
        '/assets/images/favicon-32x32.png'
      ]);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

var cacheName = 'v0.0.8';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/css/style-dark.css',
        '/js/script.js',
        '/icon.png',
        '/img/logo/logo_rlp-sms_2560.png',
        '/img/logo/logo_rlp-sms_2000.png',
        '/img/logo/logo_rlp-sms_1500.png',
        '/img/logo/logo_rlp-sms_1000.png',
        '/img/logo/logo_rlp-sms_500.png'
      ]))
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
      self.skipWaiting();
  }
});
var cacheName = 'v2.0.0.RC2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/css/style.css?'+cacheName,
        '/css/style-dark.css?'+cacheName,
        '/js/script.js?'+cacheName,
        '/icon.png',
        '/img/logo/logo_rlp-sms.svg'
      ]))
  );
});

self.addEventListener('activate', event => {
    // Remove old caches
      event.waitUntil(
        (async () => {
          const keys = await caches.keys();
          return keys.map(async (cache) => {
            if(cache !== cacheName) {
              console.log('Service Worker: Removing old cache: '+cache);
              return await caches.delete(cache);
            }
          })
        })()
      )
    })

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
      self.skipWaiting();
  }
});

var cacheName = 'v2.0.2';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        '/',
        '/index.html',
        '/service-worker.js?' + cacheName,
        '/css/style.css?' + cacheName,
        '/css/style-dark.css?' + cacheName,
        '/js/script.js?' + cacheName,
        '/js/bootstrap.min.js',
        '/js/moment-with-locales.min.js',
        '/js/popper.min.js',
        '/icon.png',
        '/img/logo/logo_rlp-sms.svg',
        '/fonts/lato-v23-latin-ext_latin-100.eot',
        '/fonts/lato-v23-latin-ext_latin-100.svg',
        '/fonts/lato-v23-latin-ext_latin-100.ttf',
        '/fonts/lato-v23-latin-ext_latin-100.woff',
        '/fonts/lato-v23-latin-ext_latin-100.woff2',
        '/fonts/lato-v23-latin-ext_latin-100italic.eot',
        '/fonts/lato-v23-latin-ext_latin-100italic.svg',
        '/fonts/lato-v23-latin-ext_latin-100italic.ttf',
        '/fonts/lato-v23-latin-ext_latin-100italic.woff',
        '/fonts/lato-v23-latin-ext_latin-100italic.woff2',
        '/fonts/lato-v23-latin-ext_latin-300.eot',
        '/fonts/lato-v23-latin-ext_latin-300.svg',
        '/fonts/lato-v23-latin-ext_latin-300.ttf',
        '/fonts/lato-v23-latin-ext_latin-300.woff',
        '/fonts/lato-v23-latin-ext_latin-300.woff2',
        '/fonts/lato-v23-latin-ext_latin-300italic.eot',
        '/fonts/lato-v23-latin-ext_latin-300italic.svg',
        '/fonts/lato-v23-latin-ext_latin-300italic.ttf',
        '/fonts/lato-v23-latin-ext_latin-300italic.woff',
        '/fonts/lato-v23-latin-ext_latin-300italic.woff2',
        '/fonts/lato-v23-latin-ext_latin-700.eot',
        '/fonts/lato-v23-latin-ext_latin-700.svg',
        '/fonts/lato-v23-latin-ext_latin-700.ttf',
        '/fonts/lato-v23-latin-ext_latin-700.woff',
        '/fonts/lato-v23-latin-ext_latin-700.woff2',
        '/fonts/lato-v23-latin-ext_latin-700italic.eot',
        '/fonts/lato-v23-latin-ext_latin-700italic.svg',
        '/fonts/lato-v23-latin-ext_latin-700italic.ttf',
        '/fonts/lato-v23-latin-ext_latin-700italic.woff',
        '/fonts/lato-v23-latin-ext_latin-700italic.woff2',
        '/fonts/lato-v23-latin-ext_latin-900.eot',
        '/fonts/lato-v23-latin-ext_latin-900.svg',
        '/fonts/lato-v23-latin-ext_latin-900.ttf',
        '/fonts/lato-v23-latin-ext_latin-900.woff',
        '/fonts/lato-v23-latin-ext_latin-900.woff2',
        '/fonts/lato-v23-latin-ext_latin-900italic.eot',
        '/fonts/lato-v23-latin-ext_latin-900italic.svg',
        '/fonts/lato-v23-latin-ext_latin-900italic.ttf',
        '/fonts/lato-v23-latin-ext_latin-900italic.woff',
        '/fonts/lato-v23-latin-ext_latin-900italic.woff2',
        '/fonts/lato-v23-latin-ext_latin-italic.eot',
        '/fonts/lato-v23-latin-ext_latin-italic.svg',
        '/fonts/lato-v23-latin-ext_latin-italic.ttf',
        '/fonts/lato-v23-latin-ext_latin-italic.woff',
        '/fonts/lato-v23-latin-ext_latin-italic.woff2',
        '/fonts/lato-v23-latin-ext_latin-regular.eot',
        '/fonts/lato-v23-latin-ext_latin-regular.svg',
        '/fonts/lato-v23-latin-ext_latin-regular.ttf',
        '/fonts/lato-v23-latin-ext_latin-regular.woff',
        '/fonts/lato-v23-latin-ext_latin-regular.woff2'
      ]))
  );
});

self.addEventListener('activate', event => {
  // Remove old caches
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      return keys.map(async (cache) => {
        if (cache !== cacheName) {
          console.log('Service Worker: Removing old cache: ' + cache);
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
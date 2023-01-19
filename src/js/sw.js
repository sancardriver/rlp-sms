var version = "v2.0.4" // increase for new version
var staticCacheName = version + "_pwa-static";
var dynamicCacheName = version + "_pwa-dynamic";
var urlsToCache = [
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
];

/*self.addEventListener('install', event => {
  console.log('Installing…');
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }, error => {
        console.error(`Service Worker installation failed: ${error}`);
      })
  );
});
*/

// https://stackoverflow.com/questions/52221805/any-way-yet-to-auto-update-or-just-clear-the-cache-on-a-pwa-on-ios
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    if (!cacheName.startsWith(staticCacheName) &&
                        !cacheName.startsWith(dynamicCacheName)) {
                        return true;
                    }
                }).map(function(cacheName) {
                    // completely deregister for ios to get changes too
                    console.log('deregistering Serviceworker')
                    if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.getRegistrations().then(function(registrations) {
                            registrations.map(r => {
                                r.unregister()
                            })
                        })
                        window.location.reload(true)
                    }

                    console.log('Removing old cache.', cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
});



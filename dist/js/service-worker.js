var cacheName="v0.0.1";self.addEventListener("install",(e=>{e.waitUntil(caches.open(cacheName).then((e=>e.addAll(["./dog.jpg"]))))})),self.addEventListener("message",(function(e){"skipWaiting"===e.data.action&&self.skipWaiting()})),self.addEventListener("fetch",(function(e){e.respondWith(caches.match(e.request).then((function(t){return t||fetch(e.request)})))}));
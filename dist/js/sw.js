var version="v2.0.4",staticCacheName=version+"_pwa-static",dynamicCacheName=version+"_pwa-dynamic",urlsToCache=["/","/css/style.css","/css/style-dark.css","/js/script.js","/icon.png","/img/logo/logo_rlp-sms_2560.png","/img/logo/logo_rlp-sms_2000.png","/img/logo/logo_rlp-sms_1500.png","/img/logo/logo_rlp-sms_1000.png","/img/logo/logo_rlp-sms_500.png"];self.addEventListener("install",(e=>{console.log("Installing…"),e.waitUntil(caches.open(staticCacheName).then((e=>(console.log("Opened cache"),e.addAll(urlsToCache))),(e=>{console.error(`Service Worker installation failed: ${e}`)})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.filter((function(e){if(!e.startsWith(staticCacheName)&&!e.startsWith(dynamicCacheName))return!0})).map((function(e){return console.log("deregistering Serviceworker"),"serviceWorker"in navigator&&(navigator.serviceWorker.getRegistrations().then((function(e){e.map((e=>{e.unregister()}))})),window.location.reload(!0)),console.log("Removing old cache.",e),caches.delete(e)})))})))}));
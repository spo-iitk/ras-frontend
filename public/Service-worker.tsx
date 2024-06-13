/// <reference lib="webworker" />


const swSelf = self as unknown as ServiceWorkerGlobalScope;

swSelf.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return Promise.resolve();
    })
  );
});

swSelf.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;

  if (request.url.startsWith('https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          return caches.open('v1').then((cache) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  }
});

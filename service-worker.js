const CACHE_NAME = 'figurinhas-v1';
const ASSETS = [
  './controle-album.html',
  './manifest.json',
  './icon-from-jpeg-192.png',
  './icon-from-jpeg-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        // only cache GET requests with successful response
        if (!event.request.url.startsWith('http')) return resp;
        if (resp && resp.status === 200 && event.request.method === 'GET'){
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(cache=>cache.put(event.request, copy));
        }
        return resp;
      }).catch(()=>caches.match('./controle-album.html'));
    })
  );
});

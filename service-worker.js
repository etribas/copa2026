const CACHE_NAME = 'figurinhas-v2-0-17';

const LOCAL_ASSETS = [
  './index.html',
  './index-beta.html',
  './manifest.json',
  './icon-from-jpeg-192.png',
  './icon-from-jpeg-512.png'
];

const FLAG_URLS = [
  'mx','za','kr','cz','ca','ba','qa','ch','br','ma','ht','gb-sct',
  'us','py','au','tr','de','cw','ci','ec','nl','jp','se','tn','be',
  'eg','ir','nz','es','cv','sa','uy','fr','sn','iq','no','ar','dz',
  'at','jo','pt','cd','uz','co','gb-eng','hr','gh','pa'
].map(c => `https://flagcdn.com/${c}.svg`);

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(LOCAL_ASSETS).then(() =>
        Promise.allSettled(FLAG_URLS.map(url => cache.add(url).catch(() => {})))
      )
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        if (!event.request.url.startsWith('http')) return resp;
        if (resp && resp.status === 200 && event.request.method === 'GET') {
          const copy = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return resp;
      }).catch(() => caches.match('./index.html'))
    })
  );
});

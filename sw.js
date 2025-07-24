// Define a name for the cache
const CACHE_NAME = 'score-keeper-cache-v3'; // Changed version to force update
// List the files to be cached
const urlsToCache = [
  './index.html', // Renamed from scorekeeper.html
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// 1. Installation
// This event is triggered when the service worker is first installed.
self.addEventListener('install', event => {
  // We wait until the files are successfully cached before considering the installation complete.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// This event is triggered when the new service worker activates.
// It cleans up old, unused caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 2. Fetching / Intercepting Network Requests
// This event is triggered for every network request made by the page.
self.addEventListener('fetch', event => {
  event.respondWith(
    // Check if the requested resource is in the cache.
    caches.match(event.request)
      .then(response => {
        // If a cached version is found, return it.
        if (response) {
          return response;
        }
        // Otherwise, try to fetch the resource from the network.
        return fetch(event.request);
      }
    )
  );
});

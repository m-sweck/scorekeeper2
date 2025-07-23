// Define a name for the cache
const CACHE_NAME = 'score-keeper-cache-v1';
// List the files to be cached
const urlsToCache = [
  './scorekeeper.html'
  // Note: Since the CSS and JS are inside the HTML, we only need to cache the one file.
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

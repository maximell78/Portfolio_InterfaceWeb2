//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v8.5';

self.addEventListener('activate', (evt) => {
console.log('[ServiceWorker] Activate');

//Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME) {
                console.log('[ServiceWorker] Removing old cache', key);
                return caches.delete(key);
            }
        }));
    })
);

self.clients.claim();
});

//Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'apropos.html',
    'contact.html',
    'index.html',
    'sitehtml.html',
    'sitephp.html',
    'bootstrap/css/bootstrap.css',
    'style/css/style.css',
    'style/css/navbar.css',
    'style/css/margin.css',
    'style/css/police.css',
    'style/css/background.css',
    'style/css/couleurs.css',
    'style/css/logo.css',
    'style/css/anim.css',
    'style/css/img.css',
    'js/anim.js',
    'animbouton.js',
    'animcarousel.js',
    'form.js',
    'install.js',
];


self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});


self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match('https://maximell78.github.io/Portfolio_InterfaceWeb2/offline.html');
                    });
            })
    );
}); 
//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v24';

//Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'apropos.html',
    'contact.html',
    'index.html',
    'sitehtml.html',
    'sitephp.html',
    'bootstrap/css/bootstrap.css',    
    'style/css/anim.css',
    'style/css/animcarousel.css',
    'style/css/background.css',
    'style/css/bouton.css',
    'style/css/couleurs.css',
    'style/css/form.css',
    'style/css/img.css',
    'style/css/logo.css',
    'style/css/margin.css',
    'style/css/mediaQuerry.css',
    'style/css/parallax.css',
    'style/css/police.css',
    'style/css/style.css',
    'js/anim.js',
    'js/animbouton.js',
    'js/animcarousel.js',
    'js/form.js',
    'js/jquery.easing.min.js',
    'media/image/404.png',
    'media/image/Bootstrap.png',
    'media/image/codehtml1.png',
    'media/image/codehtml2.png',
    'media/image/codephp.png',
    'media/image/codephp2.png',
    'media/image/couleur_diagonale.jpg',
    'media/image/css.png',
    'media/image/hostpapalogo.png',
    'media/image/info.jpg',
    'media/image/logo-nav.svg',
    'media/image/logo.png',
    'media/image/logoampps.png',
    'media/image/logohtml.png',
    'media/image/logomysql.jpg',
    'media/image/matrix.jpg',
    'media/image/maxime.jpg',
    'media/image/navbar-wave.svg',
    'media/image/php1.png',
    'media/image/php2.png',
    'media/image/php3.png',
    'media/image/php4.png',
    'media/image/php5.png',
    'media/image/php6.png',
    'media/image/php7.png',
    'media/image/php8.png',
    'media/image/phplogo.png',
    'media/image/phpmyadminlogo.jpg',
    'media/image/podcast1.png',
    'media/image/podcast2.png',
    'media/image/podcast3.png',
    'media/image/teletravail.jpg',
    'media/image/wave.svg'    
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
                        return cache.match('/Portfolio_InterfaceWeb2/offline.html');
                    });
            })
    );
});

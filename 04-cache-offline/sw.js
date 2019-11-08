// const cacheName = 'cache-pwa';
const cacheStaticName = 'static-v1';
const cacheDynamicName = 'dynamic-v1';
const cacheInmutableName = 'inmutable-v1';
const cacheDynamicSize = 50;

function cleanCache(cacheName, numeroItems) {
    caches.open(cacheName).then(cache => {
        cache.keys().then(keys => {
            if (keys.length >= numeroItems) {
                cache.delete(keys[0]).then(cleanCache(cacheName, numeroItems));
            }
        });
    });
}

self.addEventListener('install', e => {

    const cacheProm = caches.open(cacheStaticName).then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js',
            '/img/favicon.ico',
            '/img/no-img.jpg'
        ]);
    });

    const cacheInmutable = caches.open(cacheInmutableName).then(cache => {
        return cache.addAll([
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
        ]);
    });

    e.waitUntil(Promise.all([cacheProm, cacheInmutable]));
    
});

self.addEventListener('fetch', e => {

    // Cache with network race
    const resp = new Promise((resolve, reject) => {

        let rechazada = false;

        const falloUnaVez = () => {
            if (rechazada) {
                if (/\.(png|jpg)$/i.test(e.requets.url)) {
                    resolve(caches.match('/img/no-img.jpg'))
                } else {
                    reject('No se encontro respuesta');
                }
            } else {
                rechazada = true;
            }
        };

        fetch(e.request).then(res => {
            res.ok ? resolve(res) : falloUnaVez();
        }).catch(falloUnaVez);

        caches.match(e.request).then(res => {
            res ? resolve(res) : falloUnaVez();
        }).catch(falloUnaVez)

    });
    e.respondWith(resp);

    // Cache with network update (rendimiento critico)
    /* if (e.request.url.includes('bootstrap')) {
        return e.respondWith(caches.match(e.request));
    }
    const resp = caches.open(cacheStaticName).then(cache => {
        fetch(e.request).then(newRes => cache.put(e.request, newRes));
        return cache.match(e.request);
    });
    e.respondWith(resp) */

    // Network with cache fallback
    /*
    const respuesta = fetch(e.request).then(res => {
        if (!res) return caches.match(e.request);
        caches.open(cacheDynamicName).then(cache => {
            cache.put(e.request, res);
            cleanCache(cacheDynamicName, cacheDynamicSize);
        });
        return res.clone();
    }).catch(err => {
        return caches.match(e.request);
    });
    e.respondWith(respuesta);
    */

    // Cache network fallback
    // const respCache = caches.match(e.request).then(res => {
    //     if (res) return res;
    //     return fetch(e.request).then(newResp => {
    //         caches.open(cacheDynamicName).then(cache => {
    //             cache.put(e.request, newResp);
    //             cleanCache(cacheDynamicName, );
    //         });
    //         return newResp.clone();
    //     });
    // });
    // e.respondWith(respCache);

    // Cache only
    // e.respondWith(caches.match(e.request));
});
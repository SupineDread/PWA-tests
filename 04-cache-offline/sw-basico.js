
self.addEventListener('fetch', event => {
    const offlineResp = fetch('pages/offline.html');
    const respuesta = fetch(event.request).catch(() => offlineResp);
    event.respondWith(respuesta);
});




self.addEventListener('fetch', event => {
    event.respondWith(fetch(event.request).then(resp => {
        return resp.ok ? resp : fetch('img/main.jpg')
    }));
})
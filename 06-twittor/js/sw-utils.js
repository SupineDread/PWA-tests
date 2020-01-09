function updateDynamicCache(dynamycCache, req, res) {
    if (res.ok) {
        caches.open(dynamycCache).then(cache => {
            cache.put(req, res.clone());
            return res.clone();
        });
    } else {
        return res;
    }
}
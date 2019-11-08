
self.addEventListener('install', event => {
    // Descargar assets, crear cache
    console.log('Instalando SW');
    const instalacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Instalaciones terminadas');
            self.skipWaiting();
            resolve();
        }, 1);
    })
    event.waitUntil(instalacion);
});

self.addEventListener('activate', event => {
    //Borra cache viejo
    console.log('Activo y listo');
});

self.addEventListener('fetch', event => {
    // Aplicar las estrategias del cache
});

self.addEventListener('sync', event => {
    // Cuando recuperamos conexion
    console.log('tenemos conexion');
    console.log(event);
    console.log(event.tag);
});

self.addEventListener('push', event => {
    // push notificarions
    console.log('Hola');
});

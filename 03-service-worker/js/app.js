if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
        Notification.requestPermission().then(res => {
            console.log(res);
            reg.showNotification('Hola mundo');
        })
    });

}


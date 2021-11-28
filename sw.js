self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./index.html", "./css/bootstrap-grid.css", "./css/bootstrap-grid.css.map", "./css/bootstrap-grid.min.css", "./css/bootstrap-grid.min.css.map", "./css/bootstrap-reboot.css", "./css/bootstrap-reboot.css.map", "./css/bootstrap-reboot.min.css", "./css/bootstrap-reboot.min.css.map", "./css/bootstrap.css", "./css/bootstrap.css.map", "./css/bootstrap.min.css", "./css/bootstrap.min.css.map", "./scripts/script.js", "./scripts/index.js", "./logos/rowdy.png", "./logos/rowdyBig.png"]);
        })
    );
    console.log("Install! complete");
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
    console.log('Intercepting fetch request for: ' + e.request.url);
});

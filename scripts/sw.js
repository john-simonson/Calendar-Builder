self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["/", "index.html", "scripts/sw.js", "scripts/script.js", "logos/rowdy.png", "logos/rowdyBig.png",])
        })
    );
    console.log("Install! complete");
});

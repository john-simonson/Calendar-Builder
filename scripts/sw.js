self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["/", "index.html", "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js", "scripts/sw.js", "scripts/script.js", "logos/rowdy.png", "logos/rowdyBig.png",])
        })
    );
    console.log("Install! complete");
});

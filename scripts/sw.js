self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["/", "index.html", "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js", "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/additional-methods.min.js", "scripts/sw.js", "scripts/script.js", "logos/rowdy.png", "logos/rowdyBig.png",])
        })
    );
    console.log("Install! complete");
});

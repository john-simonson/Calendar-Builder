if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(registration =>{
        console.log("SW Registered!");
        console.log(registration)
       // registration.update();
    }).catch(error => {
        console.log("SW registration failed!");
        console.log(error);
    });
}
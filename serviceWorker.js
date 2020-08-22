const urlsToCache = [
  { url: "/", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/detailsTeam.html", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/push.js", revision: "1" },
  { url: "/pages/favTeam.html", revision: "1" },
  { url: "/pages/home.html", revision: "1" },
  { url: "/pages/match.html", revision: "1" },
  // { url: "assets/images/logo/brandPL.png", revision: "1" },
  // { url: "assets/images/icons/favicon.ico", revision: "1" },
  // { url: "assets/images/icons/icon-72x72.png", revision: "1" },
  // { url: "assets/images/icons/icon-96x96.png", revision: "1" },
  // { url: "assets/images/icons/icon-128x128.png", revision: "1" },
  // { url: "assets/images/icons/icon-144x144.png", revision: "1" },
  // { url: "assets/images/icons/icon-152x152.png", revision: "1" },
  // { url: "assets/images/icons/icon-192x192.png", revision: "1" },
  // { url: "assets/images/icons/icon-384x384.png", revision: "1" },
  // { url: "assets/images/icons/icon-512x512.png", revision: "1" },
  { url: "/assets/css/customizeStyle.css", revision: "1" },
  { url: "/assets/css/materialize-icon.css", revision: "1" },
  { url: "/assets/css/materialize.min.css", revision: "1" },
  { url: "/assets/js/materialize.min.js", revision: "1" },
  { url: "/assets/js/footballAPI.js", revision: "1" },
  { url: "/assets/js/register.js", revision: "1" },
  { url: "/assets/js/db.js", revision: "1" },
  { url: "/assets/js/cardsHtml.js", revision: "1" },
  { url: "/assets/js/idb.js", revision: "1" },
  { url: "/assets/js/details.js", revision: "1" },
  { url: "/assets/js/index.js", revision: "1" },
  { url: "/assets/js/swRegister.js", revision: "1" },
  { url: "/assets/components/nav.js", revision: "1" },
];

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) {
  console.log(`workbox berhasil dimuat 🎉`);

  workbox.precaching.precacheAndRoute(urlsToCache);

  workbox.routing.registerRoute(
    new RegExp("/"),
    workbox.strategies.networkFirst({
      networkTimeoutSeconds: 1,
    })
  );

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
      cacheName: "PL_PWA",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/"),
    workbox.strategies.staleWhileRevalidate()
  );
} else {
  console.log(`workbox gagal dimuat 😬`);
}

// Kode untuk event push agar service worker dapat menerima push notification.
self.addEventListener("push", (event) => {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "assets/images/icons/icon-128x128.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    clients.matchAll().then((c) => {
      console.log(c);
      if (c.length === 0) {
        // Show notification
        self.registration.showNotification("Push Notification", options);
      } else {
        // Send a message to the page to update the UI
        console.log("Application is already open!");
      }
    })
  );
});

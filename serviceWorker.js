const urlsToCache = [
  { url: "/", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/detailsTeam.html", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/push.js", revision: "1" },
  { url: "assets/images/logo/brandPL.png", revision: "1" },
  { url: "assets/images/icons/favicon-16x16.png", revision: "1" },
  { url: "assets/images/icons/favicon-32x32.png", revision: "1" },
  { url: "assets/images/icons/favicon-96x96.png", revision: "1" },
  { url: "assets/images/icons/icon-144x144.png", revision: "1" },
  { url: "assets/images/icons/android-icon-36x36.png", revision: "1" },
  { url: "assets/images/icons/android-icon-48x48.png", revision: "1" },
  { url: "assets/images/icons/android-icon-72x72.png", revision: "1" },
  { url: "assets/images/icons/android-icon-96x96.png", revision: "1" },
  { url: "assets/images/icons/android-icon-144x144.png", revision: "1" },
  { url: "assets/images/icons/android-icon-192x192.png", revision: "1" },
  { url: "assets/images/icons/apple-icon.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-57x57.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-60x60.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-72x72.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-76x76.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-114x114.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-120x120.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-144x144.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-152x152.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-180x180.png", revision: "1" },
  { url: "assets/images/icons/apple-icon-precomposed.png", revision: "1" },
  { url: "assets/images/icons/ms-icon-70x70.png", revision: "1" },
  { url: "assets/images/icons/ms-icon-144x144.png", revision: "1" },
  { url: "assets/images/icons/ms-icon-150x150.png", revision: "1" },
  { url: "assets/images/icons/ms-icon-310x310.png", revision: "1" },
  { url: "assets/images/icons/favicon.ico", revision: "1" },
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

  workbox.precaching.precacheAndRoute(urlsToCache, {
    ignoreUrlParametersMatching: [/.*/],
  });

  workbox.routing.registerRoute(
    new RegExp("/"),
    workbox.strategies.networkFirst({
      networkTimeoutSeconds: 1,
    })
  );

  // cache semua file image
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: "images",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [200],
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
    workbox.strategies.staleWhileRevalidate({
      cacheName: "footballApi",
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [200],
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "resource-css-Js",
    })
  );
  workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
      cacheName: "pages",
    })
  );

  // Kode untuk event push agar service worker dapat menerima push notification.
  self.addEventListener("push", (event) => {
    let body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = "Push message no payload";
    }
    let options = {
      body: body,
      icon: "./assets/images/icons/ms-icon-70x70.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    };

    event.waitUntil(
      self.registration.showNotification("Push Notification", options)
      // clients.matchAll().then((c) => {
      //   console.log(c);
      //   if (c.length === 0) {
      //     // Show notification
      //     self.registration.showNotification("Push Notification", options);
      //   } else {
      //     // Send a message to the page to update the UI
      //     console.log("Application is already open!");
      //   }
      // })
    );
  });
} else {
  console.log(`workbox gagal dimuat 😬`);
}

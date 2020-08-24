// REGISTER SERVICE WORKER
const registerServiceWorker = () => {
  return navigator.serviceWorker
    .register("./serviceWorker.js")
    .then((registration) => {
      console.log("registrasi service worker berhasil", registration);
      return registration;
    })
    .catch((error) => {
      console.log("registrasi service worker gagal", error);
    });
};

export { registerServiceWorker };

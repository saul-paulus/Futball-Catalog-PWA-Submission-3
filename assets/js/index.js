import { registerServiceWorker } from "./swRegister.js";
import { requestPermission } from "./register.js";

document.addEventListener("DOMContentLoaded", () => {
  // Periksa service worker
  if (!("serviceWorker" in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
  } else {
    registerServiceWorker();
    requestPermission();
  }
});

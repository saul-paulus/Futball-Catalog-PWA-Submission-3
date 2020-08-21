var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BJzIeU1g86G5TfWYzlyDABXpZDTAnbS74qgIuGpqHe8uX1IZz6KVLDziKtqR6ppCwJpMd9_FnKeM4x21brlSvfE",
  privateKey: "P_4s-1IXEOWGkl8GEKuuZn1eg3aOW-9vKEGERNB9hbo",
};

webPush.setVapidDetails(
  "mailto:saulpaulus17@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/f5l7nJgZ60w:APA91bEBcAykRR5AcjilXTQcEKotK-m8ccuUEVYPbxVyuAqNQVmcSDkyQTFbHTrEqtxJJP8sr209b3VoElp4r0pGruqpvGzFfgU-Dx-YFoPozV6kqbxFuIP5L2Xef2kW7HYcde30EfxR",
  keys: {
    p256dh:
      "BKo0GYf3v6ZVeAOwWzjg2JaIOAXjTkcOsQLJ2XdB8AsFjBHMP/1/MnHVRlNLk/0N14HOtOvxz5k2ZxUQkra0das=",
    auth: "oreQy8XsNzmIBDY3ircf/g==",
  },
};

var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";
var options = {
  gcmAPIKey: "1073284849254",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);

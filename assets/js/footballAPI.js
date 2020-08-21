import {
  cardsGetStands,
  cardsGetMatch,
  cardsGetSaveMyTeam,
  getCardsTeamById,
  cardsDetailTeam,
} from "./cardsHtml.js";

const base_url = "https://api.football-data.org/v2/";
const API_KEY = "8ff6f688c8a944d9a005fad7d831c4b3";
const id_tim = 2021;
const stands_url = `${base_url}competitions/${id_tim}/standings`; //!Klasmen liga inggirs
const match_url = `${base_url}competitions/${id_tim}/matches`; //!jadwal pertandingan

// ? get url Api klasmen liga inggris
const urlRequestStands = new Request(stands_url, {
  headers: {
    "X-Auth-Token": API_KEY,
  },
});

// ? get url Api Jadwal pertandingan liga inggris
const urlRequesMatch = new Request(match_url, {
  headers: {
    "X-Auth-Token": API_KEY,
  },
});

// ? mengecek status API jika fetch dipanggil
const statusResult = (response) => {
  if (response.status !== 200) {
    console.log("error =->" + response.status);

    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
};

// ?Memparse data ke json menjadi array JavaScript
const jsonResult = (response) => {
  return response.json();
};

// ?Jika terjadi error
const erResult = (error) => console.log(error);

// Mendapatkan data klasmen
const getStands = () => {
  if ("caches" in window) {
    caches.match(urlRequestStands).then((response) => {
      if (response) {
        response.json().then(cardsGetStands);
      }
    });
  }
  fetch(urlRequestStands)
    .then(statusResult)
    .then(jsonResult)
    .then(cardsGetStands)
    .catch(erResult);
};

// Mendapatkan details team
const getDetailsTeams = () => {
  return new Promise((resolve, reject) => {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(base_url + "teams/" + idParam, {
          headers: { "X-Auth-Token": API_KEY },
        })
        .then((response) => {
          if (response) {
            response.json().then((details) => {
              console.log(details);

              document.getElementById(
                "body-content"
              ).innerHTML = cardsDetailTeam(details);
              loadingHide();
              showSave();
              resolve(details);
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    }

    fetch(base_url + "teams/" + idParam, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
    })
      .then(statusResult)
      .then(jsonResult)
      .then((details) => {
        document.getElementById("body-content").innerHTML = cardsDetailTeam(
          details
        );
        loadingHide();
        showSave();
        resolve(details);
      });
  }).catch((error) => {
    reject(error);
  });
};

// Mendapatkan jadwal pertandingan
const getMatch = () => {
  if ("caches" in window) {
    caches.match(urlRequesMatch).then((response) => {
      if (response) {
        response.json().then(cardsGetMatch);
      }
    });
  }
  fetch(urlRequesMatch).then(statusResult).then(jsonResult).then(cardsGetMatch);
};

// preloader hide
const loadingHide = () => {
  const loadingHide = document.querySelector(".preloader-wrapper");
  loadingHide.style.display = "none";
};
// memubuat tombol delete
const deleteShow = () => {
  const tmblDelete = document.getElementById("delete");
  tmblDelete.style.display = "block";
};

// Membuat tombol Save
const showSave = () => {
  const tmbloSave = document.getElementById("save");
  tmbloSave.style.display = "block";
};

const getSaveMyTeam = () => {
  getAll().then(cardsGetSaveMyTeam);
};

const getSaveMyTeamById = () => {
  return new Promise((resolve, reject) => {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    getById(idParam).then((detail) => {
      loadingHide();
      resolve(detail);
      return (document.getElementById(
        "body-content"
      ).innerHTML = getCardsTeamById(detail));
    });
  });
};

export {
  showSave,
  deleteShow,
  getStands,
  getDetailsTeams,
  getMatch,
  getSaveMyTeam,
  getSaveMyTeamById,
  loadingHide,
};

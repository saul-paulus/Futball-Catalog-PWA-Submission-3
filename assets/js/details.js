import {
  deleteShow,
  getDetailsTeams,
  getSaveMyTeamById,
} from "./footballAPI.js";
import { registerServiceWorker } from "./swRegister.js";

registerServiceWorker();

const urlParams = new URLSearchParams(window.location.search);
const isFromFavTeam = urlParams.get("favTeam");

const tmbloSave = document.getElementById("save");
const tmblDelete = document.getElementById("delete");
// let item;
if (isFromFavTeam) {
  console.log(isFromFavTeam);
  // tombol delete ditampilkan
  deleteShow();
  // ambil detail team dan tampilkan
  getSaveMyTeamById();
} else {
  getDetailsTeams();
}

// Memuat save
tmbloSave.addEventListener("click", () => {
  getDetailsTeams().then((detail) => {
    saveTeam(detail);
    deleteShow();
    tmbloSave.style.display = "hide";
  });
});

// Memuat hapus
tmblDelete.addEventListener("click", () => {
  getSaveMyTeamById()
    .then((detail) => {
      getDelateMyTeam(detail);
    })
    .then(() => {
      M.toast({ html: `Team details has be delete!` });
    });
});

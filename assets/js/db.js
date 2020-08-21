let dbPromised = idb.open("plFootball", 1, (upgradeDb) => {
  let teamObjectStore = upgradeDb.createObjectStore("myTeam", {
    keyPath: "id",
  });
  teamObjectStore.createIndex("name", "name", { unique: false });
});

const saveTeam = (detail) => {
  dbPromised
    .then((db) => {
      let tx = db.transaction("myTeam", "readwrite");
      let store = tx.objectStore("myTeam");
      store.put(detail);
      return tx.complete;
    })
    .then(() => {
      M.toast({ html: `${detail.name} has be save!` });
    })
    .catch((error) => {
      console.log(error);
    });
};
// fajarwz/myfootball
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("myTeam", "readonly");
        let store = tx.objectStore("myTeam");
        return store.getAll();
      })
      .then((detail) => {
        resolve(detail);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("myTeam", "readonly");
        let store = tx.objectStore("myTeam");
        return store.get(parseInt(id));
      })
      .then((detail) => {
        resolve(detail);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Menghapus team dari indexdb
const getDelateMyTeam = (detail) => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("myTeam", "readwrite");
        const store = tx.objectStore("myTeam");
        store.delete(detail.id);
        return tx.complete;
      })
      .then((detail) => {
        resolve(detail);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

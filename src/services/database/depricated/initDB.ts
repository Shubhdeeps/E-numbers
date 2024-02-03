// /* eslint-disable @typescript-eslint/no-explicit-any */

// import EnumbersListJSON from "../../assets/rawDataV2.json";

// export const indexDB =
//   window.indexedDB ||
//   (window as any).mozIndexedDB ||
//   (window as any).webkitIndexedDB ||
//   (window as any).msIndexedDB ||
//   (window as any).shimIndexedDB;

// export const dbName = "enumbers-list-1";
// export const storeName = "enumber-store";

// export function initDB() {
//   const request = indexDB.open(dbName, 1);

//   request.onerror = (event) => {
//     console.log(event);
//   };

//   request.onupgradeneeded = () => {
//     const db = request.result;
//     const store = db.createObjectStore(storeName, { keyPath: "e_number" });

//     //to make data searchale we need to create index for it
//     store.createIndex("p_enumber", ["e_number"], { unique: false });
//     store.createIndex("p_name", ["name"], { unique: false });
//     store.createIndex("p_enumber_name", ["e_number", "name"], {
//       unique: true,
//     });
//   };

//   // request.onsuccess = () => {
//   //   const db = request.result;
//   //   const transaction = db.transaction(storeName, "readwrite");
//   //   const store = transaction.objectStore(storeName);
//   //   //save all the items to the database
//   //   for (const item of EnumbersList) {
//   //     store.put(item);
//   //   }
//   // };
// }

// export function initDBwithData() {
//   initDB();
//   const request = indexDB.open(dbName, 1);

//   request.onerror = (event) => {
//     console.log(event);
//   };

//   request.onsuccess = () => {
//     const db = request.result;
//     const transaction = db.transaction(storeName, "readwrite");
//     const store = transaction.objectStore(storeName);
//     //save all the items to the database
//     for (const item of EnumbersListJSON) {
//       store.put(item);
//     }
//   };
// }

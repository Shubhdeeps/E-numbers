// /* eslint-disable @typescript-eslint/no-explicit-any */

// export const indexDB =
//   window.indexedDB ||
//   (window as any).mozIndexedDB ||
//   (window as any).webkitIndexedDB ||
//   (window as any).msIndexedDB ||
//   (window as any).shimIndexedDB;

// export const dbNameHistory = "enumbers-history-list-1";
// export const storeNameHistory = "enumber-history-store";

// export function initDB() {
//   const request = indexDB.open(dbNameHistory, 1);

//   request.onerror = (event) => {
//     console.log(event);
//   };

//   request.onupgradeneeded = () => {
//     const db = request.result;
//     const store = db.createObjectStore(storeNameHistory, {
//       keyPath: "item_name",
//     });

//     //to make data searchale we need to create index for it
//     store.createIndex("p_item_name", ["item_name"], { unique: false });
//   };
// }

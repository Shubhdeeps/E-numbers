// import { dbName, indexDB, storeName } from "./initDB";

// export function getEnumbersBasedOnKey(
//   key: "p_enumber" | "p_name",
//   keyList: string
// ) {
//   const request = indexDB.open(dbName, 1);

//   request.onerror = (event) => {
//     console.log(event);
//   };

//   request.onsuccess = () => {
//     const db = request.result;
//     const transaction = db.transaction(storeName, "readwrite");
//     const store = transaction.objectStore(storeName);

//     const categoryQuery = store.index(key);
//     const queryRes = categoryQuery.getAll([keyList]);
//     //close the db on complete
//     queryRes.onsuccess = () => {
//       const response = queryRes.result;

//       if (response.length === 0) {
//         // fetch data from firestore and update to db
//       }
//       console.log("found: ", response);
//     };
//     transaction.oncomplete = () => db.close();
//   };
//   return;
// }

// export function searchEnumber(
//   searchText: string,
//   setEnumberList: React.Dispatch<React.SetStateAction<any[]>>
// ) {
//   const request = indexDB.open(dbName, 1);

//   request.onerror = (event) => {
//     console.log(event);
//   };

//   request.onsuccess = async () => {
//     const db = request.result;
//     const transaction = db.transaction(storeName, "readwrite");

//     const store = transaction.objectStore(storeName);

//     const cursor = store.index("p_enumber_name").openCursor();

//     const resultArray: any[] = [];

//     cursor.onsuccess = function (event) {
//       const cursor = (event as any).target.result;
//       //   console.log("cursor is:", cursor);
//       if (cursor) {
//         // console.log(cursor.source.keyPath);

//         if (
//           cursor.value.name.indexOf(searchText) !== -1 ||
//           cursor.value.e_number.indexOf(searchText) !== -1
//         ) {
//           resultArray.push(cursor.value);
//         }

//         cursor.continue();
//       }
//     };
//     transaction.oncomplete = () => db.close();

//     setTimeout(() => {
//       resultArray.splice(8);
//       setEnumberList(resultArray);
//     }, 300);
//   };
// }

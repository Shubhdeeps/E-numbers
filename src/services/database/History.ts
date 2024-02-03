import { db } from ".";

export async function setHistoryItem(e_number: string, name: string) {
  try {
    // console.log("Uploading to history");
    const time = new Date().getTime() / 1000;
    const prevHistory = await getHistoryItemsInDescendingOrder();
    //check if already exist
    const filterHistory = prevHistory.filter(
      (elem) => elem.e_number !== e_number
    );

    //at index 0
    filterHistory.splice(0, 0, {
      accessed: time,
      e_number,
      name,
    });

    //store only first 13
    filterHistory.splice(16);
    await clearDB();
    await db.searchHistory.bulkAdd(filterHistory);
  } catch (e) {
    console.log(e);
  }
}

async function clearDB() {
  await db.searchHistory.clear();
}

export async function getHistoryItemsInDescendingOrder() {
  const items = await db.searchHistory
    .orderBy("accessed")
    .reverse()
    .limit(12)
    .toArray();
  return items;
}

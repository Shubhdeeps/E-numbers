import { db } from ".";
import { SavedItems } from "../../models/SavedItems.model";

const dbRef = db.userSavedProducts;
export async function getSavedItems() {
  const items = await dbRef.orderBy("savedTime").reverse().toArray();
  return items;
}

export async function saveItemToDB(productName: string, extractedText: string) {
  const savedTime = new Date().getTime() / 1000;
  const newSavedItem: SavedItems = {
    extractedText,
    productName,
    savedTime,
  };
  await dbRef.add(newSavedItem);
}

export async function getSingleSavedPrductBasedOnProductId(
  productName: string
) {
  const savedProduct = await dbRef.get(productName);
  return savedProduct;
}
export function secondsToTimestampString(time: number) {
  const d = new Date(0);
  d.setUTCSeconds(time);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

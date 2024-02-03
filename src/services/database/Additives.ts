import { Additive } from "../../models/Additive.model";
import rawData from "../../assets/rawDataV2.json";
import { Restriction } from "../../models/Restriction.model";
import restrictionData from "../../assets/restrictions.json";
import { Legislation } from "../../models/Legistation.model";
import legistationData from "../../assets/legislation.json";
import translations from "../../assets/translations.json";
import { db } from ".";
import { getEnumberForForeignAdditive } from "./Translation";

export async function uploadDataToDB() {
  try {
    const checkIfALreadyExists = db.tables.find(
      (tab) => tab.name === "additives"
    );
    const dataCount = await checkIfALreadyExists?.count();

    if (dataCount) {
      //already exists
      // console.log("Already exist");

      return;
    }
    // console.time("startBulk");
    await db.additives.bulkAdd(rawData as Additive[]);
    await db.restrictions.bulkAdd(restrictionData as Restriction[]);
    await db.legislation.bulkAdd(legistationData.items as Legislation[]);
    await db.translation.bulkAdd(translations);
    // console.timeEnd("startBulk");
  } catch (e) {
    console.log("DB ERROR: ", e);
  }
}

export async function getAdditiveBasedOnKey(value: string, limit: number = 8) {
  const additives = await db.additives
    .where(`name`)
    .startsWithIgnoreCase(String(value))
    .limit(limit)
    .toArray();

  if (!additives.length) {
    const searchText = isNaN(+value) ? value : `E${value}`;
    //if no additives found based on name, then try e_number
    const additivesBasedOnEnumbers = await db.additives
      .where(`e_number`)
      .startsWithIgnoreCase(searchText)
      .limit(limit)
      .toArray();
    additives.push(...additivesBasedOnEnumbers);
  }

  return additives;
}
export async function getAdditivesBasedOnCategories(categoryName: string) {
  const additivesByEnumbers = await db.additives
    .where("singleCategory")
    .startsWithAnyOfIgnoreCase(categoryName)
    .toArray();
  return additivesByEnumbers;
}

export async function getAdditivesList(lastVisible: number = 1) {
  const additives = await db.additives
    .orderBy("name")
    .limit(lastVisible * 30)
    .toArray();
  return additives;
}

async function getElementsBasedOnList(list: string[]) {
  const ElementsList: Additive[] = [];
  // let index = 0;

  for (const item of list) {
    // const currentElementOfList = item;
    // const nextElementOfList = list[index + 1];
    // if (currentElementOfList && nextElementOfList) {
    //   const elementName = `${currentElementOfList} ${nextElementOfList}`;

    //   console.log("Element name: ", item);

    // }
    // console.log("Element name:", item);

    const translatedAdditive = await getEnumberForForeignAdditive(item);

    if (translatedAdditive) {
      // console.log("found transalted: ", translatedAdditive);

      // console.log("translated: ", translatedAdditive);
      const _additiveFound = await db.additives.get(translatedAdditive);
      if (_additiveFound) {
        ElementsList.push(_additiveFound);
      }
    }
    // index++;
  }
  return ElementsList;
}

export async function getAllByList(list: string[]) {
  // console.log(list);

  const additivesBasedOnNames = await getElementsBasedOnList(list);

  const additivesByEnumbers = await db.additives
    .where("e_number")
    .anyOfIgnoreCase(list)
    .toArray();
  //   const additives2 = await db.additives
  //     .where("name")
  //     .anyOfIgnoreCase(list)
  //     .toArray();
  const cached: Record<string, boolean> = {};
  const response: Additive[] = [];
  for (const data of [...additivesByEnumbers, ...additivesBasedOnNames]) {
    if (cached[data.e_number]) {
      continue;
    }
    cached[data.e_number] = true;
    response.push(data);
  }

  return response;
}

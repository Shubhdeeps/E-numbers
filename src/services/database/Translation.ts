import { db } from ".";

export async function getEnumberForForeignAdditive(additiveName: string) {
  const additive = await db.translation
    .where("translation")
    .startsWithAnyOfIgnoreCase([additiveName, additiveName + "\uffff"])
    .toArray();

  if (additive.length > 0) {
    return additive[0].e_number;
  }
}

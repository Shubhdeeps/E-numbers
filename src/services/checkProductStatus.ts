import { Additive } from "../models/Additive.model";
export type VariantStatusType = "cross" | "neutral" | "check";
export function checkProductStatus(additiveList: Additive[]) {
  let vegan: VariantStatusType = "neutral";
  let vegetarian: VariantStatusType = "neutral";
  const veganStatusList = [];
  const vegStatusList = [];
  for (const additive of additiveList) {
    veganStatusList.push(additive.vegan);
    vegStatusList.push(additive.vegetarian);
  }

  const veganCross = veganStatusList.some((el) => el === false);
  const vegCross = vegStatusList.some((el) => el === false);

  const veganNeutral = veganStatusList.some((el) => el === undefined);
  const vegNeutral = vegStatusList.some((el) => el === undefined);

  if (veganNeutral) {
    vegan = "neutral";
  }
  if (vegNeutral) {
    vegetarian = "neutral";
  }

  if (veganCross) {
    vegan = "cross";
  }
  if (vegCross) {
    vegetarian = "cross";
  }

  const isVeganCheck = Array.from(new Set(veganStatusList));
  const isVegCheck = Array.from(new Set(vegStatusList));
  if (isVeganCheck.length === 1 && isVeganCheck[0] === true) {
    vegan = "check";
  }

  if (isVegCheck.length === 1 && isVegCheck[0] === true) {
    vegetarian = "check";
  }

  return {
    vegan,
    vegetarian,
  };
}

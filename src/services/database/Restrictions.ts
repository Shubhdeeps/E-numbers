import { db } from ".";
import { Restriction } from "../../models/Restriction.model";

export type RestrictionOutput = {
  title: string;
  comment: string;
  legislationId: string;
};
export async function getRestrictionDataBasedOnAdditiveId(additiveId: string) {
  const restrictionData = await db.restrictions
    .where("additiveId")
    .equalsIgnoreCase(additiveId)
    .toArray();

  return restrictionData.map((restrictionValue) =>
    processRestrictions(restrictionValue)
  );
}

function processRestrictions(restriction: Restriction): RestrictionOutput {
  const { type, value, unit, comment, productCategory, legislationId } =
    restriction;
  let bodyText = "";
  if (type === "ML") {
    bodyText = "Maximum Limit: ";
  } else if (type === "quantum satis") {
    bodyText = "Quantum Satis";
  }

  if (value) {
    bodyText = bodyText + restriction.value;
    if (unit) {
      bodyText = bodyText + " " + unit;
    }
  }

  if (comment) {
    bodyText = bodyText + ", " + comment;
  }

  return {
    title: productCategory,
    comment: bodyText,
    legislationId,
  };
}

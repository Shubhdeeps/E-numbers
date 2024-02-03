import { Additive } from "../../models/Additive.model";
import { HistoryAdditives } from "../../models/History.model";
import { Legislation } from "../../models/Legistation.model";
import { Restriction } from "../../models/Restriction.model";
import Dexie, { Table } from "dexie";
import { SavedItems } from "../../models/SavedItems.model";
import { Translate } from "../../models/Translation.model";

class AdditivesDatabase extends Dexie {
  public additives!: Table<Additive, string>; //id is string
  public restrictions!: Table<Restriction, string>;
  public legislation!: Table<Legislation, string>;
  public searchHistory!: Table<HistoryAdditives, string>;
  public userSavedProducts!: Table<SavedItems, string>;
  public translation!: Table<Translate, string>;
  public constructor() {
    super("additives_database2");
    this.version(3).stores({
      additives: "e_number, name, singleCategory",
      userSavedProducts: "productName,savedTime",
      searchHistory: "e_number,accessed",
      restrictions: "++id,additiveId",
      legislation: "legislationId",
      translation: "e_number, *translation",
    });
  }
}

export const db = new AdditivesDatabase();

import { useEffect, useState } from "react";
import AdditivesIndicator from "../components/Indicators/AdditivesIndicator";
import { SavedItems } from "../models/SavedItems.model";
import {
  getSavedItems,
  secondsToTimestampString,
} from "../services/database/SavedItems";
import { useNavigate } from "react-router-dom";

export default function SavedProductsListPage() {
  const [savedItems, setSavedItems] = useState<SavedItems[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const savedProducts = await getSavedItems();
      setSavedItems(savedProducts);
    })();
  }, []);
  function handleNavigate(path: string) {
    navigate(`/saved-items/${path}`);
  }
  const noSavedProducts = savedItems.length === 0;

  return (
    <div className="flex flex-col gap-1 relative px-3">
      <div className="relative">
        <AdditivesIndicator title1={"Saved products"} />
      </div>
      <br />
      <br />
      <br />
      <br />
      {noSavedProducts && (
        <div className="text-textGray ps-3">
          No Products <br />
          Scan the product ingredients list and save the item!
        </div>
      )}
      <div className="flex flex-col gap-2 cursor-pointer">
        {savedItems.map((element) => {
          return (
            <div
              key={element.productName}
              onClick={() => handleNavigate(element.productName)}
              className="
          bg-fg 
          p-3 
          flex flex-col items-start justify-between
          rounded-3xl
          "
            >
              <span className="font-semibold capitalize">
                {element.productName}
              </span>
              <p className="first-letter:capitalize max-w-[40%] text-end text-xs text-textGray">
                {secondsToTimestampString(element.savedTime)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

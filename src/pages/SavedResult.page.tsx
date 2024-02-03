import { useParams } from "react-router-dom";
import ScannerResultUI from "../components/ScannedResultUi";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { getSingleSavedPrductBasedOnProductId } from "../services/database/SavedItems";
import { SavedItems } from "../models/SavedItems.model";

export default function ItemFromSavedDBPage() {
  const { productId } = useParams();
  const [savedItem, setSavedItem] = useState<SavedItems | null>();

  useEffect(() => {
    (async () => {
      const _singleProduct = await getSingleSavedPrductBasedOnProductId(
        productId || ""
      );

      if (_singleProduct) {
        setSavedItem(_singleProduct);
      }
    })();
  }, [productId]);

  if (!savedItem) {
    return <Spinner />;
  }
  return (
    <>
      <ScannerResultUI
        variant="saved"
        imageText={savedItem.extractedText}
        titleText={savedItem.productName}
      />
    </>
  );
}

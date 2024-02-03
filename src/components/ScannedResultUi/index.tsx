import AdditivesIndicator from "../Indicators/AdditivesIndicator";
import MutedTitle from "../Titles/MutedTitle";
import AdditivesTypeCard from "../Cards/AdditivesTypeCard";
import AdditiveCard from "../Cards/AdditiveCard";
import { useEffect, useState } from "react";
import { Additive } from "../../models/Additive.model";
import Spinner from "../Spinner";
import {
  VariantStatusType,
  checkProductStatus,
} from "../../services/checkProductStatus";
import { extractText } from "../../services/extractText";
import {
  extractEnumbersList,
  processRawStringAndReturnList,
} from "../../services/extractEnumbers";
import { getAllByList } from "../../services/database/Additives";
import { useNavigate } from "react-router-dom";
import { savedSVG } from "../../assets/icons/HistoryIcon";
import { saveItemToDB } from "../../services/database/SavedItems";

type Scan = {
  variant: "image";
  imageURL: string;
};
type Scanned = {
  variant: "saved";
  imageText: string;
};
type Variant = Scan | Scanned;
type IProps = {
  titleText: string;
} & Variant;

export default function ScannerResultUI(props: IProps) {
  const { variant, titleText } = props;
  const [isSaved, setIsSaved] = useState(false);
  const [textFromImage, setExtractedText] = useState("");
  const [status, setStatus] = useState<{
    vegan: VariantStatusType;
    vegetarian: VariantStatusType;
  }>({
    vegan: "neutral",
    vegetarian: "neutral",
  });

  const [imageURL, setImageURL] = useState<string | null>(null);
  const [additivesList, setAdditivesList] = useState<Additive[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let extractedText = "";
      if (variant === "image") {
        const { imageURL } = props;
        setImageURL(imageURL);
        try {
          const _extractedText = await extractText(imageURL);
          setExtractedText(_extractedText);
          extractedText = _extractedText;
        } catch (e) {
          //failed to extract text
          navigate("/");
        }
      } else if (variant === "saved") {
        const { imageText } = props;
        extractedText = imageText;
      }

      // console.log(extractedText);

      const processedList = processRawStringAndReturnList(extractedText);
      // console.log("removed number");

      // setImageText(extractedText);
      const enumbersList = extractEnumbersList(extractedText);
      // console.log(enumbersList);
      // const list = extractIngredients(processString);
      // console.log(list);
      const getAdditives = await getAllByList([
        ...processedList,
        ...enumbersList,
      ]);
      // console.log("all additives found: ", getAdditives);

      setAdditivesList(getAdditives);
      // console.log("All: ", getAdditives);
      setLoading(false);
      const response = checkProductStatus(getAdditives);
      setStatus(response);
    })();
  }, [props, variant]);

  if (loading) {
    return <Spinner />;
  }

  function handleSave() {
    const rand = Math.round(Math.random() * 1000);
    setIsSaved(true);
    saveItemToDB(`Product-${rand}`, textFromImage);
  }

  return (
    <div className="flex flex-col gap-3 relative px-3">
      <div className="relative mb-20">
        <AdditivesIndicator title1={titleText} backButton />
      </div>
      <br />

      {imageURL && (
        <div className="border-highlight border-2 rounded-3xl w-[200px] h-[160px]">
          <img className="w-full h-full rounded-3xl" src={imageURL} />
        </div>
      )}

      {variant === "image" && !isSaved && (
        <div
          onClick={handleSave}
          className="p-3 absolute right-0 cursor-pointer z-30"
        >
          {savedSVG}
        </div>
      )}

      <div className="flex gap-2 flex-col">
        <MutedTitle title="Overall Status" />
        <AdditivesTypeCard title="vegan" variant={status.vegan} />
        <AdditivesTypeCard title="Vegetarian" variant={status.vegetarian} />
      </div>
      <div className="flex gap-2 flex-col">
        <MutedTitle title="ADDITIVES FOUND" />

        <div className="flex flex-col gap-3 w-fit pe-4 sm:flex-wrap sm:mb-20">
          {additivesList.map((scannedAdditive) => {
            return (
              <AdditiveCard
                key={scannedAdditive.e_number}
                name={scannedAdditive.name}
                e_number={scannedAdditive.e_number}
                description={scannedAdditive.description}
                vegan={scannedAdditive.vegan}
                vegetarian={scannedAdditive.vegetarian}
              />
            );
          })}
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AdditiveCategory,
  additivesAndCategories,
} from "../services/additivesAndCategories";
import { getAdditivesBasedOnCategories } from "../services/database/Additives";
import { Additive } from "../models/Additive.model";
import AdditivesIndicator from "../components/Indicators/AdditivesIndicator";
import NameCard from "../components/Cards/NameCard";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [additives, setAdditives] = useState<Additive[]>([]);
  const [additiveCategory, setCategory] = useState<AdditiveCategory | null>(
    null
  );
  // console.log(categoryId);
  useEffect(() => {
    const categoryTitle = additivesAndCategories.find(
      (cat) => cat.additive === categoryId
    );
    if (!categoryTitle) {
      return;
    }
    setCategory(categoryTitle);
    console.time("fetching");

    (async () => {
      const _additives = await getAdditivesBasedOnCategories(
        categoryTitle.category
      );
      setAdditives(_additives);
    })();
    console.timeEnd("fetching");
  }, [categoryId]);

  if (!additiveCategory) {
    return <div>Invalid category!</div>;
  }
  return (
    <div className="flex flex-col gap-3 relative px-3">
      <div className="relative mb-20">
        <AdditivesIndicator
          title1={additiveCategory?.additive}
          title2={additiveCategory?.category}
          backButton
        />
      </div>
      <br />
      <div className="flex flex-col gap-1 relative ">
        {additives.map((element) => {
          return (
            <NameCard
              key={element.e_number}
              enumber={element.e_number}
              name={element.name}
            />
          );
        })}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

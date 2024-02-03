import { useEffect, useState } from "react";
import ScanIgredientsButton from "../components/Buttons/ScanIgredientsButton";
import CategoryCard from "../components/Cards/CategoryCard";
import HistoryCard from "../components/Cards/HistoryCard";
import SearchBar from "../components/SearchBar/SearchBar";
import MutedTitle from "../components/Titles/MutedTitle";
import { HistoryAdditives } from "../models/History.model";
import { additivesAndCategories } from "../services/additivesAndCategories";
import { getHistoryItemsInDescendingOrder } from "../services/database/History";

export default function Dashboard() {
  const [historyElements, setHistoryElements] = useState<HistoryAdditives[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const _history = await getHistoryItemsInDescendingOrder();
      setHistoryElements(_history);
    })();
  }, []);
  return (
    <div className="py-5 flex flex-col gap-3">
      {/* App logo */}
      <div className="uppercase font-bold px-3 text-2xl">My Food Additives</div>
      {/* Search bar */}
      <div className="px-3">
        <SearchBar />
      </div>
      {/* Scanner */}
      <div className="px-3">
        <ScanIgredientsButton action="SCAN INGREDIENTS" />
      </div>
      <br />
      <br />
      <br />
      {/* Categories */}
      <MutedTitle title="E-numbers Categories" />
      <div className="overflow-x-auto ps-3">
        <div className="flex flex-row gap-3 w-fit pe-4 sm:flex-wrap">
          {additivesAndCategories.map((cat, ind) => {
            const version = (ind + 1) % 2 === 0 ? "A" : "B";
            return (
              <CategoryCard
                key={cat.additive}
                subTitle={cat.category}
                title={cat.additive}
                version={version}
              />
            );
          })}
        </div>
      </div>
      {/* history */}
      {!!historyElements.length && <MutedTitle title="History" />}

      <div className="overflow-x-auto ps-3">
        <div className="flex flex-row gap-3 w-fit pe-4 sm:flex-wrap sm:mb-20">
          {historyElements.map((history) => {
            return (
              <HistoryCard
                key={history.e_number}
                subTitle={history.name}
                title={history.e_number}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

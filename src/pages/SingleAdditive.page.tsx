import { useParams } from "react-router-dom";
import AdditivesIndicator from "../components/Indicators/AdditivesIndicator";
import MutedTitle from "../components/Titles/MutedTitle";
import AdditivesTypeCard from "../components/Cards/AdditivesTypeCard";
import DescriptionCard from "../components/Cards/DescriptionCard";
import { useEffect, useState } from "react";
import { getAdditiveBasedOnKey } from "../services/database/Additives";
import { Additive } from "../models/Additive.model";
import Spinner from "../components/Spinner";
import {
  RestrictionOutput,
  getRestrictionDataBasedOnAdditiveId,
} from "../services/database/Restrictions";
import { setHistoryItem } from "../services/database/History";
import { additiveStatusAndValue } from "../services/additiveStatusAndValue";

export default function SingleAdditive() {
  const { additiveId } = useParams();
  const [additive, setAdditive] = useState<Additive | null>(null);
  const [restrictionDataArray, setRestrictionDataArray] = useState<
    RestrictionOutput[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (additiveId) {
      (async () => {
        const additiveDetails = await getAdditiveBasedOnKey(additiveId, 1);
        setLoading(false);
        if (additiveDetails.length > 0) {
          const _additive = additiveDetails[0];
          setAdditive(_additive);
          await setHistoryItem(_additive.e_number, _additive.name);

          const restrictionId = _additive.subject;
          if (restrictionId) {
            const restrictions = await getRestrictionDataBasedOnAdditiveId(
              restrictionId
            );
            setRestrictionDataArray(restrictions || []);
          }
        }
      })();
    }
  }, [additiveId]);

  if (loading || !additive) {
    return <Spinner />;
  }

  const veganStatus = additiveStatusAndValue(additive.vegan);
  const vegStatus = additiveStatusAndValue(additive.vegetarian);

  const isDescription = Boolean(additive.description);
  const isUsage = Boolean(additive.use);
  const isCategory = Boolean(additive.category);
  const isNotDetails = !isDescription && !isUsage && !isCategory;

  const isRestrictions = Boolean(additive.subject);

  return (
    <div className="flex flex-col gap-3 relative px-3">
      <div className="relative mb-20">
        <AdditivesIndicator
          title1={additive.e_number}
          title2={additive.name}
          backButton
        />
      </div>
      <br />
      {/* Stutus */}
      <div className="flex gap-2 flex-col">
        <MutedTitle title="Status" />
        <AdditivesTypeCard title="vegan" variant={veganStatus} />
        <AdditivesTypeCard title="Vegetarian" variant={vegStatus} />
      </div>

      {/* Details */}
      {!isNotDetails && (
        <div className="flex gap-2 flex-col">
          <MutedTitle title="Details" />
          {isCategory && (
            <DescriptionCard title="Category" body={additive.category!} />
          )}
          {isDescription && (
            <DescriptionCard title="Description" body={additive.description!} />
          )}
          {isUsage && <DescriptionCard title="Usage" body={additive.use!} />}
        </div>
      )}

      {/* Restrictions */}
      {isRestrictions && (
        <div className="flex gap-2 flex-col">
          <MutedTitle title="Restrictions based on food" />
          {restrictionDataArray.map((restrictionData) => {
            return (
              <DescriptionCard
                key={restrictionData.title}
                title={restrictionData.title}
                body={restrictionData.comment}
              />
            );
          })}
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

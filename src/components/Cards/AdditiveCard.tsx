import { useNavigate } from "react-router-dom";
import AdditivesTypeCard from "./AdditivesTypeCard";
import { additiveStatusAndValue } from "../../services/additiveStatusAndValue";

type IProps = {
  name: string;
  e_number: string;
  description?: string;
  vegan?: boolean;
  vegetarian?: boolean;
};

export default function AdditiveCard({
  e_number,
  name,
  description,
  vegan,
  vegetarian,
}: IProps) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/additive/${e_number}`);
  }

  return (
    <div
      onClick={handleNavigate}
      className="rounded-3xl p-3 bg-fg max-w-[620px]"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="uppercase text-textGray font-extrabold text-xs">
          {name}
        </div>
        <span className="bg-secondaru p-1 px-2 text-xs font-bold rounded-full">
          {e_number}
        </span>
      </div>
      <div className="font-semibold text-sm mt-2">{description || ""}</div>
      <div className="flex gap-2 items-center mt-2">
        <AdditivesTypeCard
          title="Vegan"
          variant={additiveStatusAndValue(vegan)}
        />
        <AdditivesTypeCard
          title="Vegetarian"
          variant={additiveStatusAndValue(vegetarian)}
        />
      </div>
    </div>
  );
}

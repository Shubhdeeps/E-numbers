import { useNavigate } from "react-router-dom";
import { backSVG } from "../../assets/icons/BackIcon";

type IProps = {
  title1: string;
  title2?: string;
  backButton?: boolean;
};

export default function AdditivesIndicator({
  backButton,
  title1,
  title2,
}: IProps) {
  const navigate = useNavigate();
  function handleNavigateBack() {
    navigate(-1);
  }
  return (
    <div
      className={`bg-secondaru rounded-b-3xl
  absolute
  min-h-[84px] w-[200px]
  top-0 left-0
  p-3 flex flex-col uppercase
  `}
    >
      {backButton && <span onClick={handleNavigateBack}>{backSVG}</span>}
      <div className="font-bold mt-auto">{title1}</div>
      {title2 && (
        <div className="font-semibold text-xs mt-[-5px]">{title2}</div>
      )}
    </div>
  );
}

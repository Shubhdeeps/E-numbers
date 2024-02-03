import { useNavigate } from "react-router-dom";

type IProp = {
  title: string;
  subTitle: string;
};

export default function HistoryCard({ subTitle, title }: IProp) {
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/additive/${title}`);
  }
  return (
    <div
      onClick={handleNavigate}
      className="rounded-3xl bg-fg w-[133px] h-[60px] p-1 px-4 flex flex-col gap-0 cursor-pointer"
    >
      <span className="font-semibold text-lg">{title}</span>
      <span className="text-xs text-[0.6rem] font-medium mt-[-5px] text-textGray w-24 h-5 truncate">
        {subTitle}
      </span>
    </div>
  );
}

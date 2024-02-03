import { useNavigate } from "react-router-dom";

type IProp = {
  title: string;
  subTitle: string;
  version: "A" | "B";
};

enum Version {
  "A" = "top-6 left-3",
  "B" = "bottom-6 right-3",
}

export default function CategoryCard({ subTitle, title, version }: IProp) {
  const versionClass = Version[version];
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/category/${title}`);
  }
  return (
    <div
      onClick={handleClick}
      className={`
      bg-fg
      cursor-pointer
      rounded-3xl
      h-[224px] w-[198px] 
      relative 
      flex flex-col justify-center items-center
      `}
    >
      {/* Background design */}
      <div
        className={`bg-fg_secondary w-[127px] h-[148px] rounded-3xl absolute ${versionClass}`}
      />

      <span className="text-3xl z-10 font-semibold">{title}</span>
      <span className="z-10 text-xs font-bold uppercase text-center mt-2">
        {subTitle}
      </span>
    </div>
  );
}

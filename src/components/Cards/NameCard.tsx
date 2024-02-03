import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type IProps = {
  name: string;
  enumber: string;
  selectedText?: string;
};

export default function NameCard({ enumber, name, selectedText }: IProps) {
  const [enumberText, setEnumberText] = useState(() => <span>{enumber}</span>);
  const [nameText, setNameText] = useState(() => <span>{name}</span>);
  const navigate = useNavigate();
  function handleNavigate() {
    navigate(`/additive/${enumber}`);
  }
  useEffect(() => {
    if (selectedText) {
      const replacedEnum = enumber
        .toLowerCase()
        .replace(
          selectedText.toLowerCase(),
          `<span class="text-highlight">${selectedText.toLowerCase()}</span>`
        );
      const replacedName = name
        .toLowerCase()
        .replace(
          selectedText.toLowerCase(),
          `<span class="text-highlight">${selectedText.toLowerCase()}</span>`
        );
      setEnumberText(
        <div dangerouslySetInnerHTML={{ __html: replacedEnum }} />
      );

      setNameText(<div dangerouslySetInnerHTML={{ __html: replacedName }} />);
    }
  }, [enumber, name, selectedText]);

  return (
    <div
      onClick={handleNavigate}
      className="
    bg-fg 
    p-3 
    flex items-center justify-between
    rounded-3xl
    "
    >
      <span className="font-semibold capitalize">{enumberText}</span>
      <p className="first-letter:capitalize max-w-[40%] text-end  truncate">
        {nameText}
      </p>
    </div>
  );
}

import { useRef, useState } from "react";
import { searchSVG } from "../../assets/icons/SearchIcon";
import NameCard from "../Cards/NameCard";
import { backSVG } from "../../assets/icons/BackIcon";
import { getAdditiveBasedOnKey } from "../../services/database/Additives";
import { Additive } from "../../models/Additive.model";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [enumberList, setEnumberList] = useState<Additive[]>([]);
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  function _clear() {
    setSearchText("");
    setActive(false);
  }
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setSearchText(text);
    const isActive = !!text;

    setActive(isActive);
    if (isActive) {
      const values = await getAdditiveBasedOnKey(text);

      setEnumberList(values);
      // searchEnumber(searchedText, setEnumberList);
    } else {
      setEnumberList([]);
    }
  }
  return (
    <>
      <div
        ref={containerRef}
        className={`
    bg-secondaru
    flex items-center 
    rounded-b-3xl
    gap-3
    p-4
    ${
      active
        ? "absolute rounded-none top-0 left-0 w-full z-30"
        : "w-full  rounded-3xl"
    }
    `}
      >
        <span className="mt-[0.1rem]">
          {active ? (
            <span onClick={_clear} className="cursor-pointer">
              {backSVG}
            </span>
          ) : (
            searchSVG
          )}
        </span>
        <input
          className="
        bg-transparent 
        border-none 
        outline-none 
        active:border-none 
        placeholder:text-slate-200
       border
        "
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
        />
      </div>

      {/* Result area */}
      {active && (
        <div
          className="bg-bg absolute w-full h-full top-0 left-0 z-20
        flex flex-col gap-1 p-3
        "
        >
          {/* Render the result list items */}
          <br />
          <br />
          {enumberList.map((element) => {
            return (
              <NameCard
                key={element.e_number}
                enumber={element.e_number}
                name={element.name}
                selectedText={searchText}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

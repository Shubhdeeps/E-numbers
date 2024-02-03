import { useEffect, useRef, useState } from "react";
import AdditivesIndicator from "../components/Indicators/AdditivesIndicator";
import { Additive } from "../models/Additive.model";
import { getAdditivesList } from "../services/database/Additives";
import NameCard from "../components/Cards/NameCard";
import { useInView } from "react-intersection-observer";

export default function ListPage() {
  const [list, setList] = useState<Additive[]>([]);
  const fetchedCount = useRef(1);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  async function fetchAdditives() {
    fetchedCount.current += 1;
    const additives = await getAdditivesList(fetchedCount.current);
    setList(additives);
  }
  useEffect(() => {
    fetchAdditives();
  }, []);
  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        fetchAdditives();
      }, 150);
    }
  }, [inView]);

  const lastElementIndex = list.length - 1;

  return (
    <div className="flex flex-col gap-1 relative px-3">
      <div className="relative">
        <AdditivesIndicator title1={"Additives"} title2="All list" />
      </div>
      <br />

      {/* Render the result list items */}
      <br />
      <br />
      <br />
      {list.map((element, index) => {
        return (
          <div
            key={element.e_number}
            ref={index === lastElementIndex ? ref : null}
          >
            <NameCard enumber={element.e_number} name={element.name} />
          </div>
        );
      })}
      <br />
      <br />
      <br />
    </div>
  );
}

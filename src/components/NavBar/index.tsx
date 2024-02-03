import { useEffect, useState } from "react";
import { savedSVG } from "../../assets/icons/HistoryIcon";
import { homeSVG } from "../../assets/icons/HomeIcon";
import { listSVG } from "../../assets/icons/ListIcon";
import { useLocation, useNavigate } from "react-router-dom";

type Pages = "dashboard" | "saved-items" | "list-view" | "none";
const navBarPaths = ["dashboard", "saved-items", "list-view"];
export default function NavBar() {
  const [activePage, setActivePage] = useState<Pages>("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const pathname = location.pathname?.split("/")[1] as Pages | undefined;
    if (location.pathname === "/") {
      //user on dashboard
      setActivePage("dashboard");
    }
    if (pathname && navBarPaths.includes(pathname)) {
      setActivePage(pathname);
    } else {
      setActivePage("none");
    }
  }, [location.pathname]);

  function handleRedirect(path: Pages) {
    navigate(`/${path}`);
  }
  return (
    <div className="fixed bottom-2 w-full flex justify-center">
      <div
        className="
  rounded-full
  w-fit
  h-fit
  py-2
  px-3
  bg-fg
  flex flex-row justify-evenly items-center gap-2
  z-30
   shadow-xl
   border-2 border-bg
  "
      >
        <span
          onClick={() => handleRedirect("saved-items")}
          className={`rounded-full w-[45px] h-[45px] flex justify-center items-center ${
            activePage === "saved-items" && "bg-bg shadow-lg"
          }`}
        >
          {savedSVG}
        </span>
        <span
          onClick={() => handleRedirect("dashboard")}
          className={`rounded-full w-[45px] h-[45px] flex justify-center items-center ${
            activePage === "dashboard" && "bg-bg shadow-lg"
          }`}
        >
          {homeSVG}
        </span>
        <span
          onClick={() => handleRedirect("list-view")}
          className={`rounded-full w-[45px] h-[45px] flex justify-center items-center ${
            activePage === "list-view" && "bg-bg shadow-lg"
          }`}
        >
          {listSVG}
        </span>
      </div>
    </div>
  );
}

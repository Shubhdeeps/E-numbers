import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

export default function Layout() {
  return (
    <>
      <div className="container max-w-[42rem] absolute left-1/2 translate-x-[-50%] h-full">
        <Outlet />
      </div>
      <NavBar />
    </>
  );
}

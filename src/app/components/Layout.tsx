import { Outlet } from "react-router";
import BottomNavigation from "./BottomNavigation";

export default function Layout() {
  return (
    <div className="relative size-full flex flex-col bg-white">
      <div className="flex-1 overflow-auto pb-[65px]">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
}

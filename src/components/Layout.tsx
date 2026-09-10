import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { BottomNav } from "./BottomNav";
import { StorePickerModal } from "./StorePickerModal";

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-fresh-50">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
      <StorePickerModal />
    </div>
  );
}

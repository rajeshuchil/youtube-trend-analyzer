import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#E8E4DF]">
      <Sidebar />
      <main className="flex-1 bg-[#E8E4DF] md:ml-0 pt-[57px] md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;

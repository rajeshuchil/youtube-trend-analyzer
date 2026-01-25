import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#E8E4DF]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 bg-[#E8E4DF]">
        <Outlet context={{ openSidebar: () => setIsSidebarOpen(true) }} />
      </main>
    </div>
  );
}

export default DashboardLayout;

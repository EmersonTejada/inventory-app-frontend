import AppSidebar from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
      <main className="flex-1 p-6">
        <SidebarTrigger />
        <Outlet />
      </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;

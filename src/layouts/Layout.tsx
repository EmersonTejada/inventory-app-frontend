import AppSidebar from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CategoryProvider from "@/context/CategoryProvider";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarProvider>
        <AppSidebar />
      <main className="flex-1 px-8 py-6">
        <SidebarTrigger />
        <CategoryProvider>
          <Outlet />
        </CategoryProvider>
      </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;

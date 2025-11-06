import AppSidebar from "@/components/layout/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import CategoryProvider from "@/context/CategoryProvider";
import { ProductProvider } from "@/context/ProductProvider";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const Layout = () => {
  const { state, authVerify } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
  if (state.checking) {
    const checkAuth = async () => {
      const valid = await authVerify();
      if (!valid) navigate("/login", { replace: true });
    };
    checkAuth();
  }
}, [state.checking, authVerify, navigate]);

  if (state.checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (state.user) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 px-8 py-6">
            <SidebarTrigger />
            <CategoryProvider>
              <ProductProvider>
                <Outlet />
              </ProductProvider>
            </CategoryProvider>
          </main>
        </SidebarProvider>
      </div>
    );
  }
  
  return null;
};
export default Layout;

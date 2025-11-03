import { Package, Tags } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "../ui/sidebar";
import { Link, NavLink } from "react-router";

const AppSidebar = () => {
  const links = [
    {
      to: "/products",
      label: "Productos",
      icon: <Package className="size-4" />,
    },
    {
      to: "/categories",
      label: "Categorias",
      icon: <Tags className="size-4" />,
    },
  ];
  return (
    <aside className="text-center">
      <Sidebar>
        <SidebarHeader>
          <Link to="/">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 px-4 py-2">
              Inventory App
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent className="flex flex-col justify-between h-full">
          <SidebarGroup>
            <SidebarGroupLabel>Navegación</SidebarGroupLabel>
            <SidebarGroupContent className="mt-2 flex flex-col gap-1">
              {links.map(({ to, label, icon }) => (
                <NavLink
                  key={label}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupContent>
              <NavLink
                to="/logout"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Cerrar sesión
              </NavLink>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t py-3 text-center text-xs text-gray-500">
          © 2025 Inventory App
        </SidebarFooter>
      </Sidebar>
    </aside>
  );
};

export default AppSidebar;

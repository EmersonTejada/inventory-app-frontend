import LoginPage from "@/pages/Login";
import Layout from "../layouts/Layout";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
];

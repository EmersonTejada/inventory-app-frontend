import LoginPage from "@/pages/Login";
import Layout from "../layouts/Layout";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import { Route, Routes } from "react-router";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Products />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
};

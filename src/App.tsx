import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./routes/routes";
import AuthProvider from "./context/AuthProvider";

const router = createBrowserRouter(routes);
function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;

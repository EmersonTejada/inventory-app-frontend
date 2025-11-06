import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/routes";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

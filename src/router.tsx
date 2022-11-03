import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-page";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginPage />} path={"/login"} />
      </Routes>
    </BrowserRouter>
  );
}

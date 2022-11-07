import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage, { LOGIN_PAGE_ROUTE } from "./pages/login-page";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PAGE_ROUTE} element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

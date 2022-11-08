import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, HOME_PAGE_ROUTE } from "./pages/home-page";
import LoginPage, { LOGIN_PAGE_ROUTE } from "./pages/login-page";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PAGE_ROUTE} element={<LoginPage />} />
        <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

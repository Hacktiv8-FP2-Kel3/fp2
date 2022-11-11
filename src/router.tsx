import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./api-hooks/user/use-auth";
import Header from "./components/modules/header/header";
import { CartPage, CART_PAGE_ROUTE } from "./pages/cart-page";
import { HomePage, HOME_PAGE_ROUTE } from "./pages/home-page";
import LoginPage, { LOGIN_PAGE_ROUTE } from "./pages/login-page";

function RequireAuth({ children }: { children: JSX.Element }) {
  let { auth } = useAuth();
  let location = useLocation();
  if (!auth?.token) {
    return <Navigate to={LOGIN_PAGE_ROUTE} state={{ from: location }} />;
  }
  return children;
}
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PAGE_ROUTE} element={<LoginPage />} />
        <Route path={HOME_PAGE_ROUTE} element={<HomePage />} />
        <Route
          path={CART_PAGE_ROUTE}
          element={
            <RequireAuth>
              <CartPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

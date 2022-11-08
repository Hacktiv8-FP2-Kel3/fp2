import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";
import Router from "./router";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./api-hooks/user/use-auth";
function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer autoClose={500} />
        <Router />
      </AuthProvider>
    </Provider>
  );
}

export default App;

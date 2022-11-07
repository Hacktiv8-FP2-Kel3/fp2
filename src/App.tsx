import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";
import Router from "./router";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Provider store={store}>
      <ToastContainer autoClose={500} />
      <Router />
    </Provider>
  );
}

export default App;

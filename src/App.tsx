import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";
import Router from "./router";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
        <ToastContainer autoClose={500} />
      </Provider>
    </div>
  );
}

export default App;

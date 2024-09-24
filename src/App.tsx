import { Provider } from "react-redux";
import store from "../lib/store"
import "./App.css";

function App() {
  return (
    <Provider store={store}>    
      <div>React vite ts project</div>
    </Provider>
  );
}

export default App;

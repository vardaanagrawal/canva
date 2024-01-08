import { useSelector } from "react-redux";
import "./App.css";
import Routess from "./routes/Routes";

function App() {
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <div className="App">
      <Routess />
    </div>
  );
}

export default App;

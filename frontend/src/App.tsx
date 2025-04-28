import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Input from "./components/Input";
import Candidates from "./components/Candidates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/input" />} />
        <Route path="/input" element={<Input />} />
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </Router>
  );
}

export default App;

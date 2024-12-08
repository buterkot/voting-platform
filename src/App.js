import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404.js";
import Authorization from "./pages/Authorization.js";
import Registration from "./pages/Registration.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import Admin from "./pages/Admin.js";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Authorization />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
export default App;

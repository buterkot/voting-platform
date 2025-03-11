import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404.js";
import Authorization from "./pages/Authorization.js";
import Registration from "./pages/Registration.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import Admin from "./pages/Admin.js";
import Vote from "./pages/Vote.js";
import Catalog from "./pages/Catalog.js";
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
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vote/:voteId" element={<Vote />} />
      </Routes>
    </Router>
  );
}
export default App;

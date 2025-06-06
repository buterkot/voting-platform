import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404.js";
import Authorization from "./pages/Authorization.js";
import Registration from "./pages/Registration.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import Admin from "./pages/Admin.js";
import Moder from "./pages/Moder.js";
import Vote from "./pages/Vote.js";
import Catalog from "./pages/Catalog.js";
import UserProfile from "./pages/UserProfile";
import "./styles/App.css";
import './i18n';

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
        <Route path="/moder" element={<Moder />} />
        <Route path="/vote/:voteId" element={<Vote />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}
export default App;

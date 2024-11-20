import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404.js";

function App() {
  return (
    <Router>
      <Routes>
        {/*
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}
export default App;

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home.js";
import Questionnaire from "./pages/Questionnaire.js";
import Results from "./pages/Results.js";
import Profile from "./pages/Profile.js";
import About from "./pages/About.js";
import Header from "./components/Header.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Womp from "./pages/Womp.js"

function AppContent() {
  const location = useLocation(); // Get current route
  const hideHeaderRoutes = ["/login", "/signup", "/womp"]; // Routes where header should be hidden

  return (
    <>
      {/* Show Header only if the current path is NOT in hideHeaderRoutes */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/results" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/womp" element={<Womp />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
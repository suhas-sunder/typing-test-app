import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";
import Games from "./pages/Games";
import Account from "./pages/Account";
import Login from "./pages/Login";
import NavBar from "./components/navigation/NavBar";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import Footer from "./components/navigation/Footer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/games" element={<Games />} />
        <Route path="/summary" element={<Account />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/home";
import News from "./Components/News/news";
import Navbar from "./Components/NavBar/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App(props) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(window.location.pathname);
    if (!window.location.pathname.includes("exercise2")) navigate("exercise2");
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="exercise2" element={<Home />} />
        <Route path="exercise2/news" element={<News />} />
      </Routes>
    </div>
  );
}

export default App;

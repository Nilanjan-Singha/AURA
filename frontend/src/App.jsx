import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TrackerProvider } from "./context/Context";
import { APIProvider } from "./context/ApiContext";
import HomePage from "./pages/Homepage";
import Tracker from "./pages/Tracker";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {

  return (
    <ThemeProvider>
    <TrackerProvider>
    <APIProvider>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tracker/:type" element={<Tracker />} />
      </Routes>
    </Router>
    </APIProvider>
    </TrackerProvider>
    </ThemeProvider>
  );
}
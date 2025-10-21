import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TrackerProvider } from "./context/Context";
import { APIProvider } from "./context/APIContext";
import HomePage from "./pages/Homepage";
import Tracker from "./pages/Tracker";

export default function App() {

  return (
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
  );
}
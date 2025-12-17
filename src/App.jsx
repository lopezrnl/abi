import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Welcome from "./pages/Welcome";
import Diary from "./pages/Diary";
import Gallery from "./pages/Gallery";
import AboutAbigail from "./pages/AboutAbigail";
import MemoryDetails from "./pages/MemoryDetails"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/app" element={<MainLayout />}>
          <Route index element={<Navigate to="diary" replace />} />
          <Route path="diary" element={<Diary />} />
          {/* 2. Add this dynamic route */}
          <Route path="diary/:id" element={<MemoryDetails />} /> 
          <Route path="gallery" element={<Gallery />} />
          <Route path="about" element={<AboutAbigail />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
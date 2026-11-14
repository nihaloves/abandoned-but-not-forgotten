import { Routes, Route, Navigate } from "react-router-dom";
import Experience from "../components/Experience";
import App from "../App";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Experience />} />
      <Route path="/explore" element={<Navigate to="/" replace />} />
      <Route path="/experience" element={<Navigate to="/" replace />} />
      <Route path="/classic" element={<App />} />
    </Routes>
  );
}
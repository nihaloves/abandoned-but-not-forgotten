import { Routes, Route } from "react-router-dom";
import Opening from "../pages/Opening.jsx";
import Explorer from "../pages/Explorer.jsx";
import ArtifactDetail from "../pages/ArtifactDetail.jsx";
import Credits from "../pages/Credits.jsx";
import Experience from "../components/Experience.jsx";
import { story } from "../data/missions.js";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Opening />} />
      <Route path="/explore" element={<Explorer />} />
      <Route path="/artifact/:artifactId" element={<ArtifactDetail />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/experience" element={<Experience story={story} />} />
    </Routes>
  );
}
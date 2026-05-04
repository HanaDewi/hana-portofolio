import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import Cv from "./pages/Cv";
import { ProjectDetail } from "./pages/ProjectDetail"; 
import OtherProjectsPage from "./pages/OtherProjectsPage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/other-projects" element={<OtherProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} /> 
          <Route path="/cv" element={<Cv />} /> 
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* TARUH DI SINI */}
      <Toaster /> 
    </>
  );
}

export default App;
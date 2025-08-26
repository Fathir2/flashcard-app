import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateDeck from "./pages/CreateDeck";
import ManageDecks from "./pages/ManageDecks";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import Study from "./pages/Study";
import ContextTest from "./components/test/ContextTest";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateDeck />} />
      <Route path="/manage" element={<ManageDecks />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/study" element={<Study />} />

      <Route path="/test-context" element={<ContextTest />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

export default AppRoutes;

import { HashRouter, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<UserPage />} />
      </Routes>
    </HashRouter>
  );
}

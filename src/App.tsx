import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage";
import AdminPage from "./AdminPage";

/**
 * App Root
 * Handles all routing
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home / User Page */}
        <Route path="/" element={<UserPage />} />

        {/* Admin Page */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Fallback: redirect unknown routes to home */}
        <Route path="*" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

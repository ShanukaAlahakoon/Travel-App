import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={<h1 className="text-center mt-10 text-2xl">Home Page</h1>}
        />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin/*"
          element={
            <h1 className="text-center mt-10 text-2xl">Admin Dashboard</h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { getToken, getStoredUser, clearSession } from "./lib/auth";
import { setAuthToken } from "./lib/api";

import PublicLayout from "./layouts/PublicLayout";
import AppLayout from "./layouts/AppLayout";

import Landing from "./pages/public/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/app/Dashboard";
import Chamas from "./pages/app/Chamas";
import ChamaDetails from "./pages/app/ChamaDetails";
import CreateChama from "./pages/app/CreateChama";
import JoinChama from "./pages/app/JoinChama";
import Settings from "./pages/app/Settings";

function ProtectedRoute({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(() => getStoredUser());
  const token = useMemo(() => getToken(), []);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const onLogout = () => {
    clearSession();
    setAuthToken(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <Routes>
      <Route element={<PublicLayout user={user} onLogout={onLogout} />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onAuthed={setUser} />} />
        <Route path="/register" element={<Register onAuthed={setUser} />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <AppLayout user={user} onLogout={onLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/chamas" element={<Chamas />} />
        <Route path="/app/chamas/create" element={<CreateChama />} />
        <Route path="/app/chamas/join" element={<JoinChama />} />
        <Route path="/app/chamas/:chamaId" element={<ChamaDetails />} />
        <Route path="/app/settings" element={<Settings user={user} />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

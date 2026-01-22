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

// NEW pages
import Notifications from "./pages/app/Notifications";
import Profile from "./pages/app/Profile";
import Contributions from "./pages/app/Contributions";
import Members from "./pages/app/Members";
import Meetings from "./pages/app/Meetings";

function isLoggedIn() {
  // Spec says localStorage.getItem("token"), but your project uses cc_token.
  // Support BOTH so nothing breaks.
  return Boolean(localStorage.getItem("token") || getToken());
}

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(() => getStoredUser());

  const token = useMemo(() => localStorage.getItem("token") || getToken(), []);

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const onLogout = () => {
    // Clear BOTH token styles safely
    localStorage.removeItem("token");
    clearSession();
    setAuthToken(null);
    setUser(null);
    window.location.href = "/login";
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
        <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />

        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/chamas" element={<Chamas />} />
        <Route path="/app/chamas/create" element={<CreateChama />} />
        <Route path="/app/chamas/join" element={<JoinChama />} />
        <Route path="/app/chamas/:chamaId" element={<ChamaDetails />} />

        <Route path="/app/notifications" element={<Notifications />} />
        <Route path="/app/profile" element={<Profile onLogout={onLogout} />} />
        <Route path="/app/settings" element={<Settings user={user} />} />

        <Route
          path="/app/chamas/:chamaId/contributions"
          element={<Contributions />}
        />
        <Route path="/app/chamas/:chamaId/members" element={<Members />} />
        <Route path="/app/chamas/:chamaId/meetings" element={<Meetings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

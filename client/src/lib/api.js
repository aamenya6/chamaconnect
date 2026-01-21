import axios from "axios";
import { getToken } from "./auth";

// Prefer env var; fallback to local server
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token automatically for every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Keep your existing helper for backward compatibility
export function setAuthToken(token) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

/**
 * Detect "server is not running" vs real API errors.
 * - If server is down/unreachable -> fallback to mocks.
 * - If server responds with 4xx/5xx -> do NOT fallback (show real error).
 */
function isServerDown(error) {
  // Axios sets error.response when server responded (even with errors)
  if (error?.response) return false;

  const code = error?.code;
  const msg = String(error?.message || "").toLowerCase();

  return (
    code === "ECONNABORTED" ||
    code === "ERR_NETWORK" ||
    code === "ECONNREFUSED" ||
    msg.includes("network") ||
    msg.includes("failed to fetch") ||
    msg.includes("connection refused")
  );
}

/* ------------------------------------------------------------------
   MOCK DATA (used only when server is down)
------------------------------------------------------------------- */
const MOCK_USER = {
  id: "u1",
  name: "Abel Nyarunda",
  email: "abel@example.com",
  phone: "+254 7XX XXX XXX",
  location: "Kenya",
  joinedAt: "2026-01-01",
};

const MOCK_CHAMAS = [
  {
    _id: "c1",
    name: "Watu Wa Savings",
    description: "Monthly contributions for growth and emergencies.",
    contributionAmount: 5000,
    cycle: "monthly",
    inviteCode: "A1B2C3D4",
    memberCount: 12,
    myRole: "admin",
  },
  {
    _id: "c2",
    name: "Chama ya Hustlers",
    description: "A focused group for business-first saving culture.",
    contributionAmount: 3000,
    cycle: "monthly",
    inviteCode: "HUSTL3R5",
    memberCount: 8,
    myRole: "member",
  },
];

const MOCK_MEMBERS_BY_CHAMA = {
  c1: [
    { memberId: "mm1", userId: "u1", name: "Abel Nyarunda", email: "abel@example.com", role: "admin", joinedAt: "2026-01-01" },
    { memberId: "mm2", userId: "u2", name: "Joy", email: "joy@example.com", role: "treasurer", joinedAt: "2026-01-02" },
    { memberId: "mm3", userId: "u3", name: "Brian K.", email: "brian@example.com", role: "member", joinedAt: "2026-01-03" },
  ],
  c2: [
    { memberId: "mm4", userId: "u1", name: "Abel Nyarunda", email: "abel@example.com", role: "admin", joinedAt: "2026-01-05" },
    { memberId: "mm5", userId: "u5", name: "Kevin T.", email: "kevin@example.com", role: "treasurer", joinedAt: "2026-01-06" },
  ],
};

const MOCK_CONTRIBUTIONS_BY_CHAMA = {
  c1: [
    { id: "p1", memberName: "Abel Nyarunda", memberEmail: "abel@example.com", amount: 5000, status: "paid", dueDate: null, paidAt: "2026-01-10", note: "January" },
    { id: "p2", memberName: "Joy", memberEmail: "joy@example.com", amount: 5000, status: "paid", dueDate: null, paidAt: "2026-01-11", note: "January" },
    { id: "p3", memberName: "Brian K.", memberEmail: "brian@example.com", amount: 5000, status: "pending", dueDate: "2026-01-15", paidAt: null, note: "Pending" },
  ],
};

const MOCK_MEETINGS_BY_CHAMA = {
  c1: [
    { _id: "mt1", title: "January Kickoff", agenda: "Plan payouts", dateTime: "2026-01-25T19:00:00.000Z", location: "Google Meet" },
    { _id: "mt2", title: "December Review", agenda: "Review last month", dateTime: "2025-12-20T18:30:00.000Z", location: "WhatsApp Call" },
  ],
};

const MOCK_NOTIFICATIONS = [
  { _id: "n1", type: "contribution", message: "Your January contribution is due soon.", isRead: false, createdAt: "2026-01-21T10:00:00.000Z" },
  { _id: "n2", type: "meeting", message: "January Kickoff meeting scheduled.", isRead: true, createdAt: "2026-01-17T10:00:00.000Z" },
];

/* ------------------------------------------------------------------
   REAL API wrappers (use server when available)
------------------------------------------------------------------- */

export async function getMyChamas() {
  try {
    const { data } = await api.get("/chamas");
    return data; // { chamas: [...] }
  } catch (e) {
    if (isServerDown(e)) return Promise.resolve({ chamas: MOCK_CHAMAS });
    throw e;
  }
}

export async function getChamaById(chamaId) {
  try {
    const { data } = await api.get(`/chamas/${chamaId}`);
    return data; // { chama: {...} }
  } catch (e) {
    if (isServerDown(e)) {
      const chama = MOCK_CHAMAS.find((c) => c._id === chamaId) || null;
      return Promise.resolve({ chama });
    }
    throw e;
  }
}

export async function getChamaContributions(chamaId) {
  try {
    const { data } = await api.get(`/chamas/${chamaId}/contributions`);
    return data; // { contributions: [...] }
  } catch (e) {
    if (isServerDown(e)) return Promise.resolve({ contributions: MOCK_CONTRIBUTIONS_BY_CHAMA[chamaId] || [] });
    throw e;
  }
}

export async function getChamaMembers(chamaId) {
  try {
    const { data } = await api.get(`/chamas/${chamaId}/members`);
    return data; // { members: [...] }
  } catch (e) {
    if (isServerDown(e)) return Promise.resolve({ members: MOCK_MEMBERS_BY_CHAMA[chamaId] || [] });
    throw e;
  }
}

export async function getChamaMeetings(chamaId) {
  try {
    const { data } = await api.get(`/chamas/${chamaId}/meetings`);
    return data; // { meetings: [...] }
  } catch (e) {
    if (isServerDown(e)) return Promise.resolve({ meetings: MOCK_MEETINGS_BY_CHAMA[chamaId] || [] });
    throw e;
  }
}

export async function getNotifications() {
  try {
    const { data } = await api.get("/notifications");
    return data; // { notifications: [...] }
  } catch (e) {
    if (isServerDown(e)) return Promise.resolve({ notifications: MOCK_NOTIFICATIONS });
    throw e;
  }
}

export async function getMyProfile() {
  try {
    const { data } = await api.get("/auth/me");
    // backend returns { user: { id,name,email } }
    // normalize to { profile: ... } to match your page usage
    return { profile: data.user };
  } catch (e) {
    if (isServerDown(e)) return Promise.resolve({ profile: MOCK_USER });
    throw e;
  }
}

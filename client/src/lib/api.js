import axios from "axios";

/**
 * Existing axios instance (keep)
 */
export const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export function setAuthToken(token) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

/**
 * -------------------------------------------------------
 * Mock-friendly API stubs (backend not required yet)
 * -------------------------------------------------------
 * These are SAFE to use even before backend exists.
 * They return Promise.resolve(...) with static mock data.
 */

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
    currency: "KES",
    inviteCode: "A1B2C3D4",
    membersCount: 12,
  },
  {
    _id: "c2",
    name: "Chama ya Hustlers",
    description: "A focused group for business-first saving culture.",
    currency: "KES",
    inviteCode: "HUSTL3R5",
    membersCount: 8,
  },
];

const MOCK_MEMBERS_BY_CHAMA = {
  c1: [
    { id: "m1", name: "Abel Nyarunda", email: "abel@example.com", role: "Admin" },
    { id: "m2", name: "Joy", email: "joy@example.com", role: "Treasurer" },
    { id: "m3", name: "Brian K.", email: "brian@example.com", role: "Member" },
    { id: "m4", name: "Mercy W.", email: "mercy@example.com", role: "Member" },
  ],
  c2: [
    { id: "m1", name: "Abel Nyarunda", email: "abel@example.com", role: "Admin" },
    { id: "m5", name: "Kevin T.", email: "kevin@example.com", role: "Treasurer" },
    { id: "m6", name: "Sarah N.", email: "sarah@example.com", role: "Member" },
  ],
};

const MOCK_CONTRIBUTIONS_BY_CHAMA = {
  c1: [
    { id: "p1", member: "Abel Nyarunda", amount: 5000, date: "2026-01-10", status: "Paid" },
    { id: "p2", member: "Joy", amount: 5000, date: "2026-01-11", status: "Paid" },
    { id: "p3", member: "Brian K.", amount: 5000, date: "2026-01-15", status: "Pending" },
    { id: "p4", member: "Mercy W.", amount: 5000, date: "2026-01-05", status: "Late" },
  ],
  c2: [
    { id: "p5", member: "Abel Nyarunda", amount: 3000, date: "2026-01-09", status: "Paid" },
    { id: "p6", member: "Kevin T.", amount: 3000, date: "2026-01-13", status: "Pending" },
  ],
};

const MOCK_MEETINGS_BY_CHAMA = {
  c1: [
    { id: "mt1", title: "January Kickoff", date: "2026-01-25", time: "19:00", location: "Google Meet", status: "Upcoming" },
    { id: "mt2", title: "December Review", date: "2025-12-20", time: "18:30", location: "WhatsApp Call", status: "Past" },
  ],
  c2: [
    { id: "mt3", title: "Business Ideas Roundtable", date: "2026-02-02", time: "20:00", location: "Google Meet", status: "Upcoming" },
  ],
};

const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    title: "Contribution reminder",
    message: "Your January contribution is due soon. Keep your chama consistent.",
    date: "2026-01-21",
    read: false,
  },
  {
    id: "n2",
    title: "New member joined",
    message: "Mercy W. joined Watu Wa Savings using your invite code.",
    date: "2026-01-18",
    read: true,
  },
  {
    id: "n3",
    title: "Meeting scheduled",
    message: "January Kickoff meeting is scheduled for 25 Jan at 19:00.",
    date: "2026-01-17",
    read: false,
  },
];

function delay(ms = 250) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function getMyChamas() {
  await delay();
  return { chamas: MOCK_CHAMAS };
}

export async function getChamaById(chamaId) {
  await delay();
  const chama = MOCK_CHAMAS.find((c) => c._id === chamaId) || null;
  return { chama };
}

export async function getChamaContributions(chamaId) {
  await delay();
  return { contributions: MOCK_CONTRIBUTIONS_BY_CHAMA[chamaId] || [] };
}

export async function getChamaMembers(chamaId) {
  await delay();
  return { members: MOCK_MEMBERS_BY_CHAMA[chamaId] || [] };
}

export async function getChamaMeetings(chamaId) {
  await delay();
  return { meetings: MOCK_MEETINGS_BY_CHAMA[chamaId] || [] };
}

export async function getNotifications() {
  await delay();
  return { notifications: MOCK_NOTIFICATIONS };
}

export async function getMyProfile() {
  await delay();
  return { profile: MOCK_USER };
}

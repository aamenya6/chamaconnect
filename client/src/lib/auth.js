const KEY = "cc_token";
const USER_KEY = "cc_user";
const LEGACY_TOKEN_KEY = "token"; // backend integration / guard compatibility

export function saveSession({ token, user }) {
  localStorage.setItem(KEY, token);
  localStorage.setItem(LEGACY_TOKEN_KEY, token); // ✅ also store here
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem(KEY) || localStorage.getItem(LEGACY_TOKEN_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
  localStorage.removeItem(KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

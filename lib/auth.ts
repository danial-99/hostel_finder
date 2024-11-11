import { sign, verify } from "jsonwebtoken";

export function setSession(token: string) {
  localStorage.setItem("sessionToken", token);
}

export function getSession(): string | null {
  return localStorage.getItem("sessionToken");
}

export function clearSession() {
  localStorage.removeItem("sessionToken");
}

export function isSessionValid(): boolean {
  const token = getSession();
  if (!token) return false;

  const decoded = verifyToken(token);
  return !!decoded;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const DAY_IN_SECONDS = 86400; // 24 hours * 60 minutes * 60 seconds

export function generateToken(id: string, rememberMe: boolean = false): string {
  const expiresIn = rememberMe ? 30 * DAY_IN_SECONDS : DAY_IN_SECONDS;
  return sign({ id }, JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string): { id: string } | null {
  try {
    const decoded = verify(token, JWT_SECRET) as { id: string };
    return decoded;
  } catch (error) {
    return null;
  }
}

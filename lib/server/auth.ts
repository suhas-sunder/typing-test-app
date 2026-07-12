import jwt, { type SignOptions } from "jsonwebtoken";

export type AuthUser = {
  userId: string;
  userName: string;
  email: string;
};

type JwtPayload = {
  user?: string;
  userId: string;
  userName?: string;
  email?: string;
};

export function createToken(user: AuthUser): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  const options: SignOptions = {
    expiresIn: (process.env.SESSION_EXP || "7d") as SignOptions["expiresIn"],
  };

  return jwt.sign({ user: user.userId }, secret, options);
}

export function getUserIdFromAuthHeader(authHeader: string | null): string | null {
  if (!authHeader?.startsWith("Bearer ")) return null;

  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded.user ?? decoded.userId ?? null;
  } catch {
    return null;
  }
}

export function verifyAuthHeader(authHeader: string | null): AuthUser | null {
  const userId = getUserIdFromAuthHeader(authHeader);
  if (!userId) return null;

  return {
    userId,
    userName: "",
    email: "",
  };
}

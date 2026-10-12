import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "secretkey"; // Gantilah dengan env variable
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";

export const generateToken = (user: any) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1d" });
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, REFRESH_SECRET, { expiresIn: "7d" });
};


export const verifyToken = (token: string): { isValid: boolean; data?: any } => {
  try {
    const verifiedToken = jwt.verify(token, SECRET_KEY);
    return {
      isValid: true,
      data: verifiedToken,
    };
  } catch {
    return {
      isValid: false,
    };
  }
};

export const verifyRefreshToken = (token: string): { isValid: boolean; data?: any } => {
  try {
    const verifiedToken = jwt.verify(token, REFRESH_SECRET);
    return {
      isValid: true,
      data: verifiedToken,
    };
  } catch {
    return {
      isValid: false,
    };
  }
};

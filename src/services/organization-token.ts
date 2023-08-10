import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import type { organizationDetails } from "../models/request";
import { JWT_SECRET } from "../__CONSTANTS__";

interface TokenPayload {
  organization: organizationDetails;
}

const generateVerificationToken = async (
  organizationDetails: any
): Promise<string> => {
  const tokenPayload: TokenPayload = {
    organization: organizationDetails
  };

  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "24h" });

  return token;
};

export default generateVerificationToken;

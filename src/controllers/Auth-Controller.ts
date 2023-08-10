import { Request, Response } from "express";
import { User } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Password } from "../services/password";
import { JWT_SECRET } from "../__CONSTANTS__";
import { verifyToken } from "../services/tokenMethods";
interface DecodedToken extends JwtPayload {
  organization: { organizationId: string };
  token: string;
}
export const SignIn__AUTH__POST = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = await User.find({});

  console.log(users);
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const verifyPassword = await Password.compare(user.password, password);

  try {
    if (verifyPassword) {
      const userData = { ...user.toObject(), password: "" };

      const token = jwt.sign({ user: userData }, JWT_SECRET, {
        expiresIn: "9h"
      });

      return res.status(200).json({
        staus: "success",
        data: { userAuth: userData, userJwt: token }
      });
    }
    return res.status(404).json({ message: "Invalid user credentials" });
  } catch (error: any) {
    return res.status(404).json({ message: error.message });
  }
};

export const SignUp__AUTH__POST = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, roles } = req.body;
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(401).json({ error: "Email Already in use" });
    }
    const hashedPassword = await Password.toHash(password);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      roles: roles
    });
    const userData = { ...user.toObject(), password: null as string };

    const token = jwt.sign({ user: userData }, JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as unknown as DecodedToken;
    console.log(token);

    console.log("decoded:", decoded);

    res.json({
      status: "success",
      data: { userAuth: userData, userJwt: token }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};
export const Create_Admin__AUTH__POST = async (req: Request, res: Response) => {
  try {
    const { email, password, verificationToken, firstName, lastName } =
      req.body;

    const confirmToken = await verifyToken(verificationToken);

    if (!confirmToken) {
      return res
        .status(401)
        .json({ error: "Your token appears to be Invalid" });
    }
    const confirmTokenDecode = jwt.verify(
      confirmToken.token,
      JWT_SECRET
    ) as unknown as DecodedToken;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(401).json({ error: "Email Already in use" });
    }

    const hashedPassword = await Password.toHash(password);

    console.log(confirmTokenDecode.organization);

    const user = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      roles: ["Organization Admin"],
      organization: confirmTokenDecode.organization.organizationId
    });
    const userData = { ...user.toObject(), password: null as string };

    const token = jwt.sign({ user: userData }, JWT_SECRET);

    res.json({
      status: "success",
      data: { userAuth: userData, userJwt: token }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const Fetch__USER_PROFILE__POST = async (
  req: Request,
  res: Response
) => {
  try {
    const userData = req.user;

    const user = await User.findById(userData?.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

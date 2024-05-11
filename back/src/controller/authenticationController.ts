import { UserModel } from "@/model/userModel";
import { Request, Response } from "express";

const userModel = new UserModel();

export class AuthenticationController {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await userModel.login(username, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user: user });
  }

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    const user = await userModel.getUserByEmail(email);

    if (user) {
      return res.status(400).json({ message: "Username already in use" });
    }

    await userModel.createUser(username, email, password);

    const newUser = await userModel.getUserByUsername(username);

    res.json({ message: "User created", user: newUser });
  }
}

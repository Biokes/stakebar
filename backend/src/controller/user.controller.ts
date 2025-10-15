import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserDTO } from "../data/models";
import { YeildFiException } from "../exception/index.error";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public async register(req: Request, res: Response) {
    const { email } = req.params;
    await this.validateEmail(email?.toLowerCase());
    const user = await this.userService.createUser(email!.toLowerCase());
    return res.status(201).json({
      success: true,
      message: "Successful account creation",
      data: user,
    });
  }

  public async verify(req: Request, res: Response) {
    const { email } = req.params;
    await this.validateEmail(email);
    const user: UserDTO = await this.userService.verify(
      email?.toLowerCase() as string
    );
    return res.status(200).json({
      success: true,
      message: "email successfully verified",
      data: user,
    });
  }

  public async isVerifiedEmail(req: Request, res: Response) {
    const { email } = req.params;
    await this.validateEmail(email);
    const isVerified = await this.userService.isVerifiedEmail(
      email!.toLowerCase()
    );
    return res.status(200).json({
      success: true,
      message: "",
      data: isVerified,
    });
  }

  public async getUser(req: Request, res: Response) {
    const { email } = req.params;
    await this.validateEmail(email);
    const user = await this.userService.getUserByEmail(email!);
    return res.status(200).json({
      success: true,
      data: user,
      message: "success",
    });
  }

  public async reVerify(req: Request, res: Response) {
    const { email } = req.params;
    await this.validateEmail(email);
    await this.userService.reVerify(email!);
    return res.status(200).json({
      success: true,
      data: "",
      message: "Email verification sent",
    });
  }

  private validateEmail(email?: string): void {
    if (!email || email.trim().length === 0) {
      throw new YeildFiException("Email is required");
    }
  }
}

export { UserController };

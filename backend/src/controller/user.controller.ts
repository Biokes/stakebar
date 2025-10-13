import { Request, Response } from "express";
import { UserService } from "../services/userService";

class UserController {
  private userService: UserService;
    
  constructor(userService: UserService) {
    this.userService = userService;
  }
  public async register(req: Request, res: Response) {
    const { email } = req.params;
    this.validateEmail(res, email);
    this.userService.createUser(email!.toLowerCase());
    return res.status(200).json({
      success: true,
      message: "Successful account creation",
      data: "",
    });
  }

  public async verify(req: Request, res: Response) {
    const { email } = req.params;
    this.validateEmail(res, email);
      
  }

  private async validateEmail(res: Response, email?: string) {
    if (!email || email.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
        data: "no data",
      });
    }
  }
}


export { UserController };

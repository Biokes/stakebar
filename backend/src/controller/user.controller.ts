import { UserService } from "../services/userService";

class UserController { 
    private userService: UserService;
    constructor(userService: UserService) {
        this.userService = userService;
    }
    public async register(email: string) { 
        this.userService.createUser(email)
    }
}
export  { UserController }
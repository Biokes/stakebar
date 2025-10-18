import { whatsappController } from "../config/context";
const { Router } = require("express")
const whatsappRouter = Router();

whatsappRouter.get("/",whatsappController.getWebhook.bind(whatsappController))
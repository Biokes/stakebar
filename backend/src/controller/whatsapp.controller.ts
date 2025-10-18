import { Request, Response } from 'express';

export class WhatsappController { 
    async webhook(req: Request, res: Response) { 
        let mode = req.query["hub.mode"]
        let challenge = req.query["hub.challenge"]
        let token = req.query["hub.verify_token"]
        const myToken = "rafikki";
        if (mode && myToken) { 
            if (mode === "subscribe" && token === myToken) {
                res.status(200).send(challenge);
            } else { 
                return res.status(403);
            }
        }
    }
}

import { Request, Response } from 'express';

export class WhatsappController { 

    async getWebhook(req: Request, res: Response) { 
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

    async postWebHook(request: Request, response: Response) { 
        let body_params = request.body()
        console.log(JSON.stringify(body_params, null, 2));
        if (body_params.object) { 
            if (body_params.entry &&
                body_params.entry[0].changes && 
                body_params.entry[0].changes[0].value.message[0]
            ) { 
                let phone_no_id = body_params.entry[0].challenge[0].value.metadata.phone_number_id;
                let from = body_params.entry[0].changes[0].value.messages[0].from;
                let msg_body = body_params.entry[0].changes[0].value.messages[0].text.body;
            }
        }
    }
}

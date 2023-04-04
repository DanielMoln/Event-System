import { Router, Request, Response } from "express";
import { createEvent, deleteEvent, editEvent, getAllEvent } from "../../services/Event.service";
import APIResponse from "../../models/APIResponse.model";

module.exports = (router: Router) => {

    router.get('/', async (req: Request, res: Response) => {
        const response = Object.assign({}, APIResponse);

        try {
            const events = await getAllEvent();

            response.data = events;
            response.statusCode = 200;

            return res.status(201).json(response);
        } catch (err: any) {
            response.statusCode = 400;
            response.message = err.message;

            return res.status(400).json(response);
        }
    });

    router.get('/create', async (req: Request, res: Response) => {
        const response = Object.assign({}, APIResponse);

        try {
            const event = await createEvent(req.body);

            response.data = event;
            response.statusCode = 200;

            return res.status(201).json(response);
        } catch (err: any) {
            response.statusCode = 400;
            response.message = err.message;

            return res.status(400).json(response);
        }
    });

    router.delete('/delete/:id', async (req: Request, res: Response) => {
        const response = Object.assign({}, APIResponse);

        try {
            if (!req.params.id) {
                throw new Error("Az id paraméter hiányzik!");
            }

            if (!Number(req.params.id)) {
                throw new Error("Hibás azonosítót adtál meg!");
            }

            const event = await deleteEvent(Number(req.params.id));

            response.data = event;
            response.statusCode = 200;

            return res.status(201).json(response);
        } catch (err: any) {
            response.statusCode = 400;
            response.message = err.message;

            return res.status(400).json(response);
        }
    });

    router.delete('/edit/:id', async (req: Request, res: Response) => {
        const response = Object.assign({}, APIResponse);

        try {
            if (!req.params.id) {
                throw new Error("Az id paraméter hiányzik!");
            }

            if (!Number(req.params.id)) {
                throw new Error("Hibás azonosítót adtál meg!");
            }

            const event = await editEvent(Number(req.params.id), req.body);

            response.data = event;
            response.statusCode = 200;

            return res.status(201).json(response);
        } catch (err: any) {
            response.statusCode = 400;
            response.message = err.message;

            return res.status(400).json(response);
        }
    });

    return router;
}
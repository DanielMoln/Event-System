import express, { Router, Request, Response } from "express";
import { createOrganizer, deleteOrganizer, editOrganizer, getAllOrganizer } from "../../services/Organizer.service";
import APIResponse from "../../models/APIResponse.model";

module.exports = () => {
    const router: Router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        const response = Object.assign({}, APIResponse);

        try {
            const organizers = await getAllOrganizer();

            response.data = organizers;
            response.statusCode = 200;

            return res.status(201).json(response);
        } catch (err: any) {
            response.statusCode = 400;
            response.message = err.message;

            return res.status(400).json(response);
        }
    });

    router.post('/create', async (req: Request, res: Response) => {
        const response = Object.assign({}, APIResponse);

        try {
            const organizer = await createOrganizer(req.body);

            response.data = organizer;
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

            const organizer = await deleteOrganizer(Number(req.params.id));

            response.data = organizer;
            response.statusCode = 200;

            return res.status(201).json(response);
        } catch (err: any) {
            response.statusCode = 400;
            response.message = err.message;

            return res.status(400).json(response);
        }
    });

    router.put('/edit/:id', async (req: Request, res: Response) => {
        const response = Object.assign({}, APIResponse);

        try {
            if (!req.params.id) {
                throw new Error("Az id paraméter hiányzik!");
            }

            if (!Number(req.params.id)) {
                throw new Error("Hibás azonosítót adtál meg!");
            }

            const organizer = await editOrganizer(Number(req.params.id), req.body);

            response.data = organizer;
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
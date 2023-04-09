"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Event_service_1 = require("../../services/Event.service");
const APIResponse_model_1 = __importDefault(require("../../models/APIResponse.model"));
module.exports = () => {
    const router = express_1.default.Router();
    router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = Object.assign({}, APIResponse_model_1.default);
        try {
            const events = yield (0, Event_service_1.getAllEvent)();
            response.data = events;
            response.statusCode = 200;
            return res.status(201).json(response);
        }
        catch (err) {
            response.statusCode = 400;
            response.message = err.message;
            return res.status(400).json(response);
        }
    }));
    router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = Object.assign({}, APIResponse_model_1.default);
        try {
            const event = yield (0, Event_service_1.createEvent)(req.body);
            response.data = event;
            response.statusCode = 200;
            return res.status(201).json(response);
        }
        catch (err) {
            response.statusCode = 400;
            response.message = err.message;
            return res.status(400).json(response);
        }
    }));
    router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = Object.assign({}, APIResponse_model_1.default);
        try {
            if (!req.params.id) {
                throw new Error("Az id paraméter hiányzik!");
            }
            if (!Number(req.params.id)) {
                throw new Error("Hibás azonosítót adtál meg!");
            }
            const event = yield (0, Event_service_1.deleteEvent)(Number(req.params.id));
            response.data = event;
            response.statusCode = 200;
            return res.status(201).json(response);
        }
        catch (err) {
            response.statusCode = 400;
            response.message = err.message;
            return res.status(400).json(response);
        }
    }));
    router.put('/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = Object.assign({}, APIResponse_model_1.default);
        try {
            if (!req.params.id) {
                throw new Error("Az id paraméter hiányzik!");
            }
            if (!Number(req.params.id)) {
                throw new Error("Hibás azonosítót adtál meg!");
            }
            const event = yield (0, Event_service_1.editEvent)(Number(req.params.id), req.body);
            response.data = event;
            response.statusCode = 200;
            return res.status(201).json(response);
        }
        catch (err) {
            response.statusCode = 400;
            response.message = err.message;
            return res.status(400).json(response);
        }
    }));
    return router;
};

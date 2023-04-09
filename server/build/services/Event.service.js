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
exports.editEvent = exports.deleteEvent = exports.createEvent = exports.getAllEvent = void 0;
const moment_1 = __importDefault(require("moment"));
const Prisma_1 = __importDefault(require("../prisma/Prisma"));
const getAllEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    const Events = yield Prisma_1.default.event.findMany({
        include: {
            Location: true,
            Organizer: true
        }
    });
    return Events;
});
exports.getAllEvent = getAllEvent;
const createEvent = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date, description, timepoint, location, organizer } = body;
    if (name === "") {
        throw new Error("A név mező üres!");
    }
    const createdEvent = yield Prisma_1.default.event.create({
        data: {
            Name: name,
            Date: (0, moment_1.default)(date).toDate(),
            Description: description,
            Location: {
                connect: {
                    id: location
                }
            },
            Organizer: {
                connect: {
                    id: organizer
                }
            },
            TimePoint: timepoint
        }
    });
    return createdEvent;
});
exports.createEvent = createEvent;
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedEvent = yield Prisma_1.default.event.delete({
        where: {
            id: id
        }
    });
    return deletedEvent;
});
exports.deleteEvent = deleteEvent;
const editEvent = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, date, description, timepoint, location, organizer } = body;
    if (name === "" || description === "") {
        throw new Error("A név/leírás mező üres!");
    }
    const updatedEvent = yield Prisma_1.default.event.update({
        where: {
            id: id
        },
        data: {
            Name: name,
            Date: date,
            Description: description,
            Location: {
                connect: {
                    id: location
                }
            },
            Organizer: {
                connect: {
                    id: organizer
                }
            },
            TimePoint: timepoint
        },
    });
    return updatedEvent;
});
exports.editEvent = editEvent;

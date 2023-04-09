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
exports.editOrganizer = exports.deleteOrganizer = exports.createOrganizer = exports.getAllOrganizer = void 0;
const Prisma_1 = __importDefault(require("../prisma/Prisma"));
const getAllOrganizer = () => __awaiter(void 0, void 0, void 0, function* () {
    const organizers = yield Prisma_1.default.organizer.findMany({});
    return organizers;
});
exports.getAllOrganizer = getAllOrganizer;
const createOrganizer = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = body;
    if (name === "" || email === "" || phone === "") {
        throw new Error("A név/email/telefonszám mező üres!");
    }
    const createdOrganizer = yield Prisma_1.default.organizer.create({
        data: {
            Name: name,
            Email: email,
            Phone: phone
        }
    });
    return createdOrganizer;
});
exports.createOrganizer = createOrganizer;
const deleteOrganizer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedOrganizer = yield Prisma_1.default.organizer.delete({
        where: {
            id: id
        }
    });
    return deletedOrganizer;
});
exports.deleteOrganizer = deleteOrganizer;
const editOrganizer = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = body;
    if (name === "" || email === "" || phone === "") {
        throw new Error("A név/email/telefonszám mező üres!");
    }
    const updatedOrganizer = yield Prisma_1.default.organizer.update({
        where: {
            id: id
        },
        data: {
            Email: email,
            Name: name,
            Phone: phone
        },
    });
    return updatedOrganizer;
});
exports.editOrganizer = editOrganizer;

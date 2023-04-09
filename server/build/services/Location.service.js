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
exports.editLocation = exports.deleteLocation = exports.createLocation = exports.getAllLocation = void 0;
const Prisma_1 = __importDefault(require("../prisma/Prisma"));
const getAllLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    const locations = yield Prisma_1.default.location.findMany({});
    return locations;
});
exports.getAllLocation = getAllLocation;
const createLocation = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, longitude, latitude } = body;
    if (name === "") {
        throw new Error("A név mező üres!");
    }
    const createdLocation = yield Prisma_1.default.location.create({
        data: {
            Name: name,
            latitude: latitude,
            longitude: longitude
        }
    });
    return createdLocation;
});
exports.createLocation = createLocation;
const deleteLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedLocation = yield Prisma_1.default.location.delete({
        where: {
            id: id
        }
    });
    return deletedLocation;
});
exports.deleteLocation = deleteLocation;
const editLocation = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, longitude, latitude } = body;
    if (name === "") {
        throw new Error("A név mező üres!");
    }
    const updatedLocation = yield Prisma_1.default.location.update({
        where: {
            id: id
        },
        data: {
            Name: name,
            latitude: latitude,
            longitude: longitude
        },
    });
    return updatedLocation;
});
exports.editLocation = editLocation;

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
require('dotenv').config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Prisma_1 = __importDefault(require("./prisma/Prisma"));
if (process.env.NODE_ENV === 'dev') {
    app.use((0, cors_1.default)({
        origin: [`http://localhost:3000`],
        methods: ['GET', 'POST', 'PUT', 'PATH', 'DELETE'],
        credentials: true
    }));
}
else if (process.env.NODE_ENV === 'prod') {
    app.use((0, cors_1.default)());
}
else {
    app.use((0, cors_1.default)());
}
process.on('uncaughtException', function (err) {
    console.error('Un handled exception: ' + err);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.use((0, cookie_parser_1.default)());
        app.use(body_parser_1.default.json());
        app.use(express_1.default.json({ limit: '500mb' }));
        app.use(body_parser_1.default.urlencoded({ extended: true, limit: '500mb' }));
        app.use('/api/v1/', require('./routes/router'));
        yield Prisma_1.default.$connect().then(() => {
            app.listen(process.env.PORT || 5000, () => {
                console.log(`Server listening on ${process.env.PORT || 5000}`);
            });
        })
            .catch((err) => {
            console.error("Error during starting: " + err);
        });
    });
}
main();

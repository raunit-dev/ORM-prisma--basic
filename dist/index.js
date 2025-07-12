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
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const client = new client_1.PrismaClient();
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield client.user.findMany();
    res.json({
        users
    });
}));
app.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const user = yield client.user.findUnique({
        where: {
            id: id
        }
    });
    res.json({
        user
    });
}));
app.get("/todos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const users = yield client.user.findFirst({
        where: {
            id: id
        },
        select: {
            todos: true,
            username: true,
            password: true
        }
    });
    res.json({
        users
    });
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
// async function main() {
//   const user = await client.user.create({
//     data: {
//       username: "punit bhaiya",
//       password: "rish45",
//       age: 21,
//       city: "kolkata"
//     }
//   });
//   await client.todo.create({
//     data: {
//       title: "CA",
//       description: "baba bhootnath medical",
//       done: false,
//       userId: 2,
//       time: new Date()
//     }
//   });
//   await client.todo.create({
//     data: {
//       title: "yo yo honey singh",
//       description: "Hey guys how are you ?",
//       done: false,
//       userId: 2,
//       time: new Date()
//     }
//   });
//   console.log("User and Todo created.");
// }
// main()
//   .catch((err) => console.error("Error:", err))
//   .finally(() => client.$disconnect());

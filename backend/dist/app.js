"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const dotenv = require("dotenv");
const user_route_1 = require("./routes/user.route");
const advice_1 = require("./middleware/advice");
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = express();
exports.app = app;
app.use(express.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.get("/", (req, res) => {
    console.log("testing main: ", req);
    res.status(200).json({ message: "YieldFi Backend is running 🚀" });
});
app.ues("/api/v1/webhook", whatspppRouter);
app.use("/api/v1/users", user_route_1.userRouter);
app.use(advice_1.handleError);
//# sourceMappingURL=app.js.map
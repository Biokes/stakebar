"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const dotenv = require("dotenv");
const user_route_1 = require("./routes/user.route");
const advice_1 = require("./controller/advice");
dotenv.config();
const app = express();
exports.app = app;
app.use(express.json());
app.get("/", (res) => {
    res.json({ message: "YieldFi Backend is running 🚀" });
});
app.use("/users", user_route_1.userRouter);
app.use(advice_1.handleError);
//# sourceMappingURL=app.js.map
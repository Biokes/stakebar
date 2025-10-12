"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (res) => {
    res.json({ message: "YieldFi Backend is running 🚀" });
});
module.exports = app;
//# sourceMappingURL=app.js.map
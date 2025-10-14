"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const app_1 = require("./app");
const config_1 = require("./config");
const PORT = process.env.PORT;
async function startServer() {
    try {
        console.log("PORT NUMBER: ", process.env.PORT);
        await config_1.AppDataSource.initialize();
        console.log('Connected to AppDataSource');
    }
    catch (error) {
        console.error('Could not connect to database: ', error);
        process.exit(1);
    }
    app_1.app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
startServer();
//# sourceMappingURL=server.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const prisma_1 = require("./generated/prisma");
const PORT = process.env.PORT;
const prisma = new prisma_1.PrismaClient();
async function startServer() {
    try {
        await prisma.$connect();
        console.log('Connected to PostgreSQL');
    }
    catch (error) {
        console.error('Could not connect to database:', error);
        process.exit(1);
    }
    app_1.app.listen(PORT, () => {
        console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
}
startServer();
//# sourceMappingURL=server.js.map
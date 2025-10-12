"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
// import express from 'express';
// import { PrismaClient } from '@prisma/client';
// import { execSync } from 'child_process';
// const app = express();
// const prisma = new PrismaClient();
// // Auto-sync database on startup
// async function initializeDatabase() {
//   try {
//     console.log('🔄 Syncing database schema...');
//     execSync('npx prisma db push --skip-generate', { 
//       stdio: 'inherit',
//       env: { ...process.env }
//     });
//     console.log('✅ Database synced successfully');
//   } catch (error) {
//     console.error('❌ Database sync failed:', error);
//     process.exit(1);
//   }
// }
// async function startServer() {
//   await initializeDatabase();
//   try {
//     await prisma.$queryRaw`SELECT 1`;
//     console.log('✅ Connected to PostgreSQL');
//   } catch (error) {
//     console.error('❌ Failed to connect to PostgreSQL:', error);
//     process.exit(1);
//   }
//   app.get('/\', (req, res) => {
//     res.json({ status: 'ok', message: 'Server is running' });
//   });
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }
// startServer();
//# sourceMappingURL=server.js.map
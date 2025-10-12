"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("./app");
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
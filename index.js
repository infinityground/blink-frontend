"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const route_1 = __importDefault(require("./bet/route"));
const route_2 = __importDefault(require("./claim/route"));
const cors_1 = require("hono/cors");
const zod_openapi_1 = require("@hono/zod-openapi");
const app = new zod_openapi_1.OpenAPIHono();
app.use('/*', (0, cors_1.cors)());
// <--Actions-->
app.route('/api/bet', route_1.default);
app.route('/api/claim', route_2.default);
// </--Actions-->
const port = Number(process.env.PORT);
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port,
});
//# sourceMappingURL=index.js.map
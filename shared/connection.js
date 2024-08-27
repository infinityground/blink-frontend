"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const web3_js_1 = require("@solana/web3.js");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
exports.connection = process.env.RPC_URL ? new web3_js_1.Connection(process.env.RPC_URL) : new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta'));
//# sourceMappingURL=connection.js.map
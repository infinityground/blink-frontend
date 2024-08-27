"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const zod_openapi_1 = require("@hono/zod-openapi");
const openapi_1 = require("../openapi");
const actions_1 = require("@solana/actions");
const spl_memo_1 = require("@solana/spl-memo");
const connection_1 = require("../shared/connection");
const utils_1 = require("../shared/utils");
const WALLET = process.env.WALLET;
const DEFAULT_DONATION_AMOUNT_SOL = 1;
const app = new zod_openapi_1.OpenAPIHono();
app.openapi((0, zod_openapi_1.createRoute)({
    method: 'get',
    path: '/',
    tags: ['bet'],
    responses: openapi_1.actionsSpecOpenApiGetResponse,
}), async (c) => {
    const { icon, title, description, imgId } = await getInfo();
    const amount = 'amount';
    const answer = "";
    const response = {
        icon,
        label: `bet`,
        title,
        description,
        links: {
            actions: [
                {
                    href: `/api/bet/{${amount}}/{${answer}}/{${imgId}}`,
                    label: 'Send',
                    parameters: [
                        {
                            name: answer,
                            label: 'Enter your answer',
                        },
                        {
                            name: amount,
                            label: 'Enter your sol bet (Only 0.05-1 sol)',
                        },
                    ],
                },
            ],
        },
    };
    return c.json(response, 200);
});
app.openapi((0, zod_openapi_1.createRoute)({
    method: 'post',
    path: '/{amount}/{answer}/{imgId}',
    tags: ['bet'],
    request: {
        params: zod_openapi_1.z.object({
            amount: zod_openapi_1.z
                .string()
                .optional()
                .openapi({
                param: {
                    name: 'amount',
                    in: 'path',
                    required: true,
                },
                type: 'number',
                example: '1',
            }),
            answer: zod_openapi_1.z
                .string()
                .optional()
                .openapi({
                param: {
                    name: 'answer',
                    in: 'path',
                    required: true,
                },
                type: 'string',
                example: 'dog',
            }),
            imgId: zod_openapi_1.z
                .string()
                .optional()
                .openapi({
                param: {
                    name: 'imgId',
                    in: 'path',
                    required: true,
                },
                type: 'number',
                example: '1',
            }),
        }),
        body: openapi_1.actionSpecOpenApiPostRequestBody,
    },
    responses: openapi_1.actionsSpecOpenApiPostResponse,
}), async (c) => {
    var _a, _b;
    let amount = (_a = c.req.param('amount')) !== null && _a !== void 0 ? _a : DEFAULT_DONATION_AMOUNT_SOL.toString();
    const betText = (_b = c.req.param('answer')) !== null && _b !== void 0 ? _b : "dog";
    let imgId = c.req.param('imgId');
    const match = imgId.match(/\d+/);
    let id;
    if (match) {
        const number = parseInt(match[0], 10);
        id = number;
    }
    else {
        id = 1;
    }
    const { account } = (await c.req.json());
    let parsedAmount = parseFloat(amount);
    if (parsedAmount > 1) {
        parsedAmount = 1;
    }
    else if (parsedAmount < 0.05) {
        parsedAmount = 0.05;
    }
    const transaction = await prepareBetTransaction(new web3_js_1.PublicKey(account), new web3_js_1.PublicKey(WALLET), parsedAmount * web3_js_1.LAMPORTS_PER_SOL, betText, id);
    try {
        const answerList = await (0, utils_1.getAnswer)(id);
        const isCorrect = (0, utils_1.isElementInArray)(betText, answerList);
        const tx = await (0, actions_1.createPostResponse)({
            fields: {
                transaction,
            },
        });
        return c.json({
            transaction: tx.transaction,
            message: isCorrect ? "Congratulations! Please claim your rewards in the blink below: https://dial.to/?action=solana-action:http://blinks.infinityg.ai/api/claim" : "Wrong answer, please try again",
        });
    }
    catch (error) {
        console.error(`Failed to send tx`, error);
        return c.json({
            message: `Failed to prepare transaction`,
        }, {
            status: 500,
        });
    }
});
async function getInfo() {
    const data = await (0, utils_1.getImage)();
    const icon = data.imgUrl;
    const imgId = data.imgId;
    const title = 'Beat AI: Draw & Guess';
    const description = 'Play Draw & Guess with AI Agents, come to guess and get rewards! Powered by Infinity Ground!';
    return { icon, title, description, imgId };
}
async function prepareBetTransaction(sender, recipient, lamports, betText, imgId) {
    const betTx = new web3_js_1.Transaction();
    const payer = new web3_js_1.PublicKey(sender);
    const text = JSON.stringify({ "answer": betText, "bet": lamports / web3_js_1.LAMPORTS_PER_SOL, "imgId": imgId });
    betTx
        .add((0, spl_memo_1.createMemoInstruction)(text, [payer]))
        .add(web3_js_1.SystemProgram.transfer({
        fromPubkey: payer,
        toPubkey: new web3_js_1.PublicKey(recipient),
        lamports: lamports,
    }));
    const blockhash = await connection_1.connection.getLatestBlockhash();
    betTx.feePayer = sender;
    betTx.recentBlockhash = blockhash.blockhash;
    betTx.lastValidBlockHeight = blockhash.lastValidBlockHeight;
    return betTx;
}
exports.default = app;
//# sourceMappingURL=route.js.map
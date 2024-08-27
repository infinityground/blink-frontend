"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_openapi_1 = require("@hono/zod-openapi");
const openapi_1 = require("../openapi");
const utils_1 = require("../shared/utils");
const app = new zod_openapi_1.OpenAPIHono();
app.openapi((0, zod_openapi_1.createRoute)({
    method: 'get',
    path: '/',
    tags: ['claim'],
    responses: openapi_1.actionsSpecOpenApiGetResponse,
}), async (c) => {
    const { icon, title, description } = await getInfo();
    const response = {
        icon,
        label: "Claim your reward!",
        title,
        description,
        links: {
            actions: [
                {
                    href: `/api/claim`,
                    label: 'Claim your reward!',
                },
            ],
        },
    };
    return c.json(response, 200);
});
app.openapi((0, zod_openapi_1.createRoute)({
    method: 'post',
    path: '/',
    tags: ['claim'],
    responses: openapi_1.actionsSpecOpenApiGetResponse,
}), async (c) => {
    const { account } = (await c.req.json());
    const claimCheck = await (0, utils_1.isClaimed)(account);
    if (claimCheck.code == "90000" && claimCheck.data.claimed) {
        return c.json({ message: `Sorry, seems you have claimed the reward, please check your wallet`, }, { status: 422 });
    }
    else if (claimCheck.code == "90000" && !claimCheck.data.canClaim) {
        return c.json({ message: `Sorry, seems your answer is wrong or unavaliable`, }, { status: 422 });
    }
    const res = await (0, utils_1.claim)(account);
    if (res.code == '90000') {
        return c.json({ message: `Claim successfully, please your wallet`, }, { status: 200 });
    }
    else {
        return c.json({ message: `Ops, something goes wrong`, }, { status: 422 });
    }
});
async function getInfo() {
    const data = await (0, utils_1.getImage)();
    const icon = data.imgUrl;
    const title = 'Beat AI: Draw & Guess';
    const description = 'Play Draw & Guess with AI Agents, come to guess and get rewards! Powered by Infinity Ground!';
    return { icon, title, description };
}
exports.default = app;
//# sourceMappingURL=route.js.map
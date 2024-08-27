"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionsSpecOpenApiPostResponse = exports.actionSpecOpenApiPostRequestBody = exports.actionsSpecOpenApiGetResponse = void 0;
const zod_openapi_1 = require("@hono/zod-openapi");
exports.actionsSpecOpenApiGetResponse = {
    '200': {
        description: 'Action GET 200 Response',
        content: {
            'application/json': {
                schema: zod_openapi_1.z.object({
                    icon: zod_openapi_1.z.string(),
                    label: zod_openapi_1.z.string(),
                    title: zod_openapi_1.z.string(),
                    description: zod_openapi_1.z.string(),
                    disabled: zod_openapi_1.z.boolean().optional(),
                    links: zod_openapi_1.z.object({
                        // linked actions inspired by HAL https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-11
                        actions: zod_openapi_1.z
                            .array(zod_openapi_1.z.object({
                            href: zod_openapi_1.z.string(),
                            label: zod_openapi_1.z.string(),
                            // optional parameters for the action, e.g. input fields, inspired by OpenAPI
                            // enforcing single parameter for now for simplicity and determenistic client UIs
                            // can be extended to multiple inputs w/o breaking change by switching to Parameter[]
                            // note: there are no use-cases for multiple parameters atm, e.g. farcaster frames also have just single input
                            parameters: zod_openapi_1.z.array(zod_openapi_1.z.object({
                                name: zod_openapi_1.z.string(),
                                label: zod_openapi_1.z.string().optional(), // input placeholder
                            })),
                        }))
                            .optional(),
                    }),
                    // optional error indication for non-fatal errors, if present client should display it to the user
                    // doesn't prevent client from interpreting the action or displaying it to the user
                    // e.g. can be used together with 'disabled' to display the reason e.g. business constraint failure
                    error: zod_openapi_1.z.object({
                        message: zod_openapi_1.z.string(),
                    }),
                }),
            },
        },
    },
};
exports.actionSpecOpenApiPostRequestBody = {
    content: {
        'application/json': {
            schema: zod_openapi_1.z.object({
                account: zod_openapi_1.z.string(),
            }),
        },
    },
};
exports.actionsSpecOpenApiPostResponse = {
    '200': {
        description: 'Action POST 200 Response',
        content: {
            'application/json': {
                schema: zod_openapi_1.z.object({
                    transaction: zod_openapi_1.z.string(),
                    message: zod_openapi_1.z.string().optional(),
                    redirect: zod_openapi_1.z.string().optional(), // redirect URL after the transaction is successful
                }),
            },
        },
    },
};
//# sourceMappingURL=openapi.js.map
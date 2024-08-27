import { ResponseConfig } from '@asteasolutions/zod-to-openapi/dist/openapi-registry';
import { z } from '@hono/zod-openapi';
export declare const actionsSpecOpenApiGetResponse: Record<string, ResponseConfig>;
export declare const actionSpecOpenApiPostRequestBody: {
    content: {
        'application/json': {
            schema: z.ZodObject<{
                account: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                account: string;
            }, {
                account: string;
            }>;
        };
    };
};
export declare const actionsSpecOpenApiPostResponse: Record<string, ResponseConfig>;

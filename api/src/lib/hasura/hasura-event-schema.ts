import * as v from "valibot";


export const hasuraEventSchema = v.object({
    created_at: v.string(),
    delivery_info: v.object({
        current_retry: v.number(),
        max_retries: v.number(),
    }),
    event: v.object({
        data: v.object({
            new: v.any(), // accepts any structure, including null
            old: v.any(), // accepts any structure, including null
        }),
        op: v.string(),
        session_variables: v.record(v.string(), v.string()),
        trace_context: v.object({
            sampling_state: v.string(),
            span_id: v.string(),
            trace_id: v.string(),
        }),
    }),
    id: v.string(),
    table: v.object({
        name: v.string(),
        schema: v.string(),
    }),
    trigger: v.object({
        name: v.string(),
    }),
});

export type HasuraEvent = v.InferOutput<typeof hasuraEventSchema>;
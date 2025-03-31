import assert from "assert";

export const defangApiSecret = process.env.DEFANG_API_SECRET;

assert(defangApiSecret, "DEFANG_API_SECRET is required");
import { Analytics } from '@segment/analytics-node'
import assert from "assert"

assert(process.env.SEGMENT_WRITE_KEY, "Missing SEGMENT_WRITE_KEY")

export const analytics = new Analytics({
    writeKey: process.env.SEGMENT_WRITE_KEY,
})
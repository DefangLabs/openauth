import { AnalyticsBrowser } from "@segment/analytics-next";

const writeKey = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY;

export const analytics = AnalyticsBrowser.load(
  {
    writeKey: writeKey ?? "",
  },
  {
    // TODO: I can trigger the false branch by removing
    // NEXT_PUBLIC_SEGMENT_WRITE_KEY from .env, but it should be easier than
    // that.
    disable: writeKey ? false : true,
  },
);

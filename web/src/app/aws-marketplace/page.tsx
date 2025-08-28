export default function AwsMarketplacePage() {
  // Only allow access in development or when feature flag is enabled
  if (
    process.env.NODE_ENV === "production" &&
    !process.env.ENABLE_AWS_MARKETPLACE_TESTING
  ) {
    return (
      <div style={{ padding: "20px" }}>
        <h1>Page Not Found</h1>
        <p>This page is not available.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>AWS Marketplace Subscription (Testing)</h1>
      <div
        style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "4px",
        }}
      >
        ⚠️ <strong>Testing Only:</strong> This page is for development and
        testing purposes only.
      </div>
      <form
        action="/aws-marketplace/subscribe"
        method="POST"
        encType="application/x-www-form-urlencoded"
      >
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="x-amzn-marketplace-token">
            AWS Marketplace Token:
          </label>
          <br />
          <input
            defaultValue={"asdf1234"}
            type="text"
            id="x-amzn-marketplace-token"
            name="x-amzn-marketplace-token"
            required
            style={{ width: "300px", padding: "5px" }}
          />
        </div>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

import { createMockClient, getMockScenario } from "./mock-client";
import { GetServicesResponse } from "../../generated/fabric_pb";

describe("createMockClient", () => {
  it("should return a service in default scenario", (done) => {
    const client = createMockClient("default");
    client.getServices?.({}, (err, res: GetServicesResponse) => {
      expect(err).toBeUndefined();
      expect(res.services.length).toBeGreaterThan(0);
      done();
    });
  });

  it("should return no services in empty scenario", (done) => {
    const client = createMockClient("empty");
    client.getServices?.({}, (err, res: GetServicesResponse) => {
      expect(res.services.length).toBe(0);
      done();
    });
  });
});

describe("getMockScenario", () => {
  it("should read scenario from env var", () => {
    process.env.NEXT_PUBLIC_DEFANG_MOCK_SCENARIO = "empty";
    expect(getMockScenario()).toBe("empty");
    delete process.env.NEXT_PUBLIC_DEFANG_MOCK_SCENARIO;
  });
});

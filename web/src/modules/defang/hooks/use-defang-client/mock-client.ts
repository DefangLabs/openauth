/*
 * ---------------------------------------------------------------------------
 * Mock gRPC client for Fabric
 * ---------------------------------------------------------------------------
 *
 * This file defines a lightweight, in-memory implementation of the Fabric
 * client. The real client is generated from the protobuf definitions found in
 * the `generated` folder. When the application is started without a backend
 * service running, this mock allows developers to continue working on the UI
 * without connection errors.
 *
 * The mock supports multiple "scenarios". A scenario represents a set of
 * predictable responses the API might return. This is extremely useful for
 * testing UI flows such as an empty dashboard or an error state. Scenarios can
 * be selected via the `mockScenario` query parameter or the
 * `NEXT_PUBLIC_DEFANG_MOCK_SCENARIO` environment variable. The last selected
 * scenario is stored in `localStorage` so that page refreshes preserve the
 * choice.
 */

import { createCallbackClient } from "@bufbuild/connect";
import { Empty, Timestamp } from "@bufbuild/protobuf";
import { FabricController } from "../../generated/fabric_connect";
import {
  CanIUseResponse,
  DebugResponse,
  DelegateSubdomainZoneResponse,
  DeleteResponse,
  DeployResponse,
  DestroyResponse,
  EstimateResponse,
  GenerateFilesResponse,
  GetConfigsResponse,
  GetSelectedProviderResponse,
  GetServicesResponse,
  ListConfigsResponse,
  ListDeploymentsResponse,
  LogEntry,
  Mode,
  Port,
  PreviewResponse,
  Protocol,
  Provider,
  Secrets,
  Service,
  ServiceInfo,
  ServiceState,
  StartGenerateResponse,
  Status,
  SubscriptionTier,
  TailResponse,
  TokenResponse,
  UploadURLResponse,
  Version,
  WhoAmIResponse,
} from "../../generated/fabric_pb";

/** Type alias for the generated client type */
type Client = ReturnType<typeof createCallbackClient<typeof FabricController>>;

/** All available mock scenarios */
export type MockScenario = "default" | "empty" | "paid";

/** Obtain the active scenario from URL, localStorage or env vars */
export function getMockScenario(): MockScenario {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const qp = params.get("mockScenario");
    if (qp) {
      window.localStorage.setItem("defangMockScenario", qp);
      return qp as MockScenario;
    }
    const stored = window.localStorage.getItem("defangMockScenario");
    if (stored) return stored as MockScenario;
  }
  return (
    (process.env.NEXT_PUBLIC_DEFANG_MOCK_SCENARIO as MockScenario) || "default"
  );
}

/**
 * Create a mock client implementation for a given scenario.  Most methods just
 * return empty messages. A couple return data so the UI has something to render.
 */
export function createMockClient(
  scenario: MockScenario = getMockScenario(),
): Partial<Client> {
  const base: Partial<Client> = {
    getStatus(_, cb) {
      cb(undefined, new Status({ version: "mock" }));
      return () => {};
    },
    getVersion(_, cb) {
      cb(
        undefined,
        new Version({ fabric: "mock", cliMin: "mock", pulumiMin: "mock" }),
      );
      return () => {};
    },
    token(_, cb) {
      cb(
        undefined,
        new TokenResponse({ accessToken: "mock", refreshToken: "mock" }),
      );
      return () => {};
    },
    revokeToken(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    tail(_, cb) {
      const resp = new TailResponse();
      for (let i = 0; i < 10; i++) {
        const logEntry = new LogEntry();
        logEntry.message = `Log entry ${i}`;
        logEntry.service = "mock-service";
        resp.entries.push(logEntry);
      }
      cb(resp);
      return () => {};
    },
    update(_, cb) {
      cb(undefined, new ServiceInfo());
      return () => {};
    },
    deploy(_, cb) {
      cb(undefined, new DeployResponse());
      return () => {};
    },
    get(_, cb) {
      cb(undefined, new ServiceInfo());
      return () => {};
    },
    delete(_, cb) {
      cb(undefined, new DeleteResponse());
      return () => {};
    },
    destroy(_, cb) {
      cb(undefined, new DestroyResponse());
      return () => {};
    },
    publish(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    subscribe() {
      return () => {};
    },
    getServices(_, cb) {
      const resp = new GetServicesResponse({ project: "mock" });
      if (scenario !== "empty") {
        resp.services = [createMockService()];
      }
      resp.expiresAt = Timestamp.now();
      cb(undefined, resp);
      return () => {};
    },
    generateFiles(_, cb) {
      cb(undefined, new GenerateFilesResponse());
      return () => {};
    },
    startGenerate(_, cb) {
      cb(undefined, new StartGenerateResponse({ uuid: "mock" }));
      return () => {};
    },
    generateStatus(_, cb) {
      cb(undefined, new GenerateFilesResponse());
      return () => {};
    },
    debug(_, cb) {
      cb(undefined, new DebugResponse());
      return () => {};
    },
    signEULA(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    checkToS(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    putSecret(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    deleteSecrets(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    listSecrets(_, cb) {
      cb(undefined, new Secrets());
      return () => {};
    },
    getConfigs(_, cb) {
      cb(undefined, new GetConfigsResponse());
      return () => {};
    },
    putConfig(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    deleteConfigs(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    listConfigs(_, cb) {
      cb(undefined, new ListConfigsResponse());
      return () => {};
    },
    putDeployment(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    listDeployments(_, cb) {
      const response = new ListDeploymentsResponse({
        deployments: scenario === "empty" ? [] : createMockDeployments(10),
      });
      cb(undefined, response);
      return () => {};
    },
    createUploadURL(_, cb) {
      cb(undefined, new UploadURLResponse({ url: "https://example.com" }));
      return () => {};
    },
    delegateSubdomainZone(_, cb) {
      cb(undefined, new DelegateSubdomainZoneResponse({ zone: "mock-zone" }));
      return () => {};
    },
    deleteSubdomainZone(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    getDelegateSubdomainZone(_, cb) {
      cb(undefined, new DelegateSubdomainZoneResponse({ zone: "mock-zone" }));
      return () => {};
    },
    setOptions(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    whoAmI(_, cb) {
      const resp = new WhoAmIResponse({
        providerAccountId: "mock-account",
        userId: "mock-user-id",
        region: "mock-region",
        tenant: "mock-tenant",
        tier: scenario === "paid" ? SubscriptionTier.PRO : SubscriptionTier.HOBBY,
      });
      cb(undefined, resp);
      return () => {};
    },
    track(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    deleteMe(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    verifyDNSSetup(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    getSelectedProvider(_, cb) {
      cb(
        undefined,
        new GetSelectedProviderResponse({ provider: Provider.DEFANG }),
      );
      return () => {};
    },
    setSelectedProvider(_, cb) {
      cb(undefined, new Empty());
      return () => {};
    },
    canIUse(_, cb) {
      cb(
        undefined,
        new CanIUseResponse({
          cdImage: "mock",
          gpu: false,
          allowScaling: true,
          pulumiVersion: "mock",
        }),
      );
      return () => {};
    },
    estimate(_, cb) {
      cb(undefined, new EstimateResponse());
      return () => {};
    },
    preview(_, cb) {
      cb(undefined, new PreviewResponse());
      return () => {};
    },
  };

  return base;
}

/** Convenience instance used by the hooks */
export const mockClient = createMockClient();

function createMockService(): ServiceInfo {
  return new ServiceInfo({
    project: "mock-project",
    state: ServiceState.BUILD_RUNNING,
    domainname: "mock-domainname",
    endpoints: ["mock-endpoint"],
    publicFqdn: "mock-public-fqdn",
    service: new Service({
      name: "mock-service",
      image: "mock-image",
      domainname: "mock-domain",
      ports: [
        new Port({ protocol: Protocol.HTTP, mode: Mode.INGRESS, target: 8080 }),
      ],
    }),
  });
}

function getRandomProvider(): Provider {
  const providers = [
    Provider.DEFANG,
    Provider.AWS,
    Provider.DIGITALOCEAN,
    Provider.GCP,
  ];
  const index = Math.floor(Math.random() * providers.length);
  return providers[index];
}

function createMockDeployments(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: `mock-deployment-id${i + 1}`,
    project: `mock-project${i + 1}`,
    provider: getRandomProvider(),
    providerString: `mock-provider-str${i + 1}`,
    providerAccountId: `mock-account-id${i + 1}`,
    timestamp: Timestamp.now(),
    region: "mock-region",
  }));
}

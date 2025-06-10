import { createCallbackClient } from "@bufbuild/connect";
import { Empty, Timestamp } from "@bufbuild/protobuf";
import { FabricController } from "../../generated/fabric_connect";
import {
  GetServicesResponse,
  ListDeploymentsResponse,
  LogEntry,
  Provider,
  Service,
  ServiceInfo,
  ServiceState,
  SubscriptionTier,
  TailResponse,
  WhoAmIResponse,
  Protocol,
  Mode,
  Port,
  Build,
} from "../../generated/fabric_pb";

type Client = ReturnType<typeof createCallbackClient<typeof FabricController>>;

export const mockClient: Partial<Client> = {
  whoAmI(request, callback, options) {
    const whoamiResponse = new WhoAmIResponse();
    whoamiResponse.providerAccountId = "mock-account";
    whoamiResponse.userId = "mock-user-id";
    whoamiResponse.region = "mock-region";
    whoamiResponse.tenant = "mock-tenant";
    whoamiResponse.tier = SubscriptionTier.HOBBY;
    callback(undefined, whoamiResponse);

    return () => {};
  },
  tail(request, callback, options) {
    const tailResponse = new TailResponse();
    tailResponse.entries = [];
    for (let i = 0; i < 10; i++) {
      const logEntry = new LogEntry();
      logEntry.message = `Log entry ${i}`;
      tailResponse.entries.push(logEntry);
    }
    callback(tailResponse);
    return () => {};
  },
  getServices(request, callback, options) {
    const getServicesResponse = new GetServicesResponse();
    getServicesResponse.project = "mock-project";
    const expiresAt = new Timestamp();
    getServicesResponse.expiresAt = expiresAt;

    const service1 = new ServiceInfo({
      project: "mock-project",
      state: ServiceState.BUILD_RUNNING,
      domainname: "mock-domainname",
      endpoints: ["mock-endpoint1"],
      publicFqdn: "mock-public-fqdn1",
      service: new Service({
        name: "mock-service1",
        image: "mock-image1",
        domainname: "mock-domainname1",
        ports: [
          new Port({
            protocol: Protocol.HTTP,
            mode: Mode.INGRESS,
            target: 8080,
          }),
        ],
      }),
    });

    getServicesResponse.services = [service1];
    callback(undefined, getServicesResponse);
    return () => {};
  },

  signEULA(request, callback, options) {
    callback(undefined, new Empty());
    return () => {};
  },

  listDeployments(request, callback, options) {
    const response = new ListDeploymentsResponse({
      deployments: createMockDeployments(10),
    });

    callback(undefined, response);
    return () => {};
  },
};

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
  return Array.from({ length: count }, (_, i) => {
    const provider = getRandomProvider();
    return {
      id: `mock-deployment-id${i + 1}`,
      project: `mock-project${i + 1}`,
      provider,
      providerString: `mock-provider-str${i + 1}-${provider}`,
      providerAccountId: `mock-account-id${i + 1}`,
      timestamp: Timestamp.now(),
      region: "mock-region",
    };
  });
}

import { useServicesRequest } from "../use-services-request/use-services-request";

export function useServices() {
  return useServicesRequest().data?.servicesList;
}

/**
 * return [
    {
      id: "a2f10232-42dd-4f8a-8e5b-92d0c5b87276",
      name: "Service 1",
      fqdn: "service1.example.com",
      dockerImage: "service1:latest",
      port: 8080,
      vcpus: 2,
      memory: 2048,
      env: {
        ENV_VAR_1: "value1",
        ENV_VAR_2: "value2",
      },
      privateDomain: "service1.internal",
      latencyMs: 50,
      kvConnectionUrl: "nats://username1:password1@host1:4222",
      prometheusUrl: "http://fake-prometheus-endpoint/service1",
      tpu: 1,
      hourlyUsageCents: 150,
      monthlyUsage: {
        vcpuHours: 100,
        tpuHours: 10,
        gbHours: 500,
        avgLatency: 45,
        usageMTD: 2500,
      },
    },
    {
      id: "db1b1002-3ae2-49fd-9e64-39b972fbddc2",
      name: "Service 2",
      fqdn: "service2.example.com",
      dockerImage: "service2:latest",
      port: 3000,
      vcpus: 1,
      memory: 1024,
      env: {
        ENV_VAR_3: "value3",
      },
      privateDomain: "service2.internal",
      latencyMs: 30,
      kvConnectionUrl: "nats://username2:password2@host2:4222",
      prometheusUrl: "http://fake-prometheus-endpoint/service2",
      tpu: 0,
      hourlyUsageCents: 75,
      monthlyUsage: {
        vcpuHours: 50,
        tpuHours: 0,
        gbHours: 250,
        avgLatency: 35,
        usageMTD: 1000,
      },
    },
    {
      id: "d48d34c7-c302-4f4f-b3c0-1703e10ab285",
      name: "Service 3",
      fqdn: "service3.example.com",
      dockerImage: "service3:latest",
      port: 80,
      vcpus: 4,
      memory: 4096,
      env: {},
      privateDomain: "service3.internal",
      latencyMs: 70,
      kvConnectionUrl: "nats://username3:password3@host3:4222",
      prometheusUrl: "http://fake-prometheus-endpoint/service3",
      tpu: 2,
      hourlyUsageCents: 300,
      monthlyUsage: {
        vcpuHours: 200,
        tpuHours: 20,
        gbHours: 1000,
        avgLatency: 60,
        usageMTD: 5000,
      },
    },
  ];
 */

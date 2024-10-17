export declare const getClient: (token?: string) => import("@connectrpc/connect").Client<import("@bufbuild/protobuf/codegenv1").GenService<{
    getStatus: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").Status, import("@bufbuild/protobuf").JsonValue>;
    };
    getVersion: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").Version, import("@bufbuild/protobuf").JsonValue>;
    };
    token: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").TokenRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").TokenResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    revokeToken: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    tail: {
        methodKind: "server_streaming";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").TailRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").TailResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    update: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").Service, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").ServiceInfo, import("@bufbuild/protobuf").JsonValue>;
    };
    deploy: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DeployRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DeployResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    get: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").ServiceID, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").ServiceInfo, import("@bufbuild/protobuf").JsonValue>;
    };
    delete: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DeleteRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DeleteResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    publish: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").PublishRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    subscribe: {
        methodKind: "server_streaming";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").SubscribeRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").SubscribeResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    getServices: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").ListServicesResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    generateFiles: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").GenerateFilesRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").GenerateFilesResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    startGenerate: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").GenerateFilesRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").StartGenerateResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    generateStatus: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").GenerateStatusRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").GenerateFilesResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    debug: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DebugRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DebugResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    signEULA: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    checkToS: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    putSecret: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").PutConfigRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    deleteSecrets: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").Secrets, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    listSecrets: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").Secrets, import("@bufbuild/protobuf").JsonValue>;
    };
    getConfigs: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").GetConfigsRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").GetConfigsResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    putConfig: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").PutConfigRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    deleteConfigs: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DeleteConfigsRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    listConfigs: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").ListConfigsRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").ListConfigsResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    createUploadURL: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").UploadURLRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").UploadURLResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    delegateSubdomainZone: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DelegateSubdomainZoneRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DelegateSubdomainZoneResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    deleteSubdomainZone: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    getDelegateSubdomainZone: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").DelegateSubdomainZoneResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    whoAmI: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").WhoAmIResponse, import("@bufbuild/protobuf").JsonValue>;
    };
    track: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("./generated/fabric_pb").TrackRequest, import("@bufbuild/protobuf").JsonValue>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
    deleteMe: {
        methodKind: "unary";
        input: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
        output: import("@bufbuild/protobuf/codegenv1").GenMessage<import("@bufbuild/protobuf").Message<"google.protobuf.Empty">, import("@bufbuild/protobuf/wkt").EmptyJson>;
    };
}>>;
//# sourceMappingURL=get-client.d.ts.map
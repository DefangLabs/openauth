import type { GenEnum, GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import type { EmptySchema, Timestamp } from "@bufbuild/protobuf/wkt";
import type { JsonObject, Message } from "@bufbuild/protobuf";
/**
 * Describes the file fabric.proto.
 */
export declare const file_fabric: GenFile;
/**
 * @generated from message io.defang.v1.DebugRequest
 */
export type DebugRequest = Message<"io.defang.v1.DebugRequest"> & {
    /**
     * @generated from field: repeated io.defang.v1.File files = 1;
     */
    files: File[];
    /**
     * @generated from field: string etag = 2;
     */
    etag: string;
    /**
     * @generated from field: string project = 3;
     */
    project: string;
    /**
     * @generated from field: string logs = 4;
     */
    logs: string;
    /**
     * @generated from field: repeated string services = 5;
     */
    services: string[];
};
/**
 * Describes the message io.defang.v1.DebugRequest.
 * Use `create(DebugRequestSchema)` to create a new message.
 */
export declare const DebugRequestSchema: GenMessage<DebugRequest>;
/**
 * @generated from message io.defang.v1.DebugResponse
 */
export type DebugResponse = Message<"io.defang.v1.DebugResponse"> & {
    /**
     * @generated from field: string general = 1;
     */
    general: string;
    /**
     * @generated from field: repeated io.defang.v1.Issue issues = 2;
     */
    issues: Issue[];
    /**
     * @generated from field: repeated string requests = 3;
     */
    requests: string[];
};
/**
 * Describes the message io.defang.v1.DebugResponse.
 * Use `create(DebugResponseSchema)` to create a new message.
 */
export declare const DebugResponseSchema: GenMessage<DebugResponse>;
/**
 * @generated from message io.defang.v1.Issue
 */
export type Issue = Message<"io.defang.v1.Issue"> & {
    /**
     * @generated from field: string type = 1;
     */
    type: string;
    /**
     * @generated from field: string severity = 2;
     */
    severity: string;
    /**
     * @generated from field: string details = 3;
     */
    details: string;
    /**
     * @generated from field: repeated io.defang.v1.CodeChange code_changes = 4;
     */
    codeChanges: CodeChange[];
};
/**
 * Describes the message io.defang.v1.Issue.
 * Use `create(IssueSchema)` to create a new message.
 */
export declare const IssueSchema: GenMessage<Issue>;
/**
 * @generated from message io.defang.v1.CodeChange
 */
export type CodeChange = Message<"io.defang.v1.CodeChange"> & {
    /**
     * @generated from field: string file = 1;
     */
    file: string;
    /**
     * @generated from field: string change = 2;
     */
    change: string;
};
/**
 * Describes the message io.defang.v1.CodeChange.
 * Use `create(CodeChangeSchema)` to create a new message.
 */
export declare const CodeChangeSchema: GenMessage<CodeChange>;
/**
 * @generated from message io.defang.v1.TrackRequest
 */
export type TrackRequest = Message<"io.defang.v1.TrackRequest"> & {
    /**
     * @generated from field: string anon_id = 1;
     */
    anonId: string;
    /**
     * @generated from field: string event = 2;
     */
    event: string;
    /**
     * @generated from field: map<string, string> properties = 3;
     */
    properties: {
        [key: string]: string;
    };
    /**
     * @generated from field: string os = 4;
     */
    os: string;
    /**
     * @generated from field: string arch = 5;
     */
    arch: string;
};
/**
 * Describes the message io.defang.v1.TrackRequest.
 * Use `create(TrackRequestSchema)` to create a new message.
 */
export declare const TrackRequestSchema: GenMessage<TrackRequest>;
/**
 * @generated from message io.defang.v1.DeployRequest
 */
export type DeployRequest = Message<"io.defang.v1.DeployRequest"> & {
    /**
     * deprecated; use compose
     *
     * @generated from field: repeated io.defang.v1.Service services = 1 [deprecated = true];
     * @deprecated
     */
    services: Service[];
    /**
     * deprecated; use compose.name
     *
     * @generated from field: string project = 2 [deprecated = true];
     * @deprecated
     */
    project: string;
    /**
     * @generated from field: io.defang.v1.DeploymentMode mode = 3;
     */
    mode: DeploymentMode;
    /**
     * @generated from field: google.protobuf.Struct compose = 4;
     */
    compose?: JsonObject;
};
/**
 * Describes the message io.defang.v1.DeployRequest.
 * Use `create(DeployRequestSchema)` to create a new message.
 */
export declare const DeployRequestSchema: GenMessage<DeployRequest>;
/**
 * @generated from message io.defang.v1.DeployResponse
 */
export type DeployResponse = Message<"io.defang.v1.DeployResponse"> & {
    /**
     * @generated from field: repeated io.defang.v1.ServiceInfo services = 1;
     */
    services: ServiceInfo[];
    /**
     * @generated from field: string etag = 2;
     */
    etag: string;
};
/**
 * Describes the message io.defang.v1.DeployResponse.
 * Use `create(DeployResponseSchema)` to create a new message.
 */
export declare const DeployResponseSchema: GenMessage<DeployResponse>;
/**
 * @generated from message io.defang.v1.DeleteRequest
 */
export type DeleteRequest = Message<"io.defang.v1.DeleteRequest"> & {
    /**
     * @generated from field: repeated string names = 1;
     */
    names: string[];
    /**
     * defaults to tenant ID
     *
     * @generated from field: string project = 2;
     */
    project: string;
};
/**
 * Describes the message io.defang.v1.DeleteRequest.
 * Use `create(DeleteRequestSchema)` to create a new message.
 */
export declare const DeleteRequestSchema: GenMessage<DeleteRequest>;
/**
 * @generated from message io.defang.v1.DeleteResponse
 */
export type DeleteResponse = Message<"io.defang.v1.DeleteResponse"> & {
    /**
     * @generated from field: string etag = 1;
     */
    etag: string;
};
/**
 * Describes the message io.defang.v1.DeleteResponse.
 * Use `create(DeleteResponseSchema)` to create a new message.
 */
export declare const DeleteResponseSchema: GenMessage<DeleteResponse>;
/**
 * @generated from message io.defang.v1.GenerateFilesRequest
 */
export type GenerateFilesRequest = Message<"io.defang.v1.GenerateFilesRequest"> & {
    /**
     * @generated from field: string prompt = 1;
     */
    prompt: string;
    /**
     * @generated from field: string language = 2;
     */
    language: string;
    /**
     * @generated from field: bool agree_tos = 3;
     */
    agreeTos: boolean;
};
/**
 * Describes the message io.defang.v1.GenerateFilesRequest.
 * Use `create(GenerateFilesRequestSchema)` to create a new message.
 */
export declare const GenerateFilesRequestSchema: GenMessage<GenerateFilesRequest>;
/**
 * @generated from message io.defang.v1.File
 */
export type File = Message<"io.defang.v1.File"> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * @generated from field: string content = 2;
     */
    content: string;
};
/**
 * Describes the message io.defang.v1.File.
 * Use `create(FileSchema)` to create a new message.
 */
export declare const FileSchema: GenMessage<File>;
/**
 * @generated from message io.defang.v1.GenerateFilesResponse
 */
export type GenerateFilesResponse = Message<"io.defang.v1.GenerateFilesResponse"> & {
    /**
     * @generated from field: repeated io.defang.v1.File files = 1;
     */
    files: File[];
};
/**
 * Describes the message io.defang.v1.GenerateFilesResponse.
 * Use `create(GenerateFilesResponseSchema)` to create a new message.
 */
export declare const GenerateFilesResponseSchema: GenMessage<GenerateFilesResponse>;
/**
 * @generated from message io.defang.v1.StartGenerateResponse
 */
export type StartGenerateResponse = Message<"io.defang.v1.StartGenerateResponse"> & {
    /**
     * @generated from field: string uuid = 1;
     */
    uuid: string;
};
/**
 * Describes the message io.defang.v1.StartGenerateResponse.
 * Use `create(StartGenerateResponseSchema)` to create a new message.
 */
export declare const StartGenerateResponseSchema: GenMessage<StartGenerateResponse>;
/**
 * @generated from message io.defang.v1.GenerateStatusRequest
 */
export type GenerateStatusRequest = Message<"io.defang.v1.GenerateStatusRequest"> & {
    /**
     * @generated from field: string uuid = 1;
     */
    uuid: string;
};
/**
 * Describes the message io.defang.v1.GenerateStatusRequest.
 * Use `create(GenerateStatusRequestSchema)` to create a new message.
 */
export declare const GenerateStatusRequestSchema: GenMessage<GenerateStatusRequest>;
/**
 * @generated from message io.defang.v1.UploadURLRequest
 */
export type UploadURLRequest = Message<"io.defang.v1.UploadURLRequest"> & {
    /**
     * @generated from field: string digest = 1;
     */
    digest: string;
};
/**
 * Describes the message io.defang.v1.UploadURLRequest.
 * Use `create(UploadURLRequestSchema)` to create a new message.
 */
export declare const UploadURLRequestSchema: GenMessage<UploadURLRequest>;
/**
 * @generated from message io.defang.v1.UploadURLResponse
 */
export type UploadURLResponse = Message<"io.defang.v1.UploadURLResponse"> & {
    /**
     * @generated from field: string url = 1;
     */
    url: string;
};
/**
 * Describes the message io.defang.v1.UploadURLResponse.
 * Use `create(UploadURLResponseSchema)` to create a new message.
 */
export declare const UploadURLResponseSchema: GenMessage<UploadURLResponse>;
/**
 * @generated from message io.defang.v1.ServiceInfo
 */
export type ServiceInfo = Message<"io.defang.v1.ServiceInfo"> & {
    /**
     * @generated from field: io.defang.v1.Service service = 1;
     */
    service?: Service;
    /**
     * list of endpoints, one for each port
     *
     * @generated from field: repeated string endpoints = 2;
     */
    endpoints: string[];
    /**
     * was: tenant; defaults to tenant ID
     *
     * @generated from field: string project = 3;
     */
    project: string;
    /**
     * @generated from field: string etag = 4;
     */
    etag: string;
    /**
     * @generated from field: string status = 5;
     */
    status: string;
    /**
     * comma-separated list of NAT IPs
     *
     * @generated from field: repeated string nat_ips = 6;
     */
    natIps: string[];
    /**
     * comma-separated list of internal CIDRs for the load-balancer
     *
     * @generated from field: repeated string lb_ips = 7;
     */
    lbIps: string[];
    /**
     * fully qualified domain name (host)
     *
     * @generated from field: string private_fqdn = 8;
     */
    privateFqdn: string;
    /**
     * fully qualified domain name (ingress)
     *
     * @generated from field: string public_fqdn = 9;
     */
    publicFqdn: string;
    /**
     * @generated from field: google.protobuf.Timestamp created_at = 10;
     */
    createdAt?: Timestamp;
    /**
     * @generated from field: google.protobuf.Timestamp updated_at = 11;
     */
    updatedAt?: Timestamp;
    /**
     * zone ID for byod domain
     *
     * @generated from field: string zone_id = 12;
     */
    zoneId: string;
    /**
     * If we should setup the facilities to use ACME(let's encrypt) certs
     *
     * @generated from field: bool use_acme_cert = 13;
     */
    useAcmeCert: boolean;
    /**
     * enumerated status of the service
     *
     * @generated from field: io.defang.v1.ServiceState state = 15;
     */
    state: ServiceState;
    /**
     * domain name for the service
     *
     * @generated from field: string domainname = 16;
     */
    domainname: string;
};
/**
 * Describes the message io.defang.v1.ServiceInfo.
 * Use `create(ServiceInfoSchema)` to create a new message.
 */
export declare const ServiceInfoSchema: GenMessage<ServiceInfo>;
/**
 * @generated from message io.defang.v1.Secrets
 * @deprecated
 */
export type Secrets = Message<"io.defang.v1.Secrets"> & {
    /**
     * @generated from field: repeated string names = 1;
     */
    names: string[];
    /**
     * defaults to tenant ID
     *
     * @generated from field: string project = 2;
     */
    project: string;
};
/**
 * Describes the message io.defang.v1.Secrets.
 * Use `create(SecretsSchema)` to create a new message.
 * @deprecated
 */
export declare const SecretsSchema: GenMessage<Secrets>;
/**
 * @generated from message io.defang.v1.SecretValue
 * @deprecated
 */
export type SecretValue = Message<"io.defang.v1.SecretValue"> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * @generated from field: string value = 2;
     */
    value: string;
    /**
     * defaults to tenant ID
     *
     * @generated from field: string project = 3;
     */
    project: string;
};
/**
 * Describes the message io.defang.v1.SecretValue.
 * Use `create(SecretValueSchema)` to create a new message.
 * @deprecated
 */
export declare const SecretValueSchema: GenMessage<SecretValue>;
/**
 * @generated from message io.defang.v1.Config
 */
export type Config = Message<"io.defang.v1.Config"> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * @generated from field: string value = 2;
     */
    value: string;
    /**
     * @generated from field: string project = 3;
     */
    project: string;
    /**
     * @generated from field: io.defang.v1.ConfigType type = 4;
     */
    type: ConfigType;
};
/**
 * Describes the message io.defang.v1.Config.
 * Use `create(ConfigSchema)` to create a new message.
 */
export declare const ConfigSchema: GenMessage<Config>;
/**
 * @generated from message io.defang.v1.ConfigKey
 */
export type ConfigKey = Message<"io.defang.v1.ConfigKey"> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * defaults to tenant ID
     *
     * @generated from field: string project = 2;
     */
    project: string;
};
/**
 * Describes the message io.defang.v1.ConfigKey.
 * Use `create(ConfigKeySchema)` to create a new message.
 */
export declare const ConfigKeySchema: GenMessage<ConfigKey>;
/**
 * @generated from message io.defang.v1.PutConfigRequest
 */
export type PutConfigRequest = Message<"io.defang.v1.PutConfigRequest"> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * @generated from field: string value = 2;
     */
    value: string;
    /**
     * @generated from field: string project = 3;
     */
    project: string;
    /**
     * @generated from field: io.defang.v1.ConfigType type = 4;
     */
    type: ConfigType;
};
/**
 * Describes the message io.defang.v1.PutConfigRequest.
 * Use `create(PutConfigRequestSchema)` to create a new message.
 */
export declare const PutConfigRequestSchema: GenMessage<PutConfigRequest>;
/**
 * @generated from message io.defang.v1.GetConfigsRequest
 */
export type GetConfigsRequest = Message<"io.defang.v1.GetConfigsRequest"> & {
    /**
     * @generated from field: repeated io.defang.v1.ConfigKey configs = 1;
     */
    configs: ConfigKey[];
};
/**
 * Describes the message io.defang.v1.GetConfigsRequest.
 * Use `create(GetConfigsRequestSchema)` to create a new message.
 */
export declare const GetConfigsRequestSchema: GenMessage<GetConfigsRequest>;
/**
 * @generated from message io.defang.v1.GetConfigsResponse
 */
export type GetConfigsResponse = Message<"io.defang.v1.GetConfigsResponse"> & {
    /**
     * @generated from field: repeated io.defang.v1.Config configs = 1;
     */
    configs: Config[];
};
/**
 * Describes the message io.defang.v1.GetConfigsResponse.
 * Use `create(GetConfigsResponseSchema)` to create a new message.
 */
export declare const GetConfigsResponseSchema: GenMessage<GetConfigsResponse>;
/**
 * @generated from message io.defang.v1.DeleteConfigsRequest
 */
export type DeleteConfigsRequest = Message<"io.defang.v1.DeleteConfigsRequest"> & {
    /**
     * @generated from field: repeated io.defang.v1.ConfigKey configs = 1;
     */
    configs: ConfigKey[];
};
/**
 * Describes the message io.defang.v1.DeleteConfigsRequest.
 * Use `create(DeleteConfigsRequestSchema)` to create a new message.
 */
export declare const DeleteConfigsRequestSchema: GenMessage<DeleteConfigsRequest>;
/**
 * @generated from message io.defang.v1.ListConfigsRequest
 */
export type ListConfigsRequest = Message<"io.defang.v1.ListConfigsRequest"> & {
    /**
     * defaults to tenant ID
     *
     * @generated from field: string project = 1;
     */
    project: string;
};
/**
 * Describes the message io.defang.v1.ListConfigsRequest.
 * Use `create(ListConfigsRequestSchema)` to create a new message.
 */
export declare const ListConfigsRequestSchema: GenMessage<ListConfigsRequest>;
/**
 * @generated from message io.defang.v1.ListConfigsResponse
 */
export type ListConfigsResponse = Message<"io.defang.v1.ListConfigsResponse"> & {
    /**
     * @generated from field: repeated io.defang.v1.ConfigKey configs = 1;
     */
    configs: ConfigKey[];
};
/**
 * Describes the message io.defang.v1.ListConfigsResponse.
 * Use `create(ListConfigsResponseSchema)` to create a new message.
 */
export declare const ListConfigsResponseSchema: GenMessage<ListConfigsResponse>;
/**
 * @generated from message io.defang.v1.TokenRequest
 */
export type TokenRequest = Message<"io.defang.v1.TokenRequest"> & {
    /**
     * @generated from field: string tenant = 1;
     */
    tenant: string;
    /**
     * from GitHub authorization code flow
     *
     * @generated from field: string auth_code = 2;
     */
    authCode: string;
    /**
     * "tail", "read", etc.
     *
     * @generated from field: repeated string scope = 3;
     */
    scope: string[];
    /**
     * jwt-bearer
     *
     * @generated from field: string assertion = 4;
     */
    assertion: string;
    /**
     * seconds
     *
     * @generated from field: uint32 expires_in = 5;
     */
    expiresIn: number;
    /**
     * @generated from field: string anon_id = 6;
     */
    anonId: string;
};
/**
 * Describes the message io.defang.v1.TokenRequest.
 * Use `create(TokenRequestSchema)` to create a new message.
 */
export declare const TokenRequestSchema: GenMessage<TokenRequest>;
/**
 * @generated from message io.defang.v1.TokenResponse
 */
export type TokenResponse = Message<"io.defang.v1.TokenResponse"> & {
    /**
     * our JWT
     *
     * @generated from field: string access_token = 1;
     */
    accessToken: string;
};
/**
 * Describes the message io.defang.v1.TokenResponse.
 * Use `create(TokenResponseSchema)` to create a new message.
 */
export declare const TokenResponseSchema: GenMessage<TokenResponse>;
/**
 * @generated from message io.defang.v1.Status
 */
export type Status = Message<"io.defang.v1.Status"> & {
    /**
     * @generated from field: string version = 1;
     */
    version: string;
};
/**
 * Describes the message io.defang.v1.Status.
 * Use `create(StatusSchema)` to create a new message.
 */
export declare const StatusSchema: GenMessage<Status>;
/**
 * @generated from message io.defang.v1.Version
 */
export type Version = Message<"io.defang.v1.Version"> & {
    /**
     * @generated from field: string fabric = 1;
     */
    fabric: string;
    /**
     * minimum CLI version
     *
     * @generated from field: string cli_min = 3;
     */
    cliMin: string;
    /**
     * minimum Pulumi provider version
     *
     * @generated from field: string pulumi_min = 4;
     */
    pulumiMin: string;
};
/**
 * Describes the message io.defang.v1.Version.
 * Use `create(VersionSchema)` to create a new message.
 */
export declare const VersionSchema: GenMessage<Version>;
/**
 * @generated from message io.defang.v1.TailRequest
 */
export type TailRequest = Message<"io.defang.v1.TailRequest"> & {
    /**
     * @generated from field: repeated string services = 1;
     */
    services: string[];
    /**
     * @generated from field: google.protobuf.Timestamp since = 2;
     */
    since?: Timestamp;
    /**
     * @generated from field: string etag = 3;
     */
    etag: string;
};
/**
 * Describes the message io.defang.v1.TailRequest.
 * Use `create(TailRequestSchema)` to create a new message.
 */
export declare const TailRequestSchema: GenMessage<TailRequest>;
/**
 * @generated from message io.defang.v1.LogEntry
 */
export type LogEntry = Message<"io.defang.v1.LogEntry"> & {
    /**
     * @generated from field: string message = 1;
     */
    message: string;
    /**
     * @generated from field: google.protobuf.Timestamp timestamp = 2;
     */
    timestamp?: Timestamp;
    /**
     * @generated from field: bool stderr = 3;
     */
    stderr: boolean;
    /**
     * @generated from field: string service = 4;
     */
    service: string;
    /**
     * @generated from field: string etag = 5;
     */
    etag: string;
    /**
     * @generated from field: string host = 6;
     */
    host: string;
    /**
     * @generated from field: string job = 7;
     */
    job: string;
};
/**
 * Describes the message io.defang.v1.LogEntry.
 * Use `create(LogEntrySchema)` to create a new message.
 */
export declare const LogEntrySchema: GenMessage<LogEntry>;
/**
 * @generated from message io.defang.v1.TailResponse
 */
export type TailResponse = Message<"io.defang.v1.TailResponse"> & {
    /**
     * @generated from field: repeated io.defang.v1.LogEntry entries = 2;
     */
    entries: LogEntry[];
    /**
     * @generated from field: string service = 3;
     */
    service: string;
    /**
     * @generated from field: string etag = 4;
     */
    etag: string;
    /**
     * @generated from field: string host = 5;
     */
    host: string;
};
/**
 * Describes the message io.defang.v1.TailResponse.
 * Use `create(TailResponseSchema)` to create a new message.
 */
export declare const TailResponseSchema: GenMessage<TailResponse>;
/**
 * @generated from message io.defang.v1.ListServicesResponse
 */
export type ListServicesResponse = Message<"io.defang.v1.ListServicesResponse"> & {
    /**
     * @generated from field: repeated io.defang.v1.ServiceInfo services = 1;
     */
    services: ServiceInfo[];
    /**
     * @generated from field: string project = 2;
     */
    project: string;
};
/**
 * Describes the message io.defang.v1.ListServicesResponse.
 * Use `create(ListServicesResponseSchema)` to create a new message.
 */
export declare const ListServicesResponseSchema: GenMessage<ListServicesResponse>;
/**
 * TODO: internal message; move to a separate proto file
 *
 * @generated from message io.defang.v1.ProjectUpdate
 */
export type ProjectUpdate = Message<"io.defang.v1.ProjectUpdate"> & {
    /**
     * @generated from field: repeated io.defang.v1.ServiceInfo services = 1;
     */
    services: ServiceInfo[];
    /**
     * @generated from field: string alb_arn = 2;
     */
    albArn: string;
    /**
     * should we use compose.name?
     *
     * @generated from field: string project = 3;
     */
    project: string;
    /**
     * @generated from field: google.protobuf.Struct compose = 4;
     */
    compose?: JsonObject;
};
/**
 * Describes the message io.defang.v1.ProjectUpdate.
 * Use `create(ProjectUpdateSchema)` to create a new message.
 */
export declare const ProjectUpdateSchema: GenMessage<ProjectUpdate>;
/**
 * @generated from message io.defang.v1.ServiceID
 */
export type ServiceID = Message<"io.defang.v1.ServiceID"> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;
};
/**
 * Describes the message io.defang.v1.ServiceID.
 * Use `create(ServiceIDSchema)` to create a new message.
 */
export declare const ServiceIDSchema: GenMessage<ServiceID>;
/**
 * @generated from message io.defang.v1.Device
 * @deprecated
 */
export type Device = Message<"io.defang.v1.Device"> & {
    /**
     * "gpu", "tpu", etc.
     *
     * @generated from field: repeated string capabilities = 1;
     */
    capabilities: string[];
    /**
     * "nvidia", "amd", etc.
     *
     * @generated from field: string driver = 2;
     */
    driver: string;
    /**
     * number of devices to reserve
     *
     * @generated from field: uint32 count = 3;
     */
    count: number;
};
/**
 * Describes the message io.defang.v1.Device.
 * Use `create(DeviceSchema)` to create a new message.
 * @deprecated
 */
export declare const DeviceSchema: GenMessage<Device>;
/**
 * @generated from message io.defang.v1.Resource
 * @deprecated
 */
export type Resource = Message<"io.defang.v1.Resource"> & {
    /**
     * in MiB
     *
     * @generated from field: float memory = 1;
     */
    memory: number;
    /**
     * fractional vCPUs
     *
     * @generated from field: float cpus = 2;
     */
    cpus: number;
    /**
     * devices & capabilities
     *
     * @generated from field: repeated io.defang.v1.Device devices = 3;
     */
    devices: Device[];
};
/**
 * Describes the message io.defang.v1.Resource.
 * Use `create(ResourceSchema)` to create a new message.
 * @deprecated
 */
export declare const ResourceSchema: GenMessage<Resource>;
/**
 * @generated from message io.defang.v1.Resources
 * @deprecated
 */
export type Resources = Message<"io.defang.v1.Resources"> & {
    /**
     * requested resources
     *
     * @generated from field: io.defang.v1.Resource reservations = 1;
     */
    reservations?: Resource;
};
/**
 * Describes the message io.defang.v1.Resources.
 * Use `create(ResourcesSchema)` to create a new message.
 * @deprecated
 */
export declare const ResourcesSchema: GenMessage<Resources>;
/**
 * @generated from message io.defang.v1.Deploy
 * @deprecated
 */
export type Deploy = Message<"io.defang.v1.Deploy"> & {
    /**
     * number of initial replicas
     *
     * @generated from field: uint32 replicas = 1;
     */
    replicas: number;
    /**
     * reservations and limits
     *
     * @generated from field: io.defang.v1.Resources resources = 2;
     */
    resources?: Resources;
};
/**
 * Describes the message io.defang.v1.Deploy.
 * Use `create(DeploySchema)` to create a new message.
 * @deprecated
 */
export declare const DeploySchema: GenMessage<Deploy>;
/**
 * @generated from message io.defang.v1.Port
 * @deprecated
 */
export type Port = Message<"io.defang.v1.Port"> & {
    /**
     * @generated from field: uint32 target = 1;
     */
    target: number;
    /**
     * @generated from field: io.defang.v1.Protocol protocol = 2;
     */
    protocol: Protocol;
    /**
     * load-balanced (ingress) or not (host)
     *
     * @generated from field: io.defang.v1.Mode mode = 3;
     */
    mode: Mode;
};
/**
 * Describes the message io.defang.v1.Port.
 * Use `create(PortSchema)` to create a new message.
 * @deprecated
 */
export declare const PortSchema: GenMessage<Port>;
/**
 * @generated from message io.defang.v1.Secret
 * @deprecated
 */
export type Secret = Message<"io.defang.v1.Secret"> & {
    /**
     * name of the secret
     *
     * @generated from field: string source = 1;
     */
    source: string;
};
/**
 * Describes the message io.defang.v1.Secret.
 * Use `create(SecretSchema)` to create a new message.
 * @deprecated
 */
export declare const SecretSchema: GenMessage<Secret>;
/**
 * @generated from message io.defang.v1.Build
 * @deprecated
 */
export type Build = Message<"io.defang.v1.Build"> & {
    /**
     * path or URL to the build context
     *
     * @generated from field: string context = 1;
     */
    context: string;
    /**
     * path to the Dockerfile
     *
     * @generated from field: string dockerfile = 2;
     */
    dockerfile: string;
    /**
     * build-time variables
     *
     * @generated from field: map<string, string> args = 3;
     */
    args: {
        [key: string]: string;
    };
    /**
     * in MiB
     *
     * @generated from field: float shm_size = 4;
     */
    shmSize: number;
    /**
     * @generated from field: string target = 5;
     */
    target: string;
};
/**
 * Describes the message io.defang.v1.Build.
 * Use `create(BuildSchema)` to create a new message.
 * @deprecated
 */
export declare const BuildSchema: GenMessage<Build>;
/**
 * @generated from message io.defang.v1.HealthCheck
 * @deprecated
 */
export type HealthCheck = Message<"io.defang.v1.HealthCheck"> & {
    /**
     * @generated from field: repeated string test = 1;
     */
    test: string[];
    /**
     * in seconds
     *
     * @generated from field: uint32 interval = 2;
     */
    interval: number;
    /**
     * in seconds; must be less than interval
     *
     * @generated from field: uint32 timeout = 3;
     */
    timeout: number;
    /**
     * @generated from field: uint32 retries = 4;
     */
    retries: number;
};
/**
 * Describes the message io.defang.v1.HealthCheck.
 * Use `create(HealthCheckSchema)` to create a new message.
 * @deprecated
 */
export declare const HealthCheckSchema: GenMessage<HealthCheck>;
/**
 * @generated from message io.defang.v1.Service
 * @deprecated
 */
export type Service = Message<"io.defang.v1.Service"> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;
    /**
     * @generated from field: string image = 2;
     */
    image: string;
    /**
     * @generated from field: io.defang.v1.Platform platform = 3;
     */
    platform: Platform;
    /**
     * deprecated: use networks
     *
     * @generated from field: bool internal = 4 [deprecated = true];
     * @deprecated
     */
    internal: boolean;
    /**
     * @generated from field: io.defang.v1.Deploy deploy = 5;
     */
    deploy?: Deploy;
    /**
     * @generated from field: repeated io.defang.v1.Port ports = 6;
     */
    ports: Port[];
    /**
     * @generated from field: map<string, string> environment = 7;
     */
    environment: {
        [key: string]: string;
    };
    /**
     * @generated from field: io.defang.v1.Build build = 8;
     */
    build?: Build;
    /**
     * FIXME: these are actually env vars
     *
     * @generated from field: repeated io.defang.v1.Secret secrets = 9;
     */
    secrets: Secret[];
    /**
     * @generated from field: io.defang.v1.HealthCheck healthcheck = 10;
     */
    healthcheck?: HealthCheck;
    /**
     * @generated from field: repeated string command = 11;
     */
    command: string[];
    /**
     * @generated from field: string domainname = 12;
     */
    domainname: string;
    /**
     * @generated from field: bool init = 13;
     */
    init: boolean;
    /**
     * x-defang-dns-role: role arn used to access route53 to create dns records
     *
     * @generated from field: string dns_role = 14;
     */
    dnsRole: string;
    /**
     * x-defang-static-files: use a managed CDN
     *
     * @generated from field: io.defang.v1.StaticFiles static_files = 15;
     */
    staticFiles?: StaticFiles;
    /**
     * currently only 1 network is supported
     *
     * @generated from field: io.defang.v1.Network networks = 16;
     */
    networks: Network;
    /**
     * x-defang-redis: use a managed redis
     *
     * @generated from field: io.defang.v1.Redis redis = 18;
     */
    redis?: Redis;
    /**
     * x-defang-postgres: use a managed
     *
     * @generated from field: io.defang.v1.Postgres postgres = 19;
     */
    postgres?: Postgres;
    /**
     * defaults to tenant ID
     *
     * @generated from field: string project = 20;
     */
    project: string;
};
/**
 * Describes the message io.defang.v1.Service.
 * Use `create(ServiceSchema)` to create a new message.
 * @deprecated
 */
export declare const ServiceSchema: GenMessage<Service>;
/**
 * @generated from message io.defang.v1.StaticFiles
 * @deprecated
 */
export type StaticFiles = Message<"io.defang.v1.StaticFiles"> & {
    /**
     * @generated from field: string folder = 1;
     */
    folder: string;
    /**
     * @generated from field: repeated string redirects = 2;
     */
    redirects: string[];
};
/**
 * Describes the message io.defang.v1.StaticFiles.
 * Use `create(StaticFilesSchema)` to create a new message.
 * @deprecated
 */
export declare const StaticFilesSchema: GenMessage<StaticFiles>;
/**
 * @generated from message io.defang.v1.Redis
 * @deprecated
 */
export type Redis = Message<"io.defang.v1.Redis"> & {};
/**
 * Describes the message io.defang.v1.Redis.
 * Use `create(RedisSchema)` to create a new message.
 * @deprecated
 */
export declare const RedisSchema: GenMessage<Redis>;
/**
 * @generated from message io.defang.v1.Postgres
 * @deprecated
 */
export type Postgres = Message<"io.defang.v1.Postgres"> & {};
/**
 * Describes the message io.defang.v1.Postgres.
 * Use `create(PostgresSchema)` to create a new message.
 * @deprecated
 */
export declare const PostgresSchema: GenMessage<Postgres>;
/**
 * @generated from message io.defang.v1.Event
 */
export type Event = Message<"io.defang.v1.Event"> & {
    /**
     * required (but we don't care)
     *
     * @generated from field: string specversion = 1;
     */
    specversion: string;
    /**
     * required
     *
     * @generated from field: string type = 2;
     */
    type: string;
    /**
     * required
     *
     * @generated from field: string source = 3;
     */
    source: string;
    /**
     * required
     *
     * @generated from field: string id = 4;
     */
    id: string;
    /**
     * @generated from field: string datacontenttype = 5;
     */
    datacontenttype: string;
    /**
     * @generated from field: string dataschema = 6;
     */
    dataschema: string;
    /**
     * @generated from field: string subject = 7;
     */
    subject: string;
    /**
     * @generated from field: google.protobuf.Timestamp time = 8;
     */
    time?: Timestamp;
    /**
     * @generated from field: bytes data = 9;
     */
    data: Uint8Array;
};
/**
 * Describes the message io.defang.v1.Event.
 * Use `create(EventSchema)` to create a new message.
 */
export declare const EventSchema: GenMessage<Event>;
/**
 * @generated from message io.defang.v1.PublishRequest
 */
export type PublishRequest = Message<"io.defang.v1.PublishRequest"> & {
    /**
     * @generated from field: io.defang.v1.Event event = 1;
     */
    event?: Event;
};
/**
 * Describes the message io.defang.v1.PublishRequest.
 * Use `create(PublishRequestSchema)` to create a new message.
 */
export declare const PublishRequestSchema: GenMessage<PublishRequest>;
/**
 * @generated from message io.defang.v1.SubscribeRequest
 */
export type SubscribeRequest = Message<"io.defang.v1.SubscribeRequest"> & {
    /**
     * @generated from field: repeated string services = 1;
     */
    services: string[];
    /**
     * @generated from field: string etag = 2;
     */
    etag: string;
};
/**
 * Describes the message io.defang.v1.SubscribeRequest.
 * Use `create(SubscribeRequestSchema)` to create a new message.
 */
export declare const SubscribeRequestSchema: GenMessage<SubscribeRequest>;
/**
 * @generated from message io.defang.v1.SubscribeResponse
 */
export type SubscribeResponse = Message<"io.defang.v1.SubscribeResponse"> & {
    /**
     * @generated from field: io.defang.v1.ServiceInfo service = 1 [deprecated = true];
     * @deprecated
     */
    service?: ServiceInfo;
    /**
     * @generated from field: string name = 2;
     */
    name: string;
    /**
     * @generated from field: string status = 3;
     */
    status: string;
    /**
     * @generated from field: io.defang.v1.ServiceState state = 4;
     */
    state: ServiceState;
};
/**
 * Describes the message io.defang.v1.SubscribeResponse.
 * Use `create(SubscribeResponseSchema)` to create a new message.
 */
export declare const SubscribeResponseSchema: GenMessage<SubscribeResponse>;
/**
 * @generated from message io.defang.v1.DelegateSubdomainZoneRequest
 */
export type DelegateSubdomainZoneRequest = Message<"io.defang.v1.DelegateSubdomainZoneRequest"> & {
    /**
     * @generated from field: repeated string name_server_records = 1;
     */
    nameServerRecords: string[];
};
/**
 * Describes the message io.defang.v1.DelegateSubdomainZoneRequest.
 * Use `create(DelegateSubdomainZoneRequestSchema)` to create a new message.
 */
export declare const DelegateSubdomainZoneRequestSchema: GenMessage<DelegateSubdomainZoneRequest>;
/**
 * @generated from message io.defang.v1.DelegateSubdomainZoneResponse
 */
export type DelegateSubdomainZoneResponse = Message<"io.defang.v1.DelegateSubdomainZoneResponse"> & {
    /**
     * @generated from field: string zone = 1;
     */
    zone: string;
};
/**
 * Describes the message io.defang.v1.DelegateSubdomainZoneResponse.
 * Use `create(DelegateSubdomainZoneResponseSchema)` to create a new message.
 */
export declare const DelegateSubdomainZoneResponseSchema: GenMessage<DelegateSubdomainZoneResponse>;
/**
 * @generated from message io.defang.v1.WhoAmIResponse
 */
export type WhoAmIResponse = Message<"io.defang.v1.WhoAmIResponse"> & {
    /**
     * @generated from field: string tenant = 1;
     */
    tenant: string;
    /**
     * @generated from field: string account = 2;
     */
    account: string;
    /**
     * @generated from field: string region = 3;
     */
    region: string;
    /**
     * @generated from field: string user_id = 4;
     */
    userId: string;
};
/**
 * Describes the message io.defang.v1.WhoAmIResponse.
 * Use `create(WhoAmIResponseSchema)` to create a new message.
 */
export declare const WhoAmIResponseSchema: GenMessage<WhoAmIResponse>;
/**
 * @generated from enum io.defang.v1.DeploymentMode
 */
export declare enum DeploymentMode {
    /**
     * @generated from enum value: UNSPECIFIED_MODE = 0;
     */
    UNSPECIFIED_MODE = 0,
    /**
     * @generated from enum value: DEVELOPMENT = 1;
     */
    DEVELOPMENT = 1,
    /**
     * @generated from enum value: STAGING = 2;
     */
    STAGING = 2,
    /**
     * @generated from enum value: PRODUCTION = 3;
     */
    PRODUCTION = 3
}
/**
 * Describes the enum io.defang.v1.DeploymentMode.
 */
export declare const DeploymentModeSchema: GenEnum<DeploymentMode>;
/**
 * @generated from enum io.defang.v1.ServiceState
 */
export declare enum ServiceState {
    /**
     * @generated from enum value: NOT_SPECIFIED = 0;
     */
    NOT_SPECIFIED = 0,
    /**
     * Build states
     *
     * initial state for build
     *
     * @generated from enum value: BUILD_QUEUED = 1;
     */
    BUILD_QUEUED = 1,
    /**
     * @generated from enum value: BUILD_PROVISIONING = 2;
     */
    BUILD_PROVISIONING = 2,
    /**
     * @generated from enum value: BUILD_PENDING = 3;
     */
    BUILD_PENDING = 3,
    /**
     * @generated from enum value: BUILD_ACTIVATING = 4;
     */
    BUILD_ACTIVATING = 4,
    /**
     * @generated from enum value: BUILD_RUNNING = 5;
     */
    BUILD_RUNNING = 5,
    /**
     * @generated from enum value: BUILD_STOPPING = 6;
     */
    BUILD_STOPPING = 6,
    /**
     * initial state for existing image
     *
     * @generated from enum value: UPDATE_QUEUED = 7;
     */
    UPDATE_QUEUED = 7,
    /**
     * Deployment states
     *
     * @generated from enum value: DEPLOYMENT_PENDING = 8;
     */
    DEPLOYMENT_PENDING = 8,
    /**
     * @generated from enum value: DEPLOYMENT_COMPLETED = 9;
     */
    DEPLOYMENT_COMPLETED = 9,
    /**
     * @generated from enum value: DEPLOYMENT_FAILED = 10;
     */
    DEPLOYMENT_FAILED = 10,
    /**
     * @generated from enum value: BUILD_FAILED = 11;
     */
    BUILD_FAILED = 11
}
/**
 * Describes the enum io.defang.v1.ServiceState.
 */
export declare const ServiceStateSchema: GenEnum<ServiceState>;
/**
 * @generated from enum io.defang.v1.ConfigType
 */
export declare enum ConfigType {
    /**
     * @generated from enum value: CONFIGTYPE_UNSPECIFIED = 0;
     */
    CONFIGTYPE_UNSPECIFIED = 0,
    /**
     * @generated from enum value: CONFIGTYPE_SENSITIVE = 1;
     */
    CONFIGTYPE_SENSITIVE = 1
}
/**
 * Describes the enum io.defang.v1.ConfigType.
 */
export declare const ConfigTypeSchema: GenEnum<ConfigType>;
/**
 * @generated from enum io.defang.v1.Platform
 * @deprecated
 */
export declare enum Platform {
    /**
     * @generated from enum value: LINUX_AMD64 = 0;
     */
    LINUX_AMD64 = 0,
    /**
     * @generated from enum value: LINUX_ARM64 = 1;
     */
    LINUX_ARM64 = 1,
    /**
     * @generated from enum value: LINUX_ANY = 2;
     */
    LINUX_ANY = 2
}
/**
 * Describes the enum io.defang.v1.Platform.
 * @deprecated
 */
export declare const PlatformSchema: GenEnum<Platform>;
/**
 * @generated from enum io.defang.v1.Protocol
 * @deprecated
 */
export declare enum Protocol {
    /**
     * unspecified means any protocol
     *
     * @generated from enum value: ANY = 0;
     */
    ANY = 0,
    /**
     * @generated from enum value: UDP = 1;
     */
    UDP = 1,
    /**
     * @generated from enum value: TCP = 2;
     */
    TCP = 2,
    /**
     * @generated from enum value: HTTP = 3;
     */
    HTTP = 3,
    /**
     * @generated from enum value: HTTP2 = 4;
     */
    HTTP2 = 4,
    /**
     * HTTP/2 with gRPC health checks
     *
     * @generated from enum value: GRPC = 5;
     */
    GRPC = 5
}
/**
 * Describes the enum io.defang.v1.Protocol.
 * @deprecated
 */
export declare const ProtocolSchema: GenEnum<Protocol>;
/**
 * @generated from enum io.defang.v1.Mode
 * @deprecated
 */
export declare enum Mode {
    /**
     * no load-balancer; suitable for internal services and functions
     *
     * @generated from enum value: HOST = 0;
     */
    HOST = 0,
    /**
     * with load-balancer; suitable for public services
     *
     * @generated from enum value: INGRESS = 1;
     */
    INGRESS = 1
}
/**
 * Describes the enum io.defang.v1.Mode.
 * @deprecated
 */
export declare const ModeSchema: GenEnum<Mode>;
/**
 * @generated from enum io.defang.v1.Network
 * @deprecated
 */
export declare enum Network {
    /**
     * was: internal=false
     *
     * @generated from enum value: UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * was: internal=true
     *
     * @generated from enum value: PRIVATE = 1;
     */
    PRIVATE = 1,
    /**
     * @generated from enum value: PUBLIC = 2;
     */
    PUBLIC = 2
}
/**
 * Describes the enum io.defang.v1.Network.
 * @deprecated
 */
export declare const NetworkSchema: GenEnum<Network>;
/**
 * @generated from service io.defang.v1.FabricController
 */
export declare const FabricController: GenService<{
    /**
     * @generated from rpc io.defang.v1.FabricController.GetStatus
     */
    getStatus: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof StatusSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.GetVersion
     */
    getVersion: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof VersionSchema;
    };
    /**
     * public
     *
     * @generated from rpc io.defang.v1.FabricController.Token
     */
    token: {
        methodKind: "unary";
        input: typeof TokenRequestSchema;
        output: typeof TokenResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.RevokeToken
     */
    revokeToken: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof EmptySchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Tail
     */
    tail: {
        methodKind: "server_streaming";
        input: typeof TailRequestSchema;
        output: typeof TailResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Update
     * @deprecated
     */
    update: {
        methodKind: "unary";
        input: typeof ServiceSchema;
        output: typeof ServiceInfoSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Deploy
     */
    deploy: {
        methodKind: "unary";
        input: typeof DeployRequestSchema;
        output: typeof DeployResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Get
     */
    get: {
        methodKind: "unary";
        input: typeof ServiceIDSchema;
        output: typeof ServiceInfoSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Delete
     * @deprecated
     */
    delete: {
        methodKind: "unary";
        input: typeof DeleteRequestSchema;
        output: typeof DeleteResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Publish
     */
    publish: {
        methodKind: "unary";
        input: typeof PublishRequestSchema;
        output: typeof EmptySchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Subscribe
     */
    subscribe: {
        methodKind: "server_streaming";
        input: typeof SubscribeRequestSchema;
        output: typeof SubscribeResponseSchema;
    };
    /**
     * rpc Promote(google.protobuf.Empty) returns (google.protobuf.Empty);
     *
     * @generated from rpc io.defang.v1.FabricController.GetServices
     */
    getServices: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof ListServicesResponseSchema;
    };
    /**
     * deprecated; use StartGenerate/GenerateStatus
     *
     * @generated from rpc io.defang.v1.FabricController.GenerateFiles
     */
    generateFiles: {
        methodKind: "unary";
        input: typeof GenerateFilesRequestSchema;
        output: typeof GenerateFilesResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.StartGenerate
     */
    startGenerate: {
        methodKind: "unary";
        input: typeof GenerateFilesRequestSchema;
        output: typeof StartGenerateResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.GenerateStatus
     */
    generateStatus: {
        methodKind: "unary";
        input: typeof GenerateStatusRequestSchema;
        output: typeof GenerateFilesResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Debug
     */
    debug: {
        methodKind: "unary";
        input: typeof DebugRequestSchema;
        output: typeof DebugResponseSchema;
    };
    /**
     * AgreeToS
     *
     * @generated from rpc io.defang.v1.FabricController.SignEULA
     */
    signEULA: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof EmptySchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.CheckToS
     */
    checkToS: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof EmptySchema;
    };
    /**
     * deprecate - change to use *Config functions
     *
     * @generated from rpc io.defang.v1.FabricController.PutSecret
     * @deprecated
     */
    putSecret: {
        methodKind: "unary";
        input: typeof PutConfigRequestSchema;
        output: typeof EmptySchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.DeleteSecrets
     * @deprecated
     */
    deleteSecrets: {
        methodKind: "unary";
        input: typeof SecretsSchema;
        output: typeof EmptySchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.ListSecrets
     * @deprecated
     */
    listSecrets: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof SecretsSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.GetConfigs
     */
    getConfigs: {
        methodKind: "unary";
        input: typeof GetConfigsRequestSchema;
        output: typeof GetConfigsResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.PutConfig
     */
    putConfig: {
        methodKind: "unary";
        input: typeof PutConfigRequestSchema;
        output: typeof EmptySchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.DeleteConfigs
     */
    deleteConfigs: {
        methodKind: "unary";
        input: typeof DeleteConfigsRequestSchema;
        output: typeof EmptySchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.ListConfigs
     */
    listConfigs: {
        methodKind: "unary";
        input: typeof ListConfigsRequestSchema;
        output: typeof ListConfigsResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.CreateUploadURL
     */
    createUploadURL: {
        methodKind: "unary";
        input: typeof UploadURLRequestSchema;
        output: typeof UploadURLResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.DelegateSubdomainZone
     */
    delegateSubdomainZone: {
        methodKind: "unary";
        input: typeof DelegateSubdomainZoneRequestSchema;
        output: typeof DelegateSubdomainZoneResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.DeleteSubdomainZone
     */
    deleteSubdomainZone: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof EmptySchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.GetDelegateSubdomainZone
     */
    getDelegateSubdomainZone: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof DelegateSubdomainZoneResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.WhoAmI
     */
    whoAmI: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof WhoAmIResponseSchema;
    };
    /**
     * @generated from rpc io.defang.v1.FabricController.Track
     */
    track: {
        methodKind: "unary";
        input: typeof TrackRequestSchema;
        output: typeof EmptySchema;
    };
    /**
     * Endpoint for GDPR compliance
     *
     * @generated from rpc io.defang.v1.FabricController.DeleteMe
     */
    deleteMe: {
        methodKind: "unary";
        input: typeof EmptySchema;
        output: typeof EmptySchema;
    };
}>;
//# sourceMappingURL=fabric_pb.d.ts.map
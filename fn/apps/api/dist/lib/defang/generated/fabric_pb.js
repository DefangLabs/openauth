"use strict";
// protos/io/defang/v1/fabric.proto
exports.__esModule = true;
exports.PostgresSchema = exports.RedisSchema = exports.StaticFilesSchema = exports.ServiceSchema = exports.HealthCheckSchema = exports.BuildSchema = exports.SecretSchema = exports.PortSchema = exports.DeploySchema = exports.ResourcesSchema = exports.ResourceSchema = exports.DeviceSchema = exports.ServiceIDSchema = exports.ProjectUpdateSchema = exports.ListServicesResponseSchema = exports.TailResponseSchema = exports.LogEntrySchema = exports.TailRequestSchema = exports.VersionSchema = exports.StatusSchema = exports.TokenResponseSchema = exports.TokenRequestSchema = exports.ListConfigsResponseSchema = exports.ListConfigsRequestSchema = exports.DeleteConfigsRequestSchema = exports.GetConfigsResponseSchema = exports.GetConfigsRequestSchema = exports.PutConfigRequestSchema = exports.ConfigKeySchema = exports.ConfigSchema = exports.SecretValueSchema = exports.SecretsSchema = exports.ServiceInfoSchema = exports.UploadURLResponseSchema = exports.UploadURLRequestSchema = exports.GenerateStatusRequestSchema = exports.StartGenerateResponseSchema = exports.GenerateFilesResponseSchema = exports.FileSchema = exports.GenerateFilesRequestSchema = exports.DeleteResponseSchema = exports.DeleteRequestSchema = exports.DeployResponseSchema = exports.DeployRequestSchema = exports.TrackRequestSchema = exports.CodeChangeSchema = exports.IssueSchema = exports.DebugResponseSchema = exports.DebugRequestSchema = exports.file_fabric = void 0;
exports.FabricController = exports.NetworkSchema = exports.Network = exports.ModeSchema = exports.Mode = exports.ProtocolSchema = exports.Protocol = exports.PlatformSchema = exports.Platform = exports.ConfigTypeSchema = exports.ConfigType = exports.ServiceStateSchema = exports.ServiceState = exports.DeploymentModeSchema = exports.DeploymentMode = exports.WhoAmIResponseSchema = exports.DelegateSubdomainZoneResponseSchema = exports.DelegateSubdomainZoneRequestSchema = exports.SubscribeResponseSchema = exports.SubscribeRequestSchema = exports.PublishRequestSchema = exports.EventSchema = void 0;
var codegenv1_1 = require("@bufbuild/protobuf/codegenv1");
var wkt_1 = require("@bufbuild/protobuf/wkt");
/**
 * Describes the file fabric.proto.
 */
exports.file_fabric = (0, codegenv1_1.fileDesc)("CgxmYWJyaWMucHJvdG8SDGlvLmRlZmFuZy52MSJwCgxEZWJ1Z1JlcXVlc3QSIQoFZmlsZXMYASADKAsyEi5pby5kZWZhbmcudjEuRmlsZRIMCgRldGFnGAIgASgJEg8KB3Byb2plY3QYAyABKAkSDAoEbG9ncxgEIAEoCRIQCghzZXJ2aWNlcxgFIAMoCSJXCg1EZWJ1Z1Jlc3BvbnNlEg8KB2dlbmVyYWwYASABKAkSIwoGaXNzdWVzGAIgAygLMhMuaW8uZGVmYW5nLnYxLklzc3VlEhAKCHJlcXVlc3RzGAMgAygJImgKBUlzc3VlEgwKBHR5cGUYASABKAkSEAoIc2V2ZXJpdHkYAiABKAkSDwoHZGV0YWlscxgDIAEoCRIuCgxjb2RlX2NoYW5nZXMYBCADKAsyGC5pby5kZWZhbmcudjEuQ29kZUNoYW5nZSIqCgpDb2RlQ2hhbmdlEgwKBGZpbGUYASABKAkSDgoGY2hhbmdlGAIgASgJIrsBCgxUcmFja1JlcXVlc3QSDwoHYW5vbl9pZBgBIAEoCRINCgVldmVudBgCIAEoCRI+Cgpwcm9wZXJ0aWVzGAMgAygLMiouaW8uZGVmYW5nLnYxLlRyYWNrUmVxdWVzdC5Qcm9wZXJ0aWVzRW50cnkSCgoCb3MYBCABKAkSDAoEYXJjaBgFIAEoCRoxCg9Qcm9wZXJ0aWVzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4ASKnAQoNRGVwbG95UmVxdWVzdBIrCghzZXJ2aWNlcxgBIAMoCzIVLmlvLmRlZmFuZy52MS5TZXJ2aWNlQgIYARITCgdwcm9qZWN0GAIgASgJQgIYARIqCgRtb2RlGAMgASgOMhwuaW8uZGVmYW5nLnYxLkRlcGxveW1lbnRNb2RlEigKB2NvbXBvc2UYBCABKAsyFy5nb29nbGUucHJvdG9idWYuU3RydWN0IksKDkRlcGxveVJlc3BvbnNlEisKCHNlcnZpY2VzGAEgAygLMhkuaW8uZGVmYW5nLnYxLlNlcnZpY2VJbmZvEgwKBGV0YWcYAiABKAkiLwoNRGVsZXRlUmVxdWVzdBINCgVuYW1lcxgBIAMoCRIPCgdwcm9qZWN0GAIgASgJIh4KDkRlbGV0ZVJlc3BvbnNlEgwKBGV0YWcYASABKAkiSwoUR2VuZXJhdGVGaWxlc1JlcXVlc3QSDgoGcHJvbXB0GAEgASgJEhAKCGxhbmd1YWdlGAIgASgJEhEKCWFncmVlX3RvcxgDIAEoCCIlCgRGaWxlEgwKBG5hbWUYASABKAkSDwoHY29udGVudBgCIAEoCSI6ChVHZW5lcmF0ZUZpbGVzUmVzcG9uc2USIQoFZmlsZXMYASADKAsyEi5pby5kZWZhbmcudjEuRmlsZSIlChVTdGFydEdlbmVyYXRlUmVzcG9uc2USDAoEdXVpZBgBIAEoCSIlChVHZW5lcmF0ZVN0YXR1c1JlcXVlc3QSDAoEdXVpZBgBIAEoCSIiChBVcGxvYWRVUkxSZXF1ZXN0Eg4KBmRpZ2VzdBgBIAEoCSIgChFVcGxvYWRVUkxSZXNwb25zZRILCgN1cmwYASABKAkikAMKC1NlcnZpY2VJbmZvEiYKB3NlcnZpY2UYASABKAsyFS5pby5kZWZhbmcudjEuU2VydmljZRIRCgllbmRwb2ludHMYAiADKAkSDwoHcHJvamVjdBgDIAEoCRIMCgRldGFnGAQgASgJEg4KBnN0YXR1cxgFIAEoCRIPCgduYXRfaXBzGAYgAygJEg4KBmxiX2lwcxgHIAMoCRIUCgxwcml2YXRlX2ZxZG4YCCABKAkSEwoLcHVibGljX2ZxZG4YCSABKAkSLgoKY3JlYXRlZF9hdBgKIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASLgoKdXBkYXRlZF9hdBgLIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASDwoHem9uZV9pZBgMIAEoCRIVCg11c2VfYWNtZV9jZXJ0GA0gASgIEikKBXN0YXRlGA8gASgOMhouaW8uZGVmYW5nLnYxLlNlcnZpY2VTdGF0ZRISCgpkb21haW5uYW1lGBAgASgJSgQIDhAPIi0KB1NlY3JldHMSDQoFbmFtZXMYASADKAkSDwoHcHJvamVjdBgCIAEoCToCGAEiPwoLU2VjcmV0VmFsdWUSDAoEbmFtZRgBIAEoCRINCgV2YWx1ZRgCIAEoCRIPCgdwcm9qZWN0GAMgASgJOgIYASJeCgZDb25maWcSDAoEbmFtZRgBIAEoCRINCgV2YWx1ZRgCIAEoCRIPCgdwcm9qZWN0GAMgASgJEiYKBHR5cGUYBCABKA4yGC5pby5kZWZhbmcudjEuQ29uZmlnVHlwZSIqCglDb25maWdLZXkSDAoEbmFtZRgBIAEoCRIPCgdwcm9qZWN0GAIgASgJImgKEFB1dENvbmZpZ1JlcXVlc3QSDAoEbmFtZRgBIAEoCRINCgV2YWx1ZRgCIAEoCRIPCgdwcm9qZWN0GAMgASgJEiYKBHR5cGUYBCABKA4yGC5pby5kZWZhbmcudjEuQ29uZmlnVHlwZSI9ChFHZXRDb25maWdzUmVxdWVzdBIoCgdjb25maWdzGAEgAygLMhcuaW8uZGVmYW5nLnYxLkNvbmZpZ0tleSI7ChJHZXRDb25maWdzUmVzcG9uc2USJQoHY29uZmlncxgBIAMoCzIULmlvLmRlZmFuZy52MS5Db25maWciQAoURGVsZXRlQ29uZmlnc1JlcXVlc3QSKAoHY29uZmlncxgBIAMoCzIXLmlvLmRlZmFuZy52MS5Db25maWdLZXkiJQoSTGlzdENvbmZpZ3NSZXF1ZXN0Eg8KB3Byb2plY3QYASABKAkiPwoTTGlzdENvbmZpZ3NSZXNwb25zZRIoCgdjb25maWdzGAEgAygLMhcuaW8uZGVmYW5nLnYxLkNvbmZpZ0tleSJ4CgxUb2tlblJlcXVlc3QSDgoGdGVuYW50GAEgASgJEhEKCWF1dGhfY29kZRgCIAEoCRINCgVzY29wZRgDIAMoCRIRCglhc3NlcnRpb24YBCABKAkSEgoKZXhwaXJlc19pbhgFIAEoDRIPCgdhbm9uX2lkGAYgASgJIiUKDVRva2VuUmVzcG9uc2USFAoMYWNjZXNzX3Rva2VuGAEgASgJIhkKBlN0YXR1cxIPCgd2ZXJzaW9uGAEgASgJIkQKB1ZlcnNpb24SDgoGZmFicmljGAEgASgJEg8KB2NsaV9taW4YAyABKAkSEgoKcHVsdW1pX21pbhgEIAEoCUoECAIQAyJYCgtUYWlsUmVxdWVzdBIQCghzZXJ2aWNlcxgBIAMoCRIpCgVzaW5jZRgCIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASDAoEZXRhZxgDIAEoCSKUAQoITG9nRW50cnkSDwoHbWVzc2FnZRgBIAEoCRItCgl0aW1lc3RhbXAYAiABKAsyGi5nb29nbGUucHJvdG9idWYuVGltZXN0YW1wEg4KBnN0ZGVychgDIAEoCBIPCgdzZXJ2aWNlGAQgASgJEgwKBGV0YWcYBSABKAkSDAoEaG9zdBgGIAEoCRILCgNqb2IYByABKAkiagoMVGFpbFJlc3BvbnNlEicKB2VudHJpZXMYAiADKAsyFi5pby5kZWZhbmcudjEuTG9nRW50cnkSDwoHc2VydmljZRgDIAEoCRIMCgRldGFnGAQgASgJEgwKBGhvc3QYBSABKAlKBAgBEAIiVAoUTGlzdFNlcnZpY2VzUmVzcG9uc2USKwoIc2VydmljZXMYASADKAsyGS5pby5kZWZhbmcudjEuU2VydmljZUluZm8SDwoHcHJvamVjdBgCIAEoCSKIAQoNUHJvamVjdFVwZGF0ZRIrCghzZXJ2aWNlcxgBIAMoCzIZLmlvLmRlZmFuZy52MS5TZXJ2aWNlSW5mbxIPCgdhbGJfYXJuGAIgASgJEg8KB3Byb2plY3QYAyABKAkSKAoHY29tcG9zZRgEIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QiGQoJU2VydmljZUlEEgwKBG5hbWUYASABKAkiQQoGRGV2aWNlEhQKDGNhcGFiaWxpdGllcxgBIAMoCRIOCgZkcml2ZXIYAiABKAkSDQoFY291bnQYAyABKA06AhgBIlMKCFJlc291cmNlEg4KBm1lbW9yeRgBIAEoAhIMCgRjcHVzGAIgASgCEiUKB2RldmljZXMYAyADKAsyFC5pby5kZWZhbmcudjEuRGV2aWNlOgIYASI9CglSZXNvdXJjZXMSLAoMcmVzZXJ2YXRpb25zGAEgASgLMhYuaW8uZGVmYW5nLnYxLlJlc291cmNlOgIYASJKCgZEZXBsb3kSEAoIcmVwbGljYXMYASABKA0SKgoJcmVzb3VyY2VzGAIgASgLMhcuaW8uZGVmYW5nLnYxLlJlc291cmNlczoCGAEiZgoEUG9ydBIOCgZ0YXJnZXQYASABKA0SKAoIcHJvdG9jb2wYAiABKA4yFi5pby5kZWZhbmcudjEuUHJvdG9jb2wSIAoEbW9kZRgDIAEoDjISLmlvLmRlZmFuZy52MS5Nb2RlOgIYASIcCgZTZWNyZXQSDgoGc291cmNlGAEgASgJOgIYASKsAQoFQnVpbGQSDwoHY29udGV4dBgBIAEoCRISCgpkb2NrZXJmaWxlGAIgASgJEisKBGFyZ3MYAyADKAsyHS5pby5kZWZhbmcudjEuQnVpbGQuQXJnc0VudHJ5EhAKCHNobV9zaXplGAQgASgCEg4KBnRhcmdldBgFIAEoCRorCglBcmdzRW50cnkSCwoDa2V5GAEgASgJEg0KBXZhbHVlGAIgASgJOgI4AToCGAEiUwoLSGVhbHRoQ2hlY2sSDAoEdGVzdBgBIAMoCRIQCghpbnRlcnZhbBgCIAEoDRIPCgd0aW1lb3V0GAMgASgNEg8KB3JldHJpZXMYBCABKA06AhgBIp0FCgdTZXJ2aWNlEgwKBG5hbWUYASABKAkSDQoFaW1hZ2UYAiABKAkSKAoIcGxhdGZvcm0YAyABKA4yFi5pby5kZWZhbmcudjEuUGxhdGZvcm0SFAoIaW50ZXJuYWwYBCABKAhCAhgBEiQKBmRlcGxveRgFIAEoCzIULmlvLmRlZmFuZy52MS5EZXBsb3kSIQoFcG9ydHMYBiADKAsyEi5pby5kZWZhbmcudjEuUG9ydBI7CgtlbnZpcm9ubWVudBgHIAMoCzImLmlvLmRlZmFuZy52MS5TZXJ2aWNlLkVudmlyb25tZW50RW50cnkSIgoFYnVpbGQYCCABKAsyEy5pby5kZWZhbmcudjEuQnVpbGQSJQoHc2VjcmV0cxgJIAMoCzIULmlvLmRlZmFuZy52MS5TZWNyZXQSLgoLaGVhbHRoY2hlY2sYCiABKAsyGS5pby5kZWZhbmcudjEuSGVhbHRoQ2hlY2sSDwoHY29tbWFuZBgLIAMoCRISCgpkb21haW5uYW1lGAwgASgJEgwKBGluaXQYDSABKAgSEAoIZG5zX3JvbGUYDiABKAkSLwoMc3RhdGljX2ZpbGVzGA8gASgLMhkuaW8uZGVmYW5nLnYxLlN0YXRpY0ZpbGVzEicKCG5ldHdvcmtzGBAgASgOMhUuaW8uZGVmYW5nLnYxLk5ldHdvcmsSIgoFcmVkaXMYEiABKAsyEy5pby5kZWZhbmcudjEuUmVkaXMSKAoIcG9zdGdyZXMYEyABKAsyFi5pby5kZWZhbmcudjEuUG9zdGdyZXMSDwoHcHJvamVjdBgUIAEoCRoyChBFbnZpcm9ubWVudEVudHJ5EgsKA2tleRgBIAEoCRINCgV2YWx1ZRgCIAEoCToCOAE6AhgBIjQKC1N0YXRpY0ZpbGVzEg4KBmZvbGRlchgBIAEoCRIRCglyZWRpcmVjdHMYAiADKAk6AhgBIgsKBVJlZGlzOgIYASIOCghQb3N0Z3JlczoCGAEivAEKBUV2ZW50EhMKC3NwZWN2ZXJzaW9uGAEgASgJEgwKBHR5cGUYAiABKAkSDgoGc291cmNlGAMgASgJEgoKAmlkGAQgASgJEhcKD2RhdGFjb250ZW50dHlwZRgFIAEoCRISCgpkYXRhc2NoZW1hGAYgASgJEg8KB3N1YmplY3QYByABKAkSKAoEdGltZRgIIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXASDAoEZGF0YRgJIAEoDCI0Cg5QdWJsaXNoUmVxdWVzdBIiCgVldmVudBgBIAEoCzITLmlvLmRlZmFuZy52MS5FdmVudCIyChBTdWJzY3JpYmVSZXF1ZXN0EhAKCHNlcnZpY2VzGAEgAygJEgwKBGV0YWcYAiABKAkijAEKEVN1YnNjcmliZVJlc3BvbnNlEi4KB3NlcnZpY2UYASABKAsyGS5pby5kZWZhbmcudjEuU2VydmljZUluZm9CAhgBEgwKBG5hbWUYAiABKAkSDgoGc3RhdHVzGAMgASgJEikKBXN0YXRlGAQgASgOMhouaW8uZGVmYW5nLnYxLlNlcnZpY2VTdGF0ZSI7ChxEZWxlZ2F0ZVN1YmRvbWFpblpvbmVSZXF1ZXN0EhsKE25hbWVfc2VydmVyX3JlY29yZHMYASADKAkiLQodRGVsZWdhdGVTdWJkb21haW5ab25lUmVzcG9uc2USDAoEem9uZRgBIAEoCSJSCg5XaG9BbUlSZXNwb25zZRIOCgZ0ZW5hbnQYASABKAkSDwoHYWNjb3VudBgCIAEoCRIOCgZyZWdpb24YAyABKAkSDwoHdXNlcl9pZBgEIAEoCSpUCg5EZXBsb3ltZW50TW9kZRIUChBVTlNQRUNJRklFRF9NT0RFEAASDwoLREVWRUxPUE1FTlQQARILCgdTVEFHSU5HEAISDgoKUFJPRFVDVElPThADKokCCgxTZXJ2aWNlU3RhdGUSEQoNTk9UX1NQRUNJRklFRBAAEhAKDEJVSUxEX1FVRVVFRBABEhYKEkJVSUxEX1BST1ZJU0lPTklORxACEhEKDUJVSUxEX1BFTkRJTkcQAxIUChBCVUlMRF9BQ1RJVkFUSU5HEAQSEQoNQlVJTERfUlVOTklORxAFEhIKDkJVSUxEX1NUT1BQSU5HEAYSEQoNVVBEQVRFX1FVRVVFRBAHEhYKEkRFUExPWU1FTlRfUEVORElORxAIEhgKFERFUExPWU1FTlRfQ09NUExFVEVEEAkSFQoRREVQTE9ZTUVOVF9GQUlMRUQQChIQCgxCVUlMRF9GQUlMRUQQCypCCgpDb25maWdUeXBlEhoKFkNPTkZJR1RZUEVfVU5TUEVDSUZJRUQQABIYChRDT05GSUdUWVBFX1NFTlNJVElWRRABKj8KCFBsYXRmb3JtEg8KC0xJTlVYX0FNRDY0EAASDwoLTElOVVhfQVJNNjQQARINCglMSU5VWF9BTlkQAhoCGAEqSAoIUHJvdG9jb2wSBwoDQU5ZEAASBwoDVURQEAESBwoDVENQEAISCAoESFRUUBADEgkKBUhUVFAyEAQSCAoER1JQQxAFGgIYASohCgRNb2RlEggKBEhPU1QQABILCgdJTkdSRVNTEAEaAhgBKjcKB05ldHdvcmsSDwoLVU5TUEVDSUZJRUQQABILCgdQUklWQVRFEAESCgoGUFVCTElDEAIaAhgBMucSChBGYWJyaWNDb250cm9sbGVyEj4KCUdldFN0YXR1cxIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRoULmlvLmRlZmFuZy52MS5TdGF0dXMiA5ACARJACgpHZXRWZXJzaW9uEhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GhUuaW8uZGVmYW5nLnYxLlZlcnNpb24iA5ACARJACgVUb2tlbhIaLmlvLmRlZmFuZy52MS5Ub2tlblJlcXVlc3QaGy5pby5kZWZhbmcudjEuVG9rZW5SZXNwb25zZRI9CgtSZXZva2VUb2tlbhIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRoWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRI/CgRUYWlsEhkuaW8uZGVmYW5nLnYxLlRhaWxSZXF1ZXN0GhouaW8uZGVmYW5nLnYxLlRhaWxSZXNwb25zZTABEj8KBlVwZGF0ZRIVLmlvLmRlZmFuZy52MS5TZXJ2aWNlGhkuaW8uZGVmYW5nLnYxLlNlcnZpY2VJbmZvIgOIAgESQwoGRGVwbG95EhsuaW8uZGVmYW5nLnYxLkRlcGxveVJlcXVlc3QaHC5pby5kZWZhbmcudjEuRGVwbG95UmVzcG9uc2USPgoDR2V0EhcuaW8uZGVmYW5nLnYxLlNlcnZpY2VJRBoZLmlvLmRlZmFuZy52MS5TZXJ2aWNlSW5mbyIDkAIBEkgKBkRlbGV0ZRIbLmlvLmRlZmFuZy52MS5EZWxldGVSZXF1ZXN0GhwuaW8uZGVmYW5nLnYxLkRlbGV0ZVJlc3BvbnNlIgOIAgESPwoHUHVibGlzaBIcLmlvLmRlZmFuZy52MS5QdWJsaXNoUmVxdWVzdBoWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRJOCglTdWJzY3JpYmUSHi5pby5kZWZhbmcudjEuU3Vic2NyaWJlUmVxdWVzdBofLmlvLmRlZmFuZy52MS5TdWJzY3JpYmVSZXNwb25zZTABEk4KC0dldFNlcnZpY2VzEhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GiIuaW8uZGVmYW5nLnYxLkxpc3RTZXJ2aWNlc1Jlc3BvbnNlIgOQAgESWAoNR2VuZXJhdGVGaWxlcxIiLmlvLmRlZmFuZy52MS5HZW5lcmF0ZUZpbGVzUmVxdWVzdBojLmlvLmRlZmFuZy52MS5HZW5lcmF0ZUZpbGVzUmVzcG9uc2USWAoNU3RhcnRHZW5lcmF0ZRIiLmlvLmRlZmFuZy52MS5HZW5lcmF0ZUZpbGVzUmVxdWVzdBojLmlvLmRlZmFuZy52MS5TdGFydEdlbmVyYXRlUmVzcG9uc2USXwoOR2VuZXJhdGVTdGF0dXMSIy5pby5kZWZhbmcudjEuR2VuZXJhdGVTdGF0dXNSZXF1ZXN0GiMuaW8uZGVmYW5nLnYxLkdlbmVyYXRlRmlsZXNSZXNwb25zZSIDkAIBEkAKBURlYnVnEhouaW8uZGVmYW5nLnYxLkRlYnVnUmVxdWVzdBobLmlvLmRlZmFuZy52MS5EZWJ1Z1Jlc3BvbnNlEjoKCFNpZ25FVUxBEhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5Ej8KCENoZWNrVG9TEhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5IgOQAgESSAoJUHV0U2VjcmV0Eh4uaW8uZGVmYW5nLnYxLlB1dENvbmZpZ1JlcXVlc3QaFi5nb29nbGUucHJvdG9idWYuRW1wdHkiA4gCARJDCg1EZWxldGVTZWNyZXRzEhUuaW8uZGVmYW5nLnYxLlNlY3JldHMaFi5nb29nbGUucHJvdG9idWYuRW1wdHkiA4gCARJECgtMaXN0U2VjcmV0cxIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRoVLmlvLmRlZmFuZy52MS5TZWNyZXRzIgaIAgGQAgESVAoKR2V0Q29uZmlncxIfLmlvLmRlZmFuZy52MS5HZXRDb25maWdzUmVxdWVzdBogLmlvLmRlZmFuZy52MS5HZXRDb25maWdzUmVzcG9uc2UiA5ACARJICglQdXRDb25maWcSHi5pby5kZWZhbmcudjEuUHV0Q29uZmlnUmVxdWVzdBoWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eSIDkAICEksKDURlbGV0ZUNvbmZpZ3MSIi5pby5kZWZhbmcudjEuRGVsZXRlQ29uZmlnc1JlcXVlc3QaFi5nb29nbGUucHJvdG9idWYuRW1wdHkSVwoLTGlzdENvbmZpZ3MSIC5pby5kZWZhbmcudjEuTGlzdENvbmZpZ3NSZXF1ZXN0GiEuaW8uZGVmYW5nLnYxLkxpc3RDb25maWdzUmVzcG9uc2UiA5ACARJSCg9DcmVhdGVVcGxvYWRVUkwSHi5pby5kZWZhbmcudjEuVXBsb2FkVVJMUmVxdWVzdBofLmlvLmRlZmFuZy52MS5VcGxvYWRVUkxSZXNwb25zZRJwChVEZWxlZ2F0ZVN1YmRvbWFpblpvbmUSKi5pby5kZWZhbmcudjEuRGVsZWdhdGVTdWJkb21haW5ab25lUmVxdWVzdBorLmlvLmRlZmFuZy52MS5EZWxlZ2F0ZVN1YmRvbWFpblpvbmVSZXNwb25zZRJFChNEZWxldGVTdWJkb21haW5ab25lEhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5GhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5EmQKGEdldERlbGVnYXRlU3ViZG9tYWluWm9uZRIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRorLmlvLmRlZmFuZy52MS5EZWxlZ2F0ZVN1YmRvbWFpblpvbmVSZXNwb25zZSIDkAIBEkMKBldob0FtSRIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRocLmlvLmRlZmFuZy52MS5XaG9BbUlSZXNwb25zZSIDkAIBEjsKBVRyYWNrEhouaW8uZGVmYW5nLnYxLlRyYWNrUmVxdWVzdBoWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRI6CghEZWxldGVNZRIWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eRoWLmdvb2dsZS5wcm90b2J1Zi5FbXB0eUI2WjRnaXRodWIuY29tL0RlZmFuZ0xhYnMvZGVmYW5nL3NyYy9wcm90b3MvaW8vZGVmYW5nL3YxYgZwcm90bzM", [wkt_1.file_google_protobuf_empty, wkt_1.file_google_protobuf_struct, wkt_1.file_google_protobuf_timestamp]);
/**
 * Describes the message io.defang.v1.DebugRequest.
 * Use `create(DebugRequestSchema)` to create a new message.
 */
exports.DebugRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 0);
/**
 * Describes the message io.defang.v1.DebugResponse.
 * Use `create(DebugResponseSchema)` to create a new message.
 */
exports.DebugResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 1);
/**
 * Describes the message io.defang.v1.Issue.
 * Use `create(IssueSchema)` to create a new message.
 */
exports.IssueSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 2);
/**
 * Describes the message io.defang.v1.CodeChange.
 * Use `create(CodeChangeSchema)` to create a new message.
 */
exports.CodeChangeSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 3);
/**
 * Describes the message io.defang.v1.TrackRequest.
 * Use `create(TrackRequestSchema)` to create a new message.
 */
exports.TrackRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 4);
/**
 * Describes the message io.defang.v1.DeployRequest.
 * Use `create(DeployRequestSchema)` to create a new message.
 */
exports.DeployRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 5);
/**
 * Describes the message io.defang.v1.DeployResponse.
 * Use `create(DeployResponseSchema)` to create a new message.
 */
exports.DeployResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 6);
/**
 * Describes the message io.defang.v1.DeleteRequest.
 * Use `create(DeleteRequestSchema)` to create a new message.
 */
exports.DeleteRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 7);
/**
 * Describes the message io.defang.v1.DeleteResponse.
 * Use `create(DeleteResponseSchema)` to create a new message.
 */
exports.DeleteResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 8);
/**
 * Describes the message io.defang.v1.GenerateFilesRequest.
 * Use `create(GenerateFilesRequestSchema)` to create a new message.
 */
exports.GenerateFilesRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 9);
/**
 * Describes the message io.defang.v1.File.
 * Use `create(FileSchema)` to create a new message.
 */
exports.FileSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 10);
/**
 * Describes the message io.defang.v1.GenerateFilesResponse.
 * Use `create(GenerateFilesResponseSchema)` to create a new message.
 */
exports.GenerateFilesResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 11);
/**
 * Describes the message io.defang.v1.StartGenerateResponse.
 * Use `create(StartGenerateResponseSchema)` to create a new message.
 */
exports.StartGenerateResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 12);
/**
 * Describes the message io.defang.v1.GenerateStatusRequest.
 * Use `create(GenerateStatusRequestSchema)` to create a new message.
 */
exports.GenerateStatusRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 13);
/**
 * Describes the message io.defang.v1.UploadURLRequest.
 * Use `create(UploadURLRequestSchema)` to create a new message.
 */
exports.UploadURLRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 14);
/**
 * Describes the message io.defang.v1.UploadURLResponse.
 * Use `create(UploadURLResponseSchema)` to create a new message.
 */
exports.UploadURLResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 15);
/**
 * Describes the message io.defang.v1.ServiceInfo.
 * Use `create(ServiceInfoSchema)` to create a new message.
 */
exports.ServiceInfoSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 16);
/**
 * Describes the message io.defang.v1.Secrets.
 * Use `create(SecretsSchema)` to create a new message.
 * @deprecated
 */
exports.SecretsSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 17);
/**
 * Describes the message io.defang.v1.SecretValue.
 * Use `create(SecretValueSchema)` to create a new message.
 * @deprecated
 */
exports.SecretValueSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 18);
/**
 * Describes the message io.defang.v1.Config.
 * Use `create(ConfigSchema)` to create a new message.
 */
exports.ConfigSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 19);
/**
 * Describes the message io.defang.v1.ConfigKey.
 * Use `create(ConfigKeySchema)` to create a new message.
 */
exports.ConfigKeySchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 20);
/**
 * Describes the message io.defang.v1.PutConfigRequest.
 * Use `create(PutConfigRequestSchema)` to create a new message.
 */
exports.PutConfigRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 21);
/**
 * Describes the message io.defang.v1.GetConfigsRequest.
 * Use `create(GetConfigsRequestSchema)` to create a new message.
 */
exports.GetConfigsRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 22);
/**
 * Describes the message io.defang.v1.GetConfigsResponse.
 * Use `create(GetConfigsResponseSchema)` to create a new message.
 */
exports.GetConfigsResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 23);
/**
 * Describes the message io.defang.v1.DeleteConfigsRequest.
 * Use `create(DeleteConfigsRequestSchema)` to create a new message.
 */
exports.DeleteConfigsRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 24);
/**
 * Describes the message io.defang.v1.ListConfigsRequest.
 * Use `create(ListConfigsRequestSchema)` to create a new message.
 */
exports.ListConfigsRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 25);
/**
 * Describes the message io.defang.v1.ListConfigsResponse.
 * Use `create(ListConfigsResponseSchema)` to create a new message.
 */
exports.ListConfigsResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 26);
/**
 * Describes the message io.defang.v1.TokenRequest.
 * Use `create(TokenRequestSchema)` to create a new message.
 */
exports.TokenRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 27);
/**
 * Describes the message io.defang.v1.TokenResponse.
 * Use `create(TokenResponseSchema)` to create a new message.
 */
exports.TokenResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 28);
/**
 * Describes the message io.defang.v1.Status.
 * Use `create(StatusSchema)` to create a new message.
 */
exports.StatusSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 29);
/**
 * Describes the message io.defang.v1.Version.
 * Use `create(VersionSchema)` to create a new message.
 */
exports.VersionSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 30);
/**
 * Describes the message io.defang.v1.TailRequest.
 * Use `create(TailRequestSchema)` to create a new message.
 */
exports.TailRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 31);
/**
 * Describes the message io.defang.v1.LogEntry.
 * Use `create(LogEntrySchema)` to create a new message.
 */
exports.LogEntrySchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 32);
/**
 * Describes the message io.defang.v1.TailResponse.
 * Use `create(TailResponseSchema)` to create a new message.
 */
exports.TailResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 33);
/**
 * Describes the message io.defang.v1.ListServicesResponse.
 * Use `create(ListServicesResponseSchema)` to create a new message.
 */
exports.ListServicesResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 34);
/**
 * Describes the message io.defang.v1.ProjectUpdate.
 * Use `create(ProjectUpdateSchema)` to create a new message.
 */
exports.ProjectUpdateSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 35);
/**
 * Describes the message io.defang.v1.ServiceID.
 * Use `create(ServiceIDSchema)` to create a new message.
 */
exports.ServiceIDSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 36);
/**
 * Describes the message io.defang.v1.Device.
 * Use `create(DeviceSchema)` to create a new message.
 * @deprecated
 */
exports.DeviceSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 37);
/**
 * Describes the message io.defang.v1.Resource.
 * Use `create(ResourceSchema)` to create a new message.
 * @deprecated
 */
exports.ResourceSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 38);
/**
 * Describes the message io.defang.v1.Resources.
 * Use `create(ResourcesSchema)` to create a new message.
 * @deprecated
 */
exports.ResourcesSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 39);
/**
 * Describes the message io.defang.v1.Deploy.
 * Use `create(DeploySchema)` to create a new message.
 * @deprecated
 */
exports.DeploySchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 40);
/**
 * Describes the message io.defang.v1.Port.
 * Use `create(PortSchema)` to create a new message.
 * @deprecated
 */
exports.PortSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 41);
/**
 * Describes the message io.defang.v1.Secret.
 * Use `create(SecretSchema)` to create a new message.
 * @deprecated
 */
exports.SecretSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 42);
/**
 * Describes the message io.defang.v1.Build.
 * Use `create(BuildSchema)` to create a new message.
 * @deprecated
 */
exports.BuildSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 43);
/**
 * Describes the message io.defang.v1.HealthCheck.
 * Use `create(HealthCheckSchema)` to create a new message.
 * @deprecated
 */
exports.HealthCheckSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 44);
/**
 * Describes the message io.defang.v1.Service.
 * Use `create(ServiceSchema)` to create a new message.
 * @deprecated
 */
exports.ServiceSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 45);
/**
 * Describes the message io.defang.v1.StaticFiles.
 * Use `create(StaticFilesSchema)` to create a new message.
 * @deprecated
 */
exports.StaticFilesSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 46);
/**
 * Describes the message io.defang.v1.Redis.
 * Use `create(RedisSchema)` to create a new message.
 * @deprecated
 */
exports.RedisSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 47);
/**
 * Describes the message io.defang.v1.Postgres.
 * Use `create(PostgresSchema)` to create a new message.
 * @deprecated
 */
exports.PostgresSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 48);
/**
 * Describes the message io.defang.v1.Event.
 * Use `create(EventSchema)` to create a new message.
 */
exports.EventSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 49);
/**
 * Describes the message io.defang.v1.PublishRequest.
 * Use `create(PublishRequestSchema)` to create a new message.
 */
exports.PublishRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 50);
/**
 * Describes the message io.defang.v1.SubscribeRequest.
 * Use `create(SubscribeRequestSchema)` to create a new message.
 */
exports.SubscribeRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 51);
/**
 * Describes the message io.defang.v1.SubscribeResponse.
 * Use `create(SubscribeResponseSchema)` to create a new message.
 */
exports.SubscribeResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 52);
/**
 * Describes the message io.defang.v1.DelegateSubdomainZoneRequest.
 * Use `create(DelegateSubdomainZoneRequestSchema)` to create a new message.
 */
exports.DelegateSubdomainZoneRequestSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 53);
/**
 * Describes the message io.defang.v1.DelegateSubdomainZoneResponse.
 * Use `create(DelegateSubdomainZoneResponseSchema)` to create a new message.
 */
exports.DelegateSubdomainZoneResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 54);
/**
 * Describes the message io.defang.v1.WhoAmIResponse.
 * Use `create(WhoAmIResponseSchema)` to create a new message.
 */
exports.WhoAmIResponseSchema = (0, codegenv1_1.messageDesc)(exports.file_fabric, 55);
/**
 * @generated from enum io.defang.v1.DeploymentMode
 */
var DeploymentMode;
(function (DeploymentMode) {
    /**
     * @generated from enum value: UNSPECIFIED_MODE = 0;
     */
    DeploymentMode[DeploymentMode["UNSPECIFIED_MODE"] = 0] = "UNSPECIFIED_MODE";
    /**
     * @generated from enum value: DEVELOPMENT = 1;
     */
    DeploymentMode[DeploymentMode["DEVELOPMENT"] = 1] = "DEVELOPMENT";
    /**
     * @generated from enum value: STAGING = 2;
     */
    DeploymentMode[DeploymentMode["STAGING"] = 2] = "STAGING";
    /**
     * @generated from enum value: PRODUCTION = 3;
     */
    DeploymentMode[DeploymentMode["PRODUCTION"] = 3] = "PRODUCTION";
})(DeploymentMode = exports.DeploymentMode || (exports.DeploymentMode = {}));
/**
 * Describes the enum io.defang.v1.DeploymentMode.
 */
exports.DeploymentModeSchema = (0, codegenv1_1.enumDesc)(exports.file_fabric, 0);
/**
 * @generated from enum io.defang.v1.ServiceState
 */
var ServiceState;
(function (ServiceState) {
    /**
     * @generated from enum value: NOT_SPECIFIED = 0;
     */
    ServiceState[ServiceState["NOT_SPECIFIED"] = 0] = "NOT_SPECIFIED";
    /**
     * Build states
     *
     * initial state for build
     *
     * @generated from enum value: BUILD_QUEUED = 1;
     */
    ServiceState[ServiceState["BUILD_QUEUED"] = 1] = "BUILD_QUEUED";
    /**
     * @generated from enum value: BUILD_PROVISIONING = 2;
     */
    ServiceState[ServiceState["BUILD_PROVISIONING"] = 2] = "BUILD_PROVISIONING";
    /**
     * @generated from enum value: BUILD_PENDING = 3;
     */
    ServiceState[ServiceState["BUILD_PENDING"] = 3] = "BUILD_PENDING";
    /**
     * @generated from enum value: BUILD_ACTIVATING = 4;
     */
    ServiceState[ServiceState["BUILD_ACTIVATING"] = 4] = "BUILD_ACTIVATING";
    /**
     * @generated from enum value: BUILD_RUNNING = 5;
     */
    ServiceState[ServiceState["BUILD_RUNNING"] = 5] = "BUILD_RUNNING";
    /**
     * @generated from enum value: BUILD_STOPPING = 6;
     */
    ServiceState[ServiceState["BUILD_STOPPING"] = 6] = "BUILD_STOPPING";
    /**
     * initial state for existing image
     *
     * @generated from enum value: UPDATE_QUEUED = 7;
     */
    ServiceState[ServiceState["UPDATE_QUEUED"] = 7] = "UPDATE_QUEUED";
    /**
     * Deployment states
     *
     * @generated from enum value: DEPLOYMENT_PENDING = 8;
     */
    ServiceState[ServiceState["DEPLOYMENT_PENDING"] = 8] = "DEPLOYMENT_PENDING";
    /**
     * @generated from enum value: DEPLOYMENT_COMPLETED = 9;
     */
    ServiceState[ServiceState["DEPLOYMENT_COMPLETED"] = 9] = "DEPLOYMENT_COMPLETED";
    /**
     * @generated from enum value: DEPLOYMENT_FAILED = 10;
     */
    ServiceState[ServiceState["DEPLOYMENT_FAILED"] = 10] = "DEPLOYMENT_FAILED";
    /**
     * @generated from enum value: BUILD_FAILED = 11;
     */
    ServiceState[ServiceState["BUILD_FAILED"] = 11] = "BUILD_FAILED";
})(ServiceState = exports.ServiceState || (exports.ServiceState = {}));
/**
 * Describes the enum io.defang.v1.ServiceState.
 */
exports.ServiceStateSchema = (0, codegenv1_1.enumDesc)(exports.file_fabric, 1);
/**
 * @generated from enum io.defang.v1.ConfigType
 */
var ConfigType;
(function (ConfigType) {
    /**
     * @generated from enum value: CONFIGTYPE_UNSPECIFIED = 0;
     */
    ConfigType[ConfigType["CONFIGTYPE_UNSPECIFIED"] = 0] = "CONFIGTYPE_UNSPECIFIED";
    /**
     * @generated from enum value: CONFIGTYPE_SENSITIVE = 1;
     */
    ConfigType[ConfigType["CONFIGTYPE_SENSITIVE"] = 1] = "CONFIGTYPE_SENSITIVE";
})(ConfigType = exports.ConfigType || (exports.ConfigType = {}));
/**
 * Describes the enum io.defang.v1.ConfigType.
 */
exports.ConfigTypeSchema = (0, codegenv1_1.enumDesc)(exports.file_fabric, 2);
/**
 * @generated from enum io.defang.v1.Platform
 * @deprecated
 */
var Platform;
(function (Platform) {
    /**
     * @generated from enum value: LINUX_AMD64 = 0;
     */
    Platform[Platform["LINUX_AMD64"] = 0] = "LINUX_AMD64";
    /**
     * @generated from enum value: LINUX_ARM64 = 1;
     */
    Platform[Platform["LINUX_ARM64"] = 1] = "LINUX_ARM64";
    /**
     * @generated from enum value: LINUX_ANY = 2;
     */
    Platform[Platform["LINUX_ANY"] = 2] = "LINUX_ANY";
})(Platform = exports.Platform || (exports.Platform = {}));
/**
 * Describes the enum io.defang.v1.Platform.
 * @deprecated
 */
exports.PlatformSchema = (0, codegenv1_1.enumDesc)(exports.file_fabric, 3);
/**
 * @generated from enum io.defang.v1.Protocol
 * @deprecated
 */
var Protocol;
(function (Protocol) {
    /**
     * unspecified means any protocol
     *
     * @generated from enum value: ANY = 0;
     */
    Protocol[Protocol["ANY"] = 0] = "ANY";
    /**
     * @generated from enum value: UDP = 1;
     */
    Protocol[Protocol["UDP"] = 1] = "UDP";
    /**
     * @generated from enum value: TCP = 2;
     */
    Protocol[Protocol["TCP"] = 2] = "TCP";
    /**
     * @generated from enum value: HTTP = 3;
     */
    Protocol[Protocol["HTTP"] = 3] = "HTTP";
    /**
     * @generated from enum value: HTTP2 = 4;
     */
    Protocol[Protocol["HTTP2"] = 4] = "HTTP2";
    /**
     * HTTP/2 with gRPC health checks
     *
     * @generated from enum value: GRPC = 5;
     */
    Protocol[Protocol["GRPC"] = 5] = "GRPC";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
/**
 * Describes the enum io.defang.v1.Protocol.
 * @deprecated
 */
exports.ProtocolSchema = (0, codegenv1_1.enumDesc)(exports.file_fabric, 4);
/**
 * @generated from enum io.defang.v1.Mode
 * @deprecated
 */
var Mode;
(function (Mode) {
    /**
     * no load-balancer; suitable for internal services and functions
     *
     * @generated from enum value: HOST = 0;
     */
    Mode[Mode["HOST"] = 0] = "HOST";
    /**
     * with load-balancer; suitable for public services
     *
     * @generated from enum value: INGRESS = 1;
     */
    Mode[Mode["INGRESS"] = 1] = "INGRESS";
})(Mode = exports.Mode || (exports.Mode = {}));
/**
 * Describes the enum io.defang.v1.Mode.
 * @deprecated
 */
exports.ModeSchema = (0, codegenv1_1.enumDesc)(exports.file_fabric, 5);
/**
 * @generated from enum io.defang.v1.Network
 * @deprecated
 */
var Network;
(function (Network) {
    /**
     * was: internal=false
     *
     * @generated from enum value: UNSPECIFIED = 0;
     */
    Network[Network["UNSPECIFIED"] = 0] = "UNSPECIFIED";
    /**
     * was: internal=true
     *
     * @generated from enum value: PRIVATE = 1;
     */
    Network[Network["PRIVATE"] = 1] = "PRIVATE";
    /**
     * @generated from enum value: PUBLIC = 2;
     */
    Network[Network["PUBLIC"] = 2] = "PUBLIC";
})(Network = exports.Network || (exports.Network = {}));
/**
 * Describes the enum io.defang.v1.Network.
 * @deprecated
 */
exports.NetworkSchema = (0, codegenv1_1.enumDesc)(exports.file_fabric, 6);
/**
 * @generated from service io.defang.v1.FabricController
 */
exports.FabricController = (0, codegenv1_1.serviceDesc)(exports.file_fabric, 0);

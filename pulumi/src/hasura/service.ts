import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { service as apiService } from '../api/service';
import { config } from '../common/config';
import { SERVICE_NAME, SERVICE_ROOT_PATH } from './constants';
import { hasuraDatabaseUri } from './database';

const heimdallJwksEndpoint = config.require("heimdallJwksEndpoint"); // TODO: should be heimdallService.endpoints[1] but circular dependency

export const service: DefangService = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    build: {
        context: SERVICE_ROOT_PATH,
    },
    ports: [{target: 8080, protocol: 'http', mode: 'host'}],
    environment: {
        HASURA_GRAPHQL_DATABASE_URL: pulumi.interpolate`${hasuraDatabaseUri}?sslmode=require`,
        HASURA_GRAPHQL_ENABLE_CONSOLE: 'false',
        HASURA_GRAPHQL_UNAUTHORIZED_ROLE: 'public',
        HASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS: 'false',
        HASURA_GRAPHQL_METADATA_DIR: '/project/metadata',
        HASURA_GRAPHQL_MIGRATIONS_DIR: '/project/migrations',
        HASURA_GRAPHQL_ENABLE_REMOTE_SCHEMA_PERMISSIONS: 'true',
        DEFANG_FN_ENDPOINT: pulumi.interpolate`http://${apiService.endpoints[0]}`,
        HASURA_GRAPHQL_EXPERIMENTAL_FEATURES: 'naming_convention',
        HASURA_GRAPHQL_JWT_SECRET: pulumi.interpolate`{"jwk_url":"${heimdallJwksEndpoint}"}`, // TODO: use pulumi.jsonStringify
    },
    secrets: [{source: "HASURA_GRAPHQL_ADMIN_SECRET", value: config.requireSecret("hasuraAdminSecret")}],
    platform: 'linux/arm64',
    healthcheck: {
        test: ['CMD', 'curl', '-f', 'http://localhost:8080/healthz']
    },
}, {dependsOn: [apiService]});

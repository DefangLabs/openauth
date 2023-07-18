import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { service as apiService } from '../api/service';
import { dockerHubToken } from '../common/config';
import { SERVICE_NAME } from './constants';
import { hasuraDatabaseUri } from './database';
import { image } from './image';
import { ROOT_URL } from '../common/constants';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.imageName}`;

export const service = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    ports: [{target: 8080, protocol: 'http', mode: 'ingress'}],
    environment: {
        HASURA_GRAPHQL_DATABASE_URL: pulumi.interpolate`${hasuraDatabaseUri}?sslmode=require`,
        HASURA_GRAPHQL_ENABLE_CONSOLE: 'false',
        HASURA_GRAPHQL_UNAUTHORIZED_ROLE: 'public',
        HASURA_GRAPHQL_ADMIN_SECRET: 'fqhri9a!EpxB2tN8cVm@cE@DJ',
        HASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS: 'false',
        HASURA_GRAPHQL_METADATA_DIR: '/project/metadata',
        HASURA_GRAPHQL_MIGRATIONS_DIR: '/project/migrations',
        HASURA_GRAPHQL_ENABLE_REMOTE_SCHEMA_PERMISSIONS: 'true',
        DEFANG_FN_ENDPOINT: pulumi.interpolate`https://${apiService.endpoints?.[0]}`,
        HASURA_GRAPHQL_EXPERIMENTAL_FEATURES: 'naming_convention',
        HASURA_GRAPHQL_JWT_SECRET: `{"jwk_url":"${ROOT_URL.replace('--4455', '')}/.well-known/jwks"}`,
    },
    platform: 'linux/arm64',
    healthcheck: {
        test: ['CMD', 'curl', 'http://localhost:8080/healthz']
    }
}, {dependsOn: [image, apiService]});

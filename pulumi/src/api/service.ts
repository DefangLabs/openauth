import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { SERVICE_NAME, SERVICE_ROOT_PATH } from './constants';
import { config } from '../common/config';

export const service: DefangService = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    build: {
        context: SERVICE_ROOT_PATH,
        args: {
            APP: 'api',
        },
    },
    ports: [{target: 8001, protocol: 'http', mode: 'host'}],
    environment: {
        DEFANG_FABRIC: config.require('fabric'),
        JWKS_ENDPOINT: config.require("heimdallJwksEndpoint"), // i.e. http://heimdall:4456/.well-known/jwks
        KRATOS_DOMAIN: config.require("kratosDomain"), // i.e. kratos:4433
        HASURA_DOMAIN: config.require("hasuraDomain"), // i.e. hasura:8080
    },
    platform: 'linux/arm64',
    healthcheck: {
        test: ['CMD', 'wget', '--spider', 'http://localhost:8001/']
    },
});

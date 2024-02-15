import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { service as apiService } from '../api/service';
import { config } from '../common/config';
import { ROOT_URL } from '../common/constants';
import { service as hasuraService } from '../hasura/service';
import { service as kratosService } from '../kratos/service';
import { service as webService } from '../web/service';
import { SERVICE_NAME, SERVICE_ROOT_PATH } from './constants';

const hasuraDomain = hasuraService.endpoints[0];
const fnDomain = apiService.endpoints[0];
const nextjsDomain = webService.endpoints[0];
const kratosDomain = kratosService.endpoints[0];

export const service: DefangService = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    build: {
        context: SERVICE_ROOT_PATH,
        args: {
            ENV: pulumi.getStack(),
            PUBLIC_ROOT_URL: ROOT_URL,
            HASURA_DOMAIN: hasuraDomain,
            FN_DOMAIN: fnDomain,
            NEXTJS_DOMAIN: nextjsDomain,
            KRATOS_DOMAIN: kratosDomain,
        },
    },
    domainname: config.get("domainname"),
    // deploy: {
    //     resources: {
    //         reservations: {memory: 1024}
    //     }
    // },
    ports: [
        {target: 4455, protocol: 'http', mode: 'ingress'},
        {target: 4457, protocol: 'http', mode: 'ingress'},
    ],
    environment: {
        RULES_FILE_PATH: '/heimdall/conf/rules/rules.yaml',
        KEYSTORE_FILE_PATH: '/heimdall/conf/keys/keystore.pem',
    },
    platform: 'linux/arm64',
    healthcheck: {
        test: ['CMD', 'curl', '-f', 'http://localhost:4457/.well-known/health']
    }
}, {dependsOn: [kratosService]});

// new DefangService('echo', {
//     name: `echo-${pulumi.getStack()}`,
//     image: 'ealen/echo-server',
//     ports: [
//         {target: 8080, protocol: 'http', mode: 'ingress'},
//     ],
//     environment: {
//         PORT: '8080',
//     },
//     platform: 'linux/arm64',
// });
import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { config, dockerHubToken } from '../common/config';
import { service as kratosService } from '../kratos/service';
import { SERVICE_NAME } from './constants';
import { image } from './image';
import { ROOT_URL } from '../common/constants';

const authenticatedImageName: pulumi.Output<string> = pulumi.interpolate`defangportal:${dockerHubToken}@${image.repoDigest}`;

export const service: DefangService = new DefangService(SERVICE_NAME, {
    forceNewDeployment: true,
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
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
        test: ['CMD', 'curl', 'http://localhost:4457/.well-known/health']
    }
}, {dependsOn: [image, kratosService]});

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
import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { dockerHubToken } from '../common/config';
import { service as kratosService } from '../kratos/service';
import { SERVICE_NAME, SERVICE_ROOT_PATH } from './constants';
import { image } from './image';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.imageName}`;

export const service = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    ports: [{target: 4455, protocol: 'http', mode: 'ingress'}],
    environment: {
        RULES_FILE_PATH: '/heimdall/conf/rules/rules.yaml',
        KEYSTORE_FILE_PATH: '/heimdall/conf/keys/keystore.pem',
        RULES_MECHANISMS_AUTHENTICATORS_2_CONFIG_IDENTITY_INFO_ENDPOINT: pulumi.interpolate`https://${kratosService.fqdn}/sessions/whoami`
    },
    platform: 'linux/arm64',
}, {dependsOn: [image, kratosService]});

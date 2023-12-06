import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { dockerHubToken } from '../common/config';
import { SERVICE_NAME } from './constants';
import { image } from './image';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.repoDigest}`;

export const service: DefangService = new DefangService(SERVICE_NAME, {
    forceNewDeployment: true,
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    environment: { PORT: '3000' },
    ports: [{target: 3000, protocol: 'http', mode: 'host'}],
    healthcheck: {
        test: ['CMD', 'curl', 'http://localhost:3000/']
    },
    platform: 'linux/arm64',
}, {dependsOn: image});
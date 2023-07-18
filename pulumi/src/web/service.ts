import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { dockerHubToken } from '../common/config';
import { SERVICE_NAME } from './constants';
import { image } from './image';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.imageName}`;

export const service = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    ports: [{target: 3000, protocol: 'http', mode: 'ingress'}],
    healthcheck: {
        test: ['CMD', 'curl', 'http://localhost:3000/']
    },
    platform: 'linux/arm64',
}, {dependsOn: image});
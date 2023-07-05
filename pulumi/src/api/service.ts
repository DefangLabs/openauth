import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { SERVICE_NAME } from './constants';
import { dockerHubToken } from '../common/config';
import {image} from './image';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.imageName}`;

export const service = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    ports: [{target: 5001, protocol: 'http', mode: 'ingress'}],
    platform: 'linux/arm64',
    healthcheck: {
        test: ['HTTP', '/']
    }
}, {dependsOn: image});
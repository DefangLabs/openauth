import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { SERVICE_NAME } from './constants';
import { config, dockerHubToken } from '../common/config';
import {image} from './image';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.repoDigest}`;

export const service: DefangService = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    ports: [{target: 5001, protocol: 'http', mode: 'host'}],
    environment: {
        DEFANG_FABRIC: config.require('fabric'),
    },
    platform: 'linux/arm64',
    healthcheck: {
        test: ['CMD', 'curl', 'http://localhost:5001/']
    },
}, {dependsOn: image});
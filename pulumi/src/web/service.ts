import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { SERVICE_NAME } from './constants';
import { config, dockerHubToken } from '../common/config';
import {image} from './image';
import { ROOT_URL } from '../common/constants';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.imageName}`;

export const service = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    ports: [{target: 3000, protocol: 'http', mode: 'ingress'}],
    environment: {
        PORT: '3000',
        NEXT_PUBLIC_KRATOS_PUBLIC_URL: `${ROOT_URL}/svc/kratos`,
        NEXT_PUBLIC_GRAPHQL_URL: `${ROOT_URL}/svc/hasura/v1/graphql`,
        NEXT_PUBLIC_FN_URL: `${ROOT_URL}/svc/fn`,
        NEXT_PUBLIC_FABRIC: `https://${config.require('fabric')}`,
    },
    healthcheck: {
        test: ['CMD', 'curl', 'http://localhost:3000/']
    },
    platform: 'linux/arm64',
}, {dependsOn: image});
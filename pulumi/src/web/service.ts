import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { dockerHubToken } from '../common/config';
import { SERVICE_NAME } from './constants';
import { image } from './image';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.repoDigest}`;

export const service: DefangService = new DefangService(SERVICE_NAME, {
    forceNewDeployment: true,
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName, // FIXME: Kaniko build fails
    // build: {
    //     context: SERVICE_ROOT_PATH,
    //     platform: 'linux/arm64',
    //     args: {
    //         NEXT_PUBLIC_KRATOS_PUBLIC_URL: `${ROOT_URL}/svc/kratos`,
    //         NEXT_PUBLIC_GRAPHQL_URL: `${ROOT_URL}/svc/hasura/v1/graphql`,
    //         NEXT_PUBLIC_FN_URL: `${ROOT_URL}/svc/fn`,
    //         NEXT_PUBLIC_FABRIC: `https://${config.require('fabric')}`,
    //     }
    // },
    environment: { PORT: '3000' },
    ports: [{target: 3000, protocol: 'http', mode: 'host'}],
    healthcheck: {
        test: ['CMD', 'curl', 'http://localhost:3000/']
    },
    platform: 'linux/arm64',
}, {dependsOn: image});
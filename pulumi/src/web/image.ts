import * as docker from '@pulumi/docker';
import * as pulumi from '@pulumi/pulumi';
import { config, dockerHubToken } from '../common/config';
import { DOCKER_HUB_USERNAME, ROOT_URL } from '../common/constants';
import { SERVICE_NAME, SERVICE_ROOT_PATH } from './constants';

const imageName = `docker.io/defangportal/${SERVICE_NAME}:${pulumi.getStack()}-${Math.floor(+new Date() / 1000)}`;

export const image = new docker.Image(SERVICE_NAME, {
    imageName,
    build: {
        context: SERVICE_ROOT_PATH,
        platform: 'linux/arm64',
        args: {
            NEXT_PUBLIC_KRATOS_PUBLIC_URL: `${ROOT_URL}/svc/kratos`,
            NEXT_PUBLIC_GRAPHQL_URL: `${ROOT_URL}/svc/hasura/v1/graphql`,
            NEXT_PUBLIC_FN_URL: `${ROOT_URL}/svc/fn`,
            NEXT_PUBLIC_FABRIC: `https://${config.require('fabric')}`,
        }
    },
    registry: {
        server: 'docker.io',
        username: DOCKER_HUB_USERNAME,
        password: dockerHubToken,
    },
});

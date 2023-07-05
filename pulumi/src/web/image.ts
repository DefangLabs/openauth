import * as docker from '@pulumi/docker';
import * as pulumi from '@pulumi/pulumi';
import { dockerHubToken } from '../common/config';
import { DOCKER_HUB_USERNAME } from '../common/constants';
import { SERVICE_NAME, SERVICE_ROOT_PATH } from './constants';

const imageName = `docker.io/defangportal/${SERVICE_NAME}:${pulumi.getStack()}-${Math.floor(+new Date() / 1000)}`;

export const image = new docker.Image(SERVICE_NAME, {
    imageName,
    build: {
        context: SERVICE_ROOT_PATH,
        platform: 'linux/arm64',
    },
    registry: {
        server: 'docker.io',
        username: DOCKER_HUB_USERNAME,
        password: dockerHubToken,
    },
});

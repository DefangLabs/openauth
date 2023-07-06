import * as docker from '@pulumi/docker';
import * as pulumi from '@pulumi/pulumi';
import { dockerHubToken } from '../common/config';
import { SERVICE_NAME, SERVICE_ROOT_PATH } from './constants';
import { DOCKER_HUB_USERNAME, ROOT_URL } from '../common/constants';
import {service as webService} from '../web/service';
import {service as apiService} from '../api/service';
import {service as kratosService} from '../kratos/service';
import {service as hasuraService} from '../hasura/service';

const imageName = `docker.io/defangportal/${SERVICE_NAME}:${pulumi.getStack()}-${Math.floor(+new Date() / 1000)}`;

const hasuraDomain = pulumi.runtime.isDryRun() ? '' : pulumi.interpolate`https://${hasuraService.fqdn}`;
const fnDomain = pulumi.runtime.isDryRun() ? '' : pulumi.interpolate`https://${apiService.fqdn}`;
const nextjsDomain = pulumi.runtime.isDryRun() ? '' : pulumi.interpolate`https://${webService.fqdn}`;

export const image = new docker.Image(SERVICE_NAME, {
    imageName,
    build: {
        context: SERVICE_ROOT_PATH,
        platform: 'linux/arm64',
        args: {
            ENV: pulumi.getStack(),
            PUBLIC_ROOT_URL: ROOT_URL,
            HASURA_DOMAIN: hasuraDomain,
            FN_DOMAIN: fnDomain,
            NEXTJS_DOMAIN: nextjsDomain,
        },
    },
    registry: {
        server: 'docker.io',
        username: DOCKER_HUB_USERNAME,
        password: dockerHubToken,
    },
}, {
    dependsOn: [
        webService,
        apiService,
        kratosService,
        hasuraService,
    ],
});

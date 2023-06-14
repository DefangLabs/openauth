import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { dockerHubToken } from '../common/config';
import { SERVICE_NAME } from './constants';
import { kratosDatabase, kratosDatabaseUri, kratosUser } from './database';
import { image } from './image';
import { migrationJob } from './migration';

const authenticatedImageName = pulumi.interpolate`defangportal:${dockerHubToken}@${image.imageName}`;

export const service = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    image: authenticatedImageName,
    ports: [{target: 8080, protocol: 'http'}],
    platform: 'linux/arm64',
    environment: {
        DSN: pulumi.interpolate`${kratosDatabaseUri}?sslmode=require&max_conns=5&max_idle_conns=2`
    },
}, {dependsOn: [image, migrationJob, kratosDatabase, kratosUser]});
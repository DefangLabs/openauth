import * as pulumi from '@pulumi/pulumi';

export const config = new pulumi.Config();

export const dockerHubToken = config.requireSecret('dockerHubToken');

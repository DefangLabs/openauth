import { DefangService } from '@defang-io/pulumi-defang/lib';
import * as pulumi from '@pulumi/pulumi';
import { SERVICE_NAME, SERVICE_ROOT_PATH } from './constants';
import { config } from '../common/config';

export const service: DefangService = new DefangService(SERVICE_NAME, {
    name: `${SERVICE_NAME}-${pulumi.getStack()}`,
    build: {
        context: SERVICE_ROOT_PATH,
        args: {
            APP: 'api',
        },
    },
    ports: [{target: 5001, protocol: 'http', mode: 'host'}],
    environment: {
        DEFANG_FABRIC: config.require('fabric'),
    },
    platform: 'linux/arm64',
    healthcheck: {
        test: ['CMD', 'curl', 'http://localhost:5001/']
    },
});
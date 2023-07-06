import * as path from "path";
import { config } from "./config";

export const PROJECT_ROOT_PATH = path.resolve(__dirname, '../../../');

export const DOCKER_HUB_USERNAME = 'defangportal';

export const ROOT_URL = config.require('rootUrl');

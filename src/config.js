import * as localConfig from 'local_config';

// 生产环境
const isProduction = process.env.NODE_ENV === 'production';
// 测试环境
const isTest = process.env.NODE_ENV === 'test';
// 开发环境
const isDev = process.env.NODE_ENV === 'development';
// 单元测试
const isUnitTest = process.env.NODE_ENV === 'localTest';

let serverUrl;
let ssoUrl;
switch (true) {
  case isProduction:
    serverUrl = 'http://api.owl.burnish.cn/';
    ssoUrl = 'http://sso.burnish.cn';
    break;
  case isTest:
    serverUrl = 'http://test.api.owl.burnish.cn/';
    ssoUrl = 'http://test.sso.burnish.cn';
    break;
  case isDev || isUnitTest:
    serverUrl = 'http://localhost:8888/';
    ssoUrl = 'http://test.sso.burnish.cn';
    break;
  default:
    break;
}

export const SERVER_URL = localConfig.SERVER_URL || serverUrl;
export const DEBUG = !!isDev || !!isUnitTest;
export const SSO_URL = localConfig.SSO_URL || ssoUrl;


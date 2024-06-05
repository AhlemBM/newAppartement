export const ENVIRONMENT = process.env.APP_ENV || 'development';
export const APP_PORT = process.env.PORT || 3000;

export const CLIENT_URL =
  process.env.CLIENT_URL || `http://localhost:${APP_PORT}/`;
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_TEST = ENVIRONMENT === 'test';

export const APP_PREFIX_PATH = process.env.APP_PREFIX_PATH || '/api';
export const JWT_SECRET = process.env.JWT_SECRET || 'dev';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1d';
export const PER_PAGE_DEFAULT = process.env.PER_PAGE_DEFAULT || '5';

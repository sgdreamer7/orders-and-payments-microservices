const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;
import { ORM_CONFIG } from './orm.config';

export {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  ORM_CONFIG,
};

export const DELAY_FOR_DELIVERY = 5000;
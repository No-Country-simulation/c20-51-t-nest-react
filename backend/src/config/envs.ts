import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  PORT: number;
  HOSTDB: string;
  PORTDB: number;
  USERDB: string;
  PASSDB: string;
  DATABASE: string;
  JWT_SECRET: string;
  STRIPE_SECRET: string;
  INTERNAL_API_SUCESS: string;
  INTERNAL_API_CANCEL: string;
  CANCEL_URL: string;
  SUCESS_URL: string;
}
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    HOSTDB: joi.string().required(),
    PORTDB: joi.number().required(),
    USERDB: joi.string().required(),
    PASSDB: joi.string().required(),
    DATABASE: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    STRIPE_SECRET: joi.string().required(),
    INTERNAL_API_SUCESS: joi.string().required(),
    INTERNAL_API_CANCEL: joi.string().required(),
    CANCEL_URL: joi.string().required(),
    SUCESS_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = value as Env;

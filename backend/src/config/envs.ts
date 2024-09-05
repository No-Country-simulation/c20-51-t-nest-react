import 'dotenv/config';
import * as joi from 'joi';

interface Env {
  PORT: number;
  HOSTDB: string;
  PORTDB: number;
  USERDB: string;
  PASSDB: string;
  DATABASE: string;
}
const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    HOSTDB: joi.string().required(),
    PORTDB: joi.number().required(),
    USERDB: joi.string().required(),
    PASSDB: joi.string().required(),
    DATABASE: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const envs = value as Env;

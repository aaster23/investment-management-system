import * as Joi from 'joi';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { DatabaseType } from 'typeorm';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string = null) {
    let config;
    if (filePath) {
      config = dotenv.parse(fs.readFileSync(filePath));
    } else {
      config = dotenv.config().parsed;
    }
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test', 'provision'])
        .default('development'),
      PORT: Joi.number().default(5500),
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRE: Joi.number().default(3600 * 24 * 7),
      DB_TYPE: Joi.string().default('mysql'),
      DB_HOST: Joi.string().default('localhost'),
      DB_PORT: Joi.number().default(3306),
      DB_USERNAME: Joi.string().default('root'),
      DB_PASSWORD: Joi.string().default('6969'),
      DB_DATABASE_NAME: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  public get port(): number {
    return +this.envConfig.PORT;
  }

  public get jwtSecret(): string {
    return this.envConfig.JWT_SECRET;
  }

  public get jwtExpireTime(): number {
    return +this.envConfig.JWT_EXPIRE;
  }

  public get dbHost(): string {
    return this.envConfig.DB_HOST;
  }

  public get dbPort(): number {
    return +this.envConfig.DB_PORT;
  }

  public get dbUsername(): string {
    return this.envConfig.DB_USERNAME;
  }

  public get dbPassword(): string {
    return this.envConfig.DB_PASSWORD;
  }

  public get dbName(): string {
    return this.envConfig.DB_DATABASE_NAME;
  }

  public get dbType(): DatabaseType {
    return this.envConfig.DB_TYPE as DatabaseType;
  }
}

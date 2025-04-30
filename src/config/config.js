const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),

    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),

    COOKIE_EXPIRATION_HOURS: Joi.number()
      .default(24)
      .description("hours after which httpOnly cookie expire"),

    SQL_USERNAME: Joi.string().description("sqldb username"),
    SQL_HOST: Joi.string().description("sqldb host"),
    SQL_DATABASE_NAME: Joi.string().description("sqldb database name"),
    SQL_PASSWORD: Joi.string().description("sqldb password"),
    SQL_DIALECT: Joi.string().default("postgres").description("type of sqldb"),
    CLOUDINARY_CLOUD_NAME: Joi.string().description("cloudinary cloud name"),
    CLOUDINARY_API_KEY: Joi.string().description("cloudinary api key"),
    CLOUDINARY_API_SECRET: Joi.string().description("cloudinary api secret"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  cookie: {
    cookieExpirationHours: envVars.COOKIE_EXPIRATION_HOURS,
  },
  sqlDB: {
    user: envVars.SQL_USERNAME,
    host: envVars.SQL_HOST,
    database: envVars.SQL_DATABASE_NAME,
    password: envVars.SQL_PASSWORD,
    dialect: envVars.SQL_DIALECT,
  },
  cloudinaryCloudName: envVars.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: envVars.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: envVars.CLOUDINARY_API_SECRET,
};

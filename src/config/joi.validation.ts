import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    PORT: Joi.number().default(3001),
    DATABASE_NAME: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    NODE_ENV: Joi.string().valid('dev', 'prod', 'test').default('dev'),
});

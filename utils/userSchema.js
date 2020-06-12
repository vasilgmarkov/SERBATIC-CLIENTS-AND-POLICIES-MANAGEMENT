const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});
exports.validateUser = (user) => userSchema.validate(user);

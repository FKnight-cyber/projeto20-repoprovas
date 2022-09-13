import joi from "joi";

const authSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPass: joi.any().valid(joi.ref('password')).required().label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
});

export default authSchema;

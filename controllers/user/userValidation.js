import joi from 'joi';

const userRegex = joi.object({
    name : joi.string().min(3).max(256).required(),
    lastName: joi.string().min(3).max(256).required(),
    username: joi.string().min(6).max(16).required(),
    password: joi.string().min(6).max(16).required(),
 })

 const loginRegex = joi.object({
    username: joi.string().max(16).required(),
    password: joi.string().max(256).required()
 });

 export { userRegex, loginRegex }
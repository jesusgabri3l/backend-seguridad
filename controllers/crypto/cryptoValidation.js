import joi from "joi";

const cipherRegex = joi.object({
    text: joi.string().min(1).required(),
    key: joi.string().min(5).required(),
});

const decipherRegex = joi.object({
    text: joi.string().min(16).required(),
    key: joi.string().min(5).required(),
});

export { cipherRegex, decipherRegex };

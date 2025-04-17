import joi from 'joi';
import { isValidId } from '../../middlewares/validation.middleware.js';
export const sendMessage = joi
    .object({
    content :joi.string().required(),
    // receiver: joi.string().hex.length(24).required(),
    receiver: joi.custom(isValidId)
    .required(),
    sender :joi.custom(isValidId)
    .optional(),

})
.required();

export const deleteMessage = joi
    .object({
    id :joi.custom(isValidId).required()

})
.required();
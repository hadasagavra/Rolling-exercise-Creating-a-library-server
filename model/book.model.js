import Joi from 'joi';

export const validateBook={

    borrowParams: Joi.object({
    code: Joi.string().pattern(/^B\d{3}$/).required()
}),

borrowBody: Joi.object({
    user: Joi.object({
        code: Joi.string().pattern(/^U\d{3}$/).required()
    }).required()
})
}
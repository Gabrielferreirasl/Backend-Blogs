const Joi = require('joi');

module.exports = (req, res, next) => {
    const { email, password } = req.body;

    const { error } = Joi.object({
        email: Joi.string().not().empty()
        .required(),
        password: Joi.string().not().empty()
        .required(),
    })
    .validate({ email, password });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};
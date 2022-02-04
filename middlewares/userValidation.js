const Joi = require('joi');

module.exports = (req, res, next) => {
    const { displayName, email, password } = req.body;

    const { error } = Joi.object({
        displayName: Joi.string().min(8).not().empty()
        .required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
        password: Joi.string().length(6).not().empty()
        .required(),
    })
    .validate({ displayName, email, password });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};
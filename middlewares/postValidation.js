const Joi = require('joi');

module.exports = (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    const { error } = Joi.object({
        title: Joi.string().not().empty()
        .required(),
        content: Joi.string().not().empty()
        .required(),
        categoryIds: Joi.array().items(Joi.number())
        .required(),
    })
    .validate({ title, content, categoryIds });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};
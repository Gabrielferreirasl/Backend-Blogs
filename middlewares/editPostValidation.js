const Joi = require('joi');

module.exports = (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    if (categoryIds) {
        return res.status(400).json({ message: 'Categories cannot be edited' });
    }

    const { error } = Joi.object({
        title: Joi.string().not().empty()
        .required(),
        content: Joi.string().not().empty()
        .required(),
    })
    .validate({ title, content });

    if (error) {
        console.log(error.details[0].message);
        return res.status(400).json({ message: error.details[0].message });
    }
    
    next();
};
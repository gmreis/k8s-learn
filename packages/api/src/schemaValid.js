let Joi = require('joi')

const schema = Joi.object().keys({
  id: Joi.string().required(),
  url: Joi.string().required().uri(),
  images: Joi.array().items(Joi.string().required().uri())
});

module.exports = function (req, res, next) {
  Joi.validate(req.body, schema, (err) => {
    if (err) {
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        body: req.body,
        err: err.details
      })
    } else {
      next();
    }
  });
}

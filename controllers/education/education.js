const Joi = require('joi');
const { Education } = require('../../models');
const respond = require('../../utils/respond');

const getEducations = async (req, res) => {
  try {
    const educations = await Education.findAll();

    return res.status(200).json({ educations });
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const createValidation = Joi.object({
  name: Joi.string().required(),
  from: Joi.date().required(),
  to: Joi.date(),
  present: Joi.boolean().truthy('y').falsy('n'),
});

const createEducation = async (req, res) => {
  const { error, value: body } = createValidation.validate(req.body);

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  try {
    const education = await Education.create(body);

    return res.status(200).json(respond(200, 'Create education successfuly', education));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = { getEducations, createEducation };

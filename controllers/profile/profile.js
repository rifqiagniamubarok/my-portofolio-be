const Joi = require('joi');
const { Profile } = require('../../models');
const respond = require('../../utils/respond');

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ attributes: ['name', 'about', 'picture', 'resume', 'open_to_work'] });

    return res.json(respond(200, 'Get profile succesfuly', profile));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const updateValidation = Joi.object({
  name: Joi.string(),
  about: Joi.string(),
  picture: Joi.number(),
  resume: Joi.string(),
  open_to_work: Joi.boolean().truthy('y').falsy('n'),
});

const updateProfile = async (req, res) => {
  const { error, value: body } = updateValidation.validate(req.body);

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  bodyKeyLenght = Object.keys(body).length;
  if (bodyKeyLenght < 1) return res.status(400).json(respond(400, 'No body found', ''));
  try {
    const profile = await Profile.findByPk(1);

    for (const [key, value] of Object.entries(body)) {
      profile[key] = value;
    }

    await profile.save();

    const { name, about, picture, resume, open_to_work } = profile;

    const response = {
      name,
      about,
      picture,
      resume,
      open_to_work,
    };

    res.status(200).json(respond(200, 'Update profile successfuly', response));
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { getProfile, updateProfile };

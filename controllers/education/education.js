const Joi = require('joi');
const { Education, Education_Experience } = require('../../models');
const respond = require('../../utils/respond');

const getEducations = async (req, res) => {
  try {
    const educations = await Education.findAll();
    const id_educations = educations.map((education) => education.id);
    const experiences = await Education_Experience.findAll({ where: { education_id: id_educations } });

    const response = educations.map(({ dataValues: education }) => {
      return {
        ...education,
        experiences: experiences.filter((experience) => experience.education_id === education.id),
      };
    });

    return res.status(200).json(respond(200, 'Get educations successfuly', response));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const getDetailEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const education = await Education.findByPk(id, { include: 'experiences' });

    if (!education) {
      throw new Error('Education not found');
    }

    return res.status(200).json(respond(200, 'Get detail education successfult', education));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const createValidation = Joi.object({
  name: Joi.string().required(),
  from: Joi.date().required(),
  to: Joi.date(),
  present: Joi.boolean().truthy('y').falsy('n'),
  experience: Joi.array().items(Joi.string()),
});

const createEducation = async (req, res) => {
  const { error, value: body } = createValidation.validate(req.body);

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  let payloadEducation = {};

  for (let [key, value] of Object.entries(body)) {
    if (key != 'experience') payloadEducation[key] = value;
  }

  try {
    const education = await Education.create(payloadEducation);
    let experience;
    if (body.experience) {
      let experiencePayload = body.experience.map((value) => {
        return {
          education_id: education.id,
          name: value,
        };
      });

      experience = await Education_Experience.bulkCreate(experiencePayload, { returning: true });
    }

    return res.status(200).json(respond(200, 'Create education successfuly', { ...education.dataValues, experience }));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const deleteEducation = async (req, res) => {
  const { id } = req.params;

  try {
    const education = await Education.findByPk(id);
    if (!education) {
      throw new Error('Education not found');
    }

    await Education_Experience.destroy({
      where: {
        education_id: id,
      },
    });

    await education.destroy();

    return res.status(200).json(respond(200, 'Success delete a education', ''));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const updateEducation = async (req, res) => {
  const { error, value: body } = createValidation.validate(req.body);
  const { id } = req.params;

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  try {
    const education = await Education.findByPk(id);

    if (!education) {
      throw new Error('Education not found');
    }

    for (let [key, value] of Object.entries(body)) {
      if (key != 'experience') education[key] = value;
    }

    let experience;
    if (body?.experience) {
      await Education_Experience.destroy({ where: { education_id: id } });

      let experiencePayload = body.experience.map((value) => {
        return {
          education_id: education.id,
          name: value,
        };
      });

      experience = await Education_Experience.bulkCreate(experiencePayload, { returning: true });
    } else {
      experience = await Education_Experience.findAll({ where: { education_id: id } });
    }

    await education.save();

    const response = { ...education.dataValues, experience };

    return res.status(200).json(respond(200, 'Education update successfuly', response));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = { getEducations, getDetailEducation, createEducation, deleteEducation, updateEducation };

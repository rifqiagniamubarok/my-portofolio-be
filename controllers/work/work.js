const Joi = require('joi');
const { Work, Work_Experience } = require('../../models');
const respond = require('../../utils/respond');

const getWorks = async (req, res) => {
  try {
    const works = await Work.findAll();
    const id_works = works.map((work) => work.id);
    const experiences = await Work_Experience.findAll({ where: { work_id: id_works } });

    const response = works.map(({ dataValues: work }) => {
      return {
        ...work,
        experiences: experiences.filter((experience) => experience.work_id === work.id),
      };
    });

    return res.status(200).json(respond(200, 'Get works successfuly', response));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const getDetailWork = async (req, res) => {
  const { id } = req.params;
  try {
    const work = await Work.findByPk(id, { include: 'experiences' });

    if (!work) {
      throw new Error('Work not found');
    }

    return res.status(200).json(respond(200, 'Get detail work successfult', work));
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

const createWork = async (req, res) => {
  const { error, value: body } = createValidation.validate(req.body);

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  let payloadWork = {};

  for (let [key, value] of Object.entries(body)) {
    if (key != 'experience') payloadWork[key] = value;
  }

  try {
    const work = await Work.create(payloadWork);
    let experience;
    if (body.experience) {
      let experiencePayload = body.experience.map((value) => {
        return {
          work_id: work.id,
          name: value,
        };
      });

      experience = await Work_Experience.bulkCreate(experiencePayload, { returning: true });
    }

    return res.status(200).json(respond(200, 'Create work successfuly', { ...work.dataValues, experience }));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const deleteWork = async (req, res) => {
  const { id } = req.params;

  try {
    const work = await Work.findByPk(id);
    if (!work) {
      throw new Error('Work not found');
    }

    await Work_Experience.destroy({
      where: {
        work_id: id,
      },
    });

    await work.destroy();

    return res.status(200).json(respond(200, 'Success delete a work', ''));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const updateWork = async (req, res) => {
  const { error, value: body } = createValidation.validate(req.body);
  const { id } = req.params;

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  try {
    const work = await Work.findByPk(id);

    if (!work) {
      throw new Error('Work not found');
    }

    for (let [key, value] of Object.entries(body)) {
      if (key != 'experience') work[key] = value;
    }

    let experience;
    if (body?.experience) {
      await Work_Experience.destroy({ where: { work_id: id } });

      let experiencePayload = body.experience.map((value) => {
        return {
          work_id: work.id,
          name: value,
        };
      });

      experience = await Work_Experience.bulkCreate(experiencePayload, { returning: true });
    } else {
      experience = await Work_Experience.findAll({ where: { work_id: id } });
    }

    await work.save();

    const response = { ...work.dataValues, experience };

    return res.status(200).json(respond(200, 'Work update successfuly', response));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = { getWorks, getDetailWork, createWork, deleteWork, updateWork };

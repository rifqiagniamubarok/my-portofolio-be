const Joi = require('joi');
const { Tech_Stack_Icon, Icon } = require('../../models');
const respond = require('../../utils/respond');

const getAll = async (req, res) => {
  try {
    const tech_stacks = await Tech_Stack_Icon.findAndCountAll();
    return res.status(200).json(respond(200, 'Get tech stack succesfult', { data: tech_stacks.rows }));
  } catch (error) {
    res.status(500).json(respond(500, error, ''));
  }
};

const getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const techStack = await Tech_Stack_Icon.findByPk(id);
    if (techStack === null) throw { statusCode: 404, msg: 'Tech stack not found' };

    return res.status(200).json(respond(200, 'Get detail tech stack successfuly', techStack));
  } catch (error) {
    let status = error.statusCode || 500;
    return res.status(status).json(respond(500, error.msg || error));
  }
};

const createValidation = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().required(),
  about: Joi.string().required(),
});

const createData = async (req, res) => {
  try {
    const { error, value: body } = createValidation.validate(req.body);
    if (error) throw error;

    const icon = await Icon.findOne({ where: { path: body.icon } });
    if (icon === null) throw { statusCode: 404, msg: 'Icon not found' };

    const payload = {
      name: body.name,
      icon_url: body.icon,
      about: body.about,
    };

    await Tech_Stack_Icon.create(payload);

    return res.status(200).json(respond(200, 'Create new tech stack successfuly', body));
  } catch (error) {
    res.status(error?.statusCode || 500).json(respond(500, error.msg || error));
  }
};

const updateValidation = Joi.object({
  name: Joi.string(),
  icon: Joi.string(),
  about: Joi.string(),
});

const updateData = async (req, res) => {
  const { id } = req.params;

  try {
    const { error, value: body } = updateValidation.validate(req.body);
    if (error) throw error;

    const techStack = await Tech_Stack_Icon.findByPk(id);
    if (techStack === null) throw { status: 404, msg: 'Tech stack not found' };

    for (const [key, value] of Object.entries(body)) {
      if (key === 'icon') {
        const icon = await Icon.findOne({ where: { path: body.icon } });
        if (icon === null) throw 'image not found';
        else techStack.icon_url = body.icon;
      } else {
        techStack[key] = value;
      }
    }

    await techStack.save();

    return res.status(200).json(respond(200, 'Update successfuly', techStack));
  } catch (error) {
    return res.status(500).json(respond(500, error));
  }
};

const deleteData = async (req, res) => {
  const { id } = req.params;
  try {
    try {
      const techStack = await Tech_Stack_Icon.findByPk(id);
      if (techStack === null) throw { statusCode: 404, msg: 'Tech stack not found' };

      await techStack.destroy();

      return res.status(200).json(respond(200, 'Get detail tech stack successfuly', techStack));
    } catch (error) {
      let status = error.statusCode || 500;
      return res.status(status).json(respond(500, error.msg || error));
    }
  } catch (error) {
    return res.status(500).json(respond(500, error));
  }
};

module.exports = { getAll, getDetail, createData, updateData, deleteData };

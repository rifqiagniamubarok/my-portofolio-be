const Joi = require('joi');
const { Tag } = require('../../models');
const respond = require('../../utils/respond');
const { Op } = require('sequelize');

const getTags = async (req, res) => {
  const { search: search_required } = req.query;

  let search = search_required || false;

  let wherePayload = {};

  if (search) {
    wherePayload = {
      name: {
        [Op.substring]: search,
      },
    };
  }

  try {
    const tags = await Tag.findAndCountAll({ where: wherePayload });

    return res.status(200).json(respond(200, 'Get all tags successfuly', { page_info: { total_item: tags.count }, data: tags.rows }));
  } catch (error) {
    return res.status(500).json(respon(500, error, ''));
  }
};

const getDetailTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) throw new Error('tag not found');

    return res.status(200).json(respond(200, 'Get detail tag successfuly', tag));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const createValidation = Joi.object({
  name: Joi.string().required(),
  about: Joi.string(),
});

const createTag = async (req, res) => {
  const { error, value: body } = createValidation.validate(req.body);

  try {
    if (error) {
      return res.status(400).json(respond(400, error.message, ''));
    }
    const tag = await Tag.create(body);
    return res.status(200).json(respond(200, 'Create successfuly', tag));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const updateValidation = Joi.object({
  name: Joi.string(),
  about: Joi.string(),
});

const updateTag = async (req, res) => {
  const { id } = req.params;

  const { error, value: body } = updateValidation.validate(req.body);

  try {
    if (error) {
      return res.status(400).json(respond(400, error.message, ''));
    }

    const tag = await Tag.findByPk(id);

    if (!tag) throw 'Tag not found';

    for (const [key, value] of Object.entries(body)) {
      tag[key] = value;
    }

    await tag.save();

    return res.status(200).json(respond(200, 'Update success', tag));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await Tag.findByPk(id);

    if (!tag) throw new Error('Tag not found');

    await tag.destroy();

    return res.status(200).json(respond(200, 'Tag delete successfuly', tag));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = { getTags, getDetailTag, createTag, updateTag, deleteTag };

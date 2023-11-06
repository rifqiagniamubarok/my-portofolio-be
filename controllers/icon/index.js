const express = require('express');
const Joi = require('joi');
const { Icon } = require('../../models');

const respond = require('../../utils/respond');
const { Op } = require('sequelize');
const fs = require('fs').promises;

const getAllValidation = Joi.object({
  page: Joi.number().default(1),
  page_size: Joi.number().default(10),
  search: Joi.string(),
});

const getIcons = async (req, res) => {
  let {
    error,
    value: { page, page_size, search: search_required },
  } = getAllValidation.validate(req.query);
  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  let search = search_required | '';

  let nameQuery = {};
  if (search) {
    nameQuery = { name: { [Op.like]: search } };
  }

  try {
    const offset = (page - 1) * page_size;
    const limit = page_size;
    const icons = await Icon.findAndCountAll({ offset, limit, where: nameQuery });

    const total_items = icons.count;
    const total_pages = Math.ceil(total_items / page_size);

    const page_info = {
      page,
      page_size,
      total_items,
      total_pages,
    };

    return res.status(200).json(respond(200, 'Get all icons successfuly', { page_info, data: icons.rows }));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const getDetailIcon = async (req, res) => {
  const { id } = req.params;

  try {
    const icon = await Icon.findByPk(id);

    return res.status(200).json(respond(200, 'Get detail icon successfuly', icon));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const uploadValidation = Joi.object({
  name: Joi.string().required(),
  about: Joi.string(),
  file: Joi.any(),
});

const uploadIcon = async (req, res) => {
  const request = {};

  for (let [key, value] of Object.entries(req.body)) {
    if (key != 'file') request[key] = value;
  }
  let { error, value: body } = uploadValidation.validate(request);

  const icon = req.file.path;

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  if (!icon) {
    return res.status(400).json(respond(400, 'icon not found', ''));
  }
  try {
    const icon_url = req.protocol + '://' + req.get('host') + '/' + icon;
    const newIcon = await Icon.create({ ...body, path: icon_url }, { returning: true });

    return res.status(200).json(respond(200, 'Icon uploaded successfuly', newIcon));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const updateIcon = async (req, res) => {
  const { id } = req.params;

  const request = {};

  for (let [key, value] of Object.entries(req.body)) {
    if (key != 'file') request[key] = value;
  }

  let { error, value: body } = uploadValidation.validate(request);

  const newIcon = req.file.path;

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  if (!newIcon) {
    return res.status(400).json(respond(400, 'icon not found', ''));
  }

  try {
    const icon_url = req.protocol + '://' + req.get('host') + '/' + newIcon;

    const icon = await Icon.findByPk(id);

    if (!icon) res.status(404).json(respond(404, 'Icon not found', ''));

    const pas_icon_url = 'public' + icon.path.split('public')[1];
    await fs.unlink(pas_icon_url);

    icon.path = icon_url;
    for (let [key, value] of Object.entries(body)) {
      icon[key] = value;
    }

    await icon.save();

    return res.status(200).json(respond(200, 'Icon update successfuly', icon));
  } catch (error) {
    return res.stuts(500).json(respond(500, error, ''));
  }
};

const deleteIcon = async (req, res) => {
  const { id } = req.params;

  try {
    const icon = await Icon.findByPk(id);
    if (!icon) res.status(404).json(respond(404, 'Icon not found', ''));
    const icon_path = 'public' + icon.path.split('public')[1];
    await fs.unlink(icon_path);
    await icon.destroy();
    res.json({ icon });
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = { getIcons, getDetailIcon, uploadIcon, updateIcon, deleteIcon };

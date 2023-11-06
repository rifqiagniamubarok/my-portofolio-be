const express = require('express');
const Joi = require('joi');
const { Image } = require('../../models');

const respond = require('../../utils/respond');
const { Op } = require('sequelize');
const fs = require('fs').promises;

const getAllValidation = Joi.object({
  page: Joi.number().default(1),
  page_size: Joi.number().default(10),
  search: Joi.string(),
});

const getImages = async (req, res) => {
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
    const images = await Image.findAndCountAll({ offset, limit, where: nameQuery, order: [['createdAt', 'DESC']] });

    const total_items = images.count;
    const total_pages = Math.ceil(total_items / page_size);

    const page_info = {
      page,
      page_size,
      total_items,
      total_pages,
    };

    return res.status(200).json(respond(200, 'Get all images successfuly', { page_info, data: images.rows }));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const getDetailImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);

    return res.status(200).json(respond(200, 'Get detail image successfuly', image));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const uploadValidation = Joi.object({
  name: Joi.string().required(),
  about: Joi.string(),
  file: Joi.any(),
});

const uploadImage = async (req, res) => {
  const request = {};

  for (let [key, value] of Object.entries(req.body)) {
    if (key != 'file') request[key] = value;
  }
  let { error, value: body } = uploadValidation.validate(request);

  const image = req.file.path;

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  if (!image) {
    return res.status(400).json(respond(400, 'image not found', ''));
  }
  try {
    const image_url = req.protocol + '://' + req.get('host') + '/' + image;
    const newImage = await Image.create({ ...body, path: image_url }, { returning: true });

    return res.status(200).json(respond(200, 'Image uploaded successfuly', newImage));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const updateImage = async (req, res) => {
  const { id } = req.params;

  const request = {};

  for (let [key, value] of Object.entries(req.body)) {
    if (key != 'file') request[key] = value;
  }

  let { error, value: body } = uploadValidation.validate(request);

  const newImage = req.file.path;

  if (error) {
    return res.status(400).json(respond(400, error.message, ''));
  }

  if (!newImage) {
    return res.status(400).json(respond(400, 'image not found', ''));
  }

  try {
    const image_url = req.protocol + '://' + req.get('host') + '/' + newImage;

    const image = await Image.findByPk(id);

    if (!image) res.status(404).json(respond(404, 'Image not found', ''));

    const pas_image_url = 'public' + image.path.split('public')[1];
    await fs.unlink(pas_image_url);

    image.path = image_url;
    for (let [key, value] of Object.entries(body)) {
      image[key] = value;
    }

    await image.save();

    return res.status(200).json(respond(200, 'Image update successfuly', image));
  } catch (error) {
    return res.stuts(500).json(respond(500, error, ''));
  }
};

const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByPk(id);
    if (!image) res.status(404).json(respond(404, 'Image not found', ''));
    const image_path = 'public' + image.path.split('public')[1];
    await fs.unlink(image_path);
    await image.destroy();
    res.json({ image });
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = { getImages, getDetailImage, uploadImage, updateImage, deleteImage };

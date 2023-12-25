const Joi = require('joi');
const { Post, Image, Tag, Tag_Post, Project, Tech_Stack_Icon } = require('../../models');
const respond = require('../../utils/respond');
const { Op } = require('sequelize');

const getProjectsValidation = Joi.object({
  page: Joi.number().default(1),
  page_size: Joi.number().default(10),
  search: Joi.string(),
});

const getProjects = async (req, res) => {
  try {
    const {
      error,
      value: { page, page_size, search: search_required },
    } = getProjectsValidation.validate(req.query);
    if (error) throw error.message;

    let search = search_required || '';

    let nameQuery = { is_publish: true };

    if (search) {
      nameQuery.title = { [Op.substring]: search };
    }

    const offset = (page - 1) * page_size;
    const limit = page_size;

    const projects = await Project.findAndCountAll({
      where: nameQuery,
      offset,
      limit,
      attributes: ['id', 'thumbnail', 'title', 'slug', 'scale', 'status', 'like', 'view', 'is_publish', 'meta_description', 'createdAt'],
      include: [{ model: Tech_Stack_Icon, attributes: ['id', 'name', 'icon_url'], through: { attributes: [] } }],
    });

    const total_items = projects.count;
    const total_pages = Math.ceil(total_items / page_size);

    const page_info = {
      page,
      page_size,
      total_items,
      total_pages,
    };

    return res.status(200).json(respond(200, 'Success get all', { page_info, data: projects.rows }));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const getProject = async (req, res) => {};

module.exports = { getProjects, getProject };

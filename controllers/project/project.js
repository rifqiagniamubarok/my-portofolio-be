const Joi = require('joi');
const { checkTechStack } = require('./tech_stack_project');
const { Project, Project_View, Tech_Stack_Project, Tech_Stack_Icon, Image, sequelize } = require('../../models');
const respond = require('../../utils/respond');

const getValidation = Joi.object({
  page: Joi.number().default(1),
  page_size: Joi.number().default(10),
  search: Joi.string(),
});

const getAll = async (req, res) => {
  try {
    const {
      error,
      value: { page, page_size, search: search_required },
    } = getValidation.validate(req.query);
    if (error) throw error.message;

    let search = search_required || '';

    let nameQuery = {};

    if (search) {
      nameQuery = { title: { [Op.substring]: search } };
    }

    const offset = (page - 1) * page_size;
    const limit = page_size;

    const projects = await Project.findAndCountAll({
      where: nameQuery,
      offset,
      limit,
      attributes: ['id', 'thumbnail', 'title', 'slug', 'like', 'view', 'is_publish', 'meta_description'],
      include: [{ model: Tech_Stack_Icon, attributes: ['id', 'name'], through: { attributes: [] } }],
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
    return res.status(500).json(respond(500, error));
  }
};

const getDetail = async () => {
  try {
  } catch (error) {}
};

const createValidation = Joi.object({
  thumbnail: Joi.string().required(),
  title: Joi.string().required(),
  slug: Joi.string().required(),
  meta_description: Joi.string().required(),
  body: Joi.string().required(),
  tech_stack: Joi.array().items(Joi.number()).required(),
  scale: Joi.string().valid('minor', 'moderate', 'major', 'massive').required(),
  status: Joi.string().valid('draft', 'planning', 'in_progress', 'finished').required(),
  project_view: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().required(),
        position: Joi.number().required(),
        is_publish: Joi.boolean().default(true),
      })
    )
    .required(),
});

const createData = async (req, res) => {
  try {
    const { error, value: body } = createValidation.validate(req.body);
    if (error) throw error.message;

    const thumbnail = await Image.findOne({ where: { path: body.thumbnail } });
    if (!thumbnail) throw 'Image not found';

    const is_suitable = await checkTechStack(body.tech_stack);
    if (!is_suitable) throw 'Some tech stack not found';
    const projectPayload = Object.fromEntries(Object.entries(body).filter(([key, _]) => key !== 'project_view' && key !== 'tech_stack'));

    await sequelize.transaction(async (t) => {
      const newProject = await Project.create(projectPayload, { transaction: t });

      const project_id = newProject.id;

      const techStackPayload = body.tech_stack.map((tech_stack_id) => {
        return { project_id, tech_stack_id };
      });

      await Tech_Stack_Project.bulkCreate(techStackPayload, { transaction: t });

      const projectViewPayload = body.project_view.map((projectview) => {
        return { project_id, ...projectview };
      });

      await Project_View.bulkCreate(projectViewPayload, { transaction: t });

      const getProject = await Project.findByPk(project_id, {
        include: [{ model: Project_View }, { model: Tech_Stack_Icon, through: 'Tech_Stack_Project' }],
        transaction: t,
      });
      res.status(200).json(respond(200, 'Create new project successfuly', getProject));
    });
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const updateData = async () => {
  try {
  } catch (error) {}
};

const publishData = async () => {
  try {
  } catch (error) {}
};

const deleteData = async () => {
  try {
  } catch (error) {}
};

module.exports = { getAll, getDetail, createData, updateData, publishData, deleteData };

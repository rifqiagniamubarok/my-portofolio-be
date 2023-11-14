const Joi = require('joi');
const { Post, Image, Tag, Tag_Post } = require('../../models');
const respond = require('../../utils/respond');
const { Op } = require('sequelize');

const getPostsValidation = Joi.object({
  page: Joi.number().default(1),
  page_size: Joi.number().default(10),
  search: Joi.string(),
});

const getPosts = async (req, res) => {
  try {
    const {
      error,
      value: { page, page_size, search: search_required },
    } = getPostsValidation.validate(req.query);
    if (error) throw error.message;

    let search = search_required || '';

    let nameQuery = {};

    if (search) {
      nameQuery = { title: { [Op.substring]: search } };
    }

    const offset = (page - 1) * page_size;
    const limit = page_size;

    const posts = await Post.findAndCountAll({
      where: nameQuery,
      offset,
      limit,
      attributes: ['id', 'thumbnail', 'title', 'slug', 'like', 'view', 'is_publish', 'meta_description'],
      include: [{ model: Tag, as: 'tags', attributes: ['name'] }],
    });

    const total_items = posts.count;
    const total_pages = Math.ceil(total_items / page_size);

    const page_info = {
      page,
      page_size,
      total_items,
      total_pages,
    };

    return res.status(200).json(respond(200, 'Success get all', { page_info, data: posts.rows }));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, { include: 'tags' });
    if (!post) throw 'Post not found';
    return res.json({ post });
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const createValidation = Joi.object({
  thumbnail: Joi.string().required(),
  title: Joi.string().required(),
  slug: Joi.string().required(),
  meta_description: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(Joi.number()).required(),
});

const createPost = async (req, res) => {
  try {
    const { error, value: body } = createValidation.validate(req.body);
    if (error) throw error.message;

    const thumbnail = await Image.findOne({ where: { path: body.thumbnail } });
    if (!thumbnail) throw 'Image not found';

    const tags = await Tag.findAll({ where: { id: body.tags } });
    if (tags.length !== body.tags.length) throw 'Some tag not found';

    let payloadPost = {};
    for (let [key, value] of Object.entries(body)) {
      if (key !== 'tags') payloadPost[key] = value;
    }

    const newPost = await Post.create(payloadPost, { returning: true });
    const post_id = newPost.id;

    let payloadTagPosts = body.tags.map((tag_id, _) => {
      return { tag_id, post_id };
    });

    await Tag_Post.bulkCreate(payloadTagPosts, { returning: true });

    const post = await Post.findByPk(post_id, { include: 'tags' });

    return res.status(200).json(respond(200, 'Create successfuly', post));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const unPublish = async (req, res) => {
  const { id } = req.params;

  try {
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, unPublish, deletePost };

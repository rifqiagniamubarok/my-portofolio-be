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

    let nameQuery = {
      is_publish: true,
    };

    if (search) {
      nameQuery.title = { [Op.substring]: search };
    }

    const offset = (page - 1) * page_size;
    const limit = page_size;

    const posts = await Post.findAndCountAll({
      where: nameQuery,
      offset,
      limit,
      attributes: ['id', 'thumbnail', 'title', 'slug', 'like', 'view', 'is_publish', 'meta_description', 'createdAt'],
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
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ where: { slug }, include: [{ model: Tag, as: 'tags', attributes: ['name'] }] });
    if (!post) throw 'Post not found';
    post.view += 1;
    await post.save();
    return res.status(200).json(respond(200, 'Get detail post successfuly', post));
  } catch (error) {
    return res.status(500).json(respond(500, error, ''));
  }
};

module.exports = { getPosts, getPost };

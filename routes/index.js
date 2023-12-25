const express = require('express');
const router = express.Router();
const auth = require('./auth');

const profile = require('./profile');
const education = require('./education');
const work = require('./work');
const image = require('./image');
const icon = require('./icon');
const tag = require('./tag');
const post = require('./post');
const publicPost = require('./post/public');
const techStack = require('./tech_stack');
const project = require('./project');
const publicProject = require('./project/public');

const Auth = require('../middlewares/auth');

router.use('/auth', auth);
router.use('/profile', Auth, profile);
router.use('/education', Auth, education);
router.use('/work', work);
router.use('/image', Auth, image);
router.use('/icon', Auth, icon);
router.use('/tag', Auth, tag);
router.use('/post', Auth, post);
router.use('/public/post', publicPost);
router.use('/tech-stack', Auth, techStack);
router.use('/project', Auth, project);
router.use('/public/project', publicProject);

module.exports = router;

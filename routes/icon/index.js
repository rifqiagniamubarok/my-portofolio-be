const express = require('express');
const router = express.Router();
const iconControllers = require('../../controllers/icon');
const multer = require('multer');
const Joi = require('joi');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/icons');
  },

  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/svg+xml') {
    cb(null, true);
  } else {
    cb(null, false);
    throw new Error('pict not icon');
  }
};

router.get('/', iconControllers.getIcons);
router.get('/:id', iconControllers.getDetailIcon);
router.post('/', multer({ storage, fileFilter }).single('icon'), iconControllers.uploadIcon);
router.patch('/:id', multer({ storage, fileFilter }).single('icon'), iconControllers.updateIcon);
router.delete('/:id', iconControllers.deleteIcon);

module.exports = router;

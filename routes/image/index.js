const express = require('express');
const router = express.Router();
const imageControllers = require('../../controllers/image');
const multer = require('multer');
const Joi = require('joi');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },

  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
    throw new Error('pict not image');
  }
};

router.get('/', imageControllers.getImages);
router.get('/:id', imageControllers.getDetailImage);
router.post('/', multer({ storage, fileFilter }).single('image'), imageControllers.uploadImage);
router.patch('/:id', multer({ storage, fileFilter }).single('image'), imageControllers.updateImage);
router.delete('/:id', imageControllers.deleteImage);

module.exports = router;

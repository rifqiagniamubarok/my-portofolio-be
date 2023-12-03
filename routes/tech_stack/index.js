const express = require('express');
const router = express.Router();
const techStackController = require('../../controllers/tech_stack');
const { getAll, getDetail, createData, updateData, deleteData } = techStackController;

router.get('/', getAll);
router.get('/:id', getDetail);
router.post('/', createData);
router.patch('/:id', updateData);
router.delete('/:id', deleteData);

module.exports = router;

const express = require('express')
const router = express.Router();
const {
    createData,
    readData,
    updateData,
    deleteData
} = require('../controller/bootcamp-controller');


router.route('/')
.post(createData)
.get(readData);

router.route('/:id')
.put(updateData)
.delete(deleteData);

module.exports = router;
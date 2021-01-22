const express = require('express');
const router  = express.Router();
const genreController = require('./../controller/genre');

router
.route('/')
.get(genreController.getAll)
.post(genreController.Create)

router
.route('/:id')
.get(genreController.getById)
.put(genreController.Update)
.delete(genreController.Delete)


module.exports = router;
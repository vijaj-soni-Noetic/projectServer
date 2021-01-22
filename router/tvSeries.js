const express = require('express');
const router  = express.Router();
const tvSeriesController = require('./../controller/tvSeries');

router
.route('/')
.get(tvSeriesController.getAll)
.post(tvSeriesController.Create)

router
.route('/:id')
.get(tvSeriesController.getById)
.put(tvSeriesController.Update)
.delete(tvSeriesController.Delete)


module.exports = router;
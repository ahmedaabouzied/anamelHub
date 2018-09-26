'use strict';

const express = require('express');
const router = require('express').Router();

const casesController = require('../../controllers/casesController');
const StarController = require('../../controllers/starsController');
router.post('/create',casesController.create);

router.get('/show/:id',casesController.show);

router.put('/edit/:id',casesController.update);

router.delete('/delete/:id',casesController.remove);

router.post('/star/create/:caseId',StarController.create);

router.post('/star/remove/:caseId',StarController.remove);

module.exports = router;
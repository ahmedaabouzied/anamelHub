'use strict';

const express = require('express');
const router = require('express').Router();

const casesController = require('../../controllers/casesController');

router.post('/create',casesController.create);

router.get('/show/:id',casesController.show);

router.put('/edit/:id',casesController.update);

router.delete('/delete/:id',casesController.remove);

module.exports = router;
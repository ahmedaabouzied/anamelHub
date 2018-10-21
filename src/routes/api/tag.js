'use strict';

const express = require('express');
const router = require('express').Router();

const tagsController = require('../../controllers/tagsController');

router.get('/getall',tagsController.showAll);

module.exports = router;
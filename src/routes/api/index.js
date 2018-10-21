'use strict';

const express = require('express');
const router = require('express').Router();

// [user routes] //
const userRoutes = require('./user')
router.use('/user',userRoutes);
// [case routes] //
const caseRoutes = require('./case');
router.use('/cases',caseRoutes);

const tagRoutes = require('./tag');
router.use('/tags',tagRoutes);
module.exports = router;
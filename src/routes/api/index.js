'use strict';

const express = require('express');
const router = require('express').Router();

// [user routes] //
const userRoutes = require('./user')
router.use('/user',userRoutes);


module.exports = router;
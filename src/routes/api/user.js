'use strict';

const express = require('express');
const router = require('express').Router();

const userController = require('../../controllers/usersController');
const profileController = require('../../controllers/profilesController');
router.post('/create',
            userController.create,
            profileController.create
        );
router.get('/showbyid/:id',
            userController.selectUserById,
            profileController.show
        );      
router.post('/login',
            userController.login,
            profileController.show
        );
router.put('/update',userController.update);
router.delete('/delete/:id',userController.remove);

module.exports = router;

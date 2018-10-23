'use strict';

const express = require('express');
const router = require('express').Router();

const userController = require('../../controllers/usersController');
const profileController = require('../../controllers/profilesController');
const followersController = require('../../controllers/followersController');
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
router.put('/update/profile',profileController.update);
router.delete('/delete/:id',userController.remove);

router.post('/follow/:followingId',followersController.follow)

router.post('/unfollow/:followingId',followersController.unfollow);
router.get('/isfollowing/:id',followersController.isFollowing);
router.get('/getfollowingcases/:offset',followersController.getCasesOfFollowedUsers);
module.exports = router;

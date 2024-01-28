const express = require('express');
const mysql = require('mysql');

const router = express.Router();

router.use(express.json());

const um = require('../../utils/UserModel');
const isAuth = require('../../middlewares/isAuth');
const attachCurrentUser = require('../../middlewares/attachCurrentUser');
const userModel = new um();

router.post('/getuser', isAuth, /*attachCurrentUser,*/ async (req, res) => {
    await userModel.findOne(req.body, (result) => {
        res.json({user: result});
    });
});

module.exports = router;
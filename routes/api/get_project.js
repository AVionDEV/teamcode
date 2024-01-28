const {Router, json} = require('express');

const pm = require('../../utils/ProjectModel');
const isAuth = require('../../middlewares/isAuth');

const ProjectModel = new pm();
const router = Router();

router.use(json());

router.post('/get_project', isAuth, (req, res) => {
    ProjectModel.findOne(req.body, (callback_data) => {
        res.json(callback_data);
    });
});

module.exports = router;
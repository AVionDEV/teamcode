const {Router, json} = require('express');

const pm = require('../../utils/ProjectModel');
const isAuth = require('../../middlewares/isAuth');

const ProjectModel = new pm();
const router = Router();

router.use(json());

router.post('/get_all_projects', isAuth, (req, res) => {
    ProjectModel.find(req.body, (callback_data) => {
        res.json(callback_data);
    });
});

module.exports = router;
const {
    Router,
    json
} = require('express');
const um = require('../../utils/UserModel');

const UserModel = new um();
const router = Router();

router.use(json());

router.post('/getemail', (req, res) => {
    UserModel.findOne(req.body, (result) => {
        if (result == undefined) {
            return res.json({
                'state': true
            });
        } else {
            res.json({
                'state': false
            });
        }
    });
});

module.exports = router;
const {
    Router,
    json
} = require('express');
const bodyParser = require('body-parser');

const au = require('../../utils/Auth');

const Auth = new au();

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(json());

router.post('/register', (req, res) => {
    Auth.SignUp(req.body, (result) => {
        if (!result) {
            res.status(501).json({
                msg: "Database error, please try again"
            });
        } else {
            res.status(200).json({
                'redirect_url': '/auth'
            });
        }
    });
});

module.exports = router;
const {
    Router,
    json
} = require('express');
const bodyParser = require('body-parser');

const au = require('../../utils/Auth');

const Auth = new au();

const router = Router();

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(json());

router.post('/auth', (req, res) => {
    Auth.Login(req.body, (callback_data) => {
        if (callback_data['state'] == 'nopass') {
            return res.status(200).json({
                state: 'nopass',
                msg: "Incorrect password"
            });
        };

        if(callback_data['state'] == 'db') {
            return res.status(501).json({
                state: 'db error',
                msg: "Database error, please try again later"
            });
        };

        if(callback_data['state'] == 'e/u') {
            return res.status(200).json({
                state: 'nouser',
                msg: "No user found with this email/username"
            });
        };

        res.status(200).json({
            callback_data,
            'redirect_url': '/'
        });
    });
});

module.exports = router;
const {Router, json} = require('express');

const router = Router();

router.use(json());

router.get('/auth', (req, res) => {
    try {
        res.render('auth');
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;
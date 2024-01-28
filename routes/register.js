const {Router} = require('express');

const router = Router();

router.get('/register', (req, res) => {
    try{
        res.render('register');
    }catch(err) {
        res.status(501);
        console.log(err);
    }
});

module.exports = router;
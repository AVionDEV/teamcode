const {
    Router
} = require('express');
const {
    URL
} = require('url');

const router = Router();

router.get("/redirect", (req, res) => {
    const baseURL = req.protocol + '://' + req.headers.host + '/';
    const reqUrl = new URL(req.url, baseURL);
    const redirect_url = reqUrl.searchParams.get('url');
    if (redirect_url) {
        res.redirect(redirect_url);
    }
});

module.exports = router;
const um = require('../utils/UserModel');
const UserModel = new um();

module.exports = async (req, res, next) => {
    const decodedTokenData = req.tokenData;
    const userRecord = await UserModel.findOne({
        id: decodedTokenData.id
    })

    req.currentUser = userRecord;

    if (!userRecord) {
        res.redirect('/auth');
        return res.status(401).end('User not found');
    } else {
        return next();
    }
}
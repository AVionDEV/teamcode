const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const um = require('../utils/UserModel');
const UserModel = new um();

class Auth {
    async SignUp(data, callback) {
        const {
            password,
            username,
            firstname,
            lastname,
            email
        } = data;

        const passwordHashed = await argon2.hash(password);

        await UserModel.create({
            password: passwordHashed,
            email,
            username,
            firstname,
            lastname
        }, (result) => {
            callback({
                user: {
                    email: result.email,
                    username: result.username
                }
            });
        });
    }

    async Login(data, callback) {
        await UserModel.findOne({
            'email': data.login,
            'username': data.login
        }, async (result) => {
            if (!result) return callback({'state': 'db'});
            if(result.length == 0) return callback({'state': 'e/u','msg':'Incorrect email/username'});
            const correctPassword = await argon2.verify(result.password, data.password);
            if (!correctPassword) return callback({'state': 'nopass', 'msg': 'Incorrect password'});

            callback({
                user: {
                    email: result.email,
                    username: result.username,
                },
                token: this.__generateToken(result)
            });
        });
    }

    __generateToken(user) {

        const data = {
            id: user.id,
            name: user.username,
            email: user.email
        };
        const signature = process.env.JWT_KEY;
        const expiration = '6h';

        return jwt.sign({
            data,
        }, signature, {
            expiresIn: expiration
        });
    }
}
module.exports = Auth;
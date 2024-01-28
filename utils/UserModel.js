const mysql = require('mysql');

class UserModel {
    __datRes(data) {
        let whr = "";
        let keys = "";
        let dat = "";
        Object.keys(data).filter(el => el != 'password').forEach(el => {
            keys += `${el},`;
            whr += `or ${el}=${typeof data[el] != 'string'?data[el]:`'${data[el]}'`}`;
            dat += `${typeof data[el] != 'string'?data[el]:`'${data[el]}'`},`;
        });

        return {
            whr,
            keys,
            dat,
            data
        };
    }

    async findOne(data, callback) {

        const dt = this.__datRes(data);

        const connection = mysql.createConnection({
            'host': process.env.host,
            'database': process.env.database,
            'port': process.env.port,
            'password': process.env.password,
            'user': process.env.user
        });

        await connection.query(`select * from users where ${dt.whr.substring(2)}`, (err, dat) => {
            if (err) return new Error(err);
        
            return callback(dat[0]);
        });

    };

    create(data, callback) {

        const dt = this.__datRes(data);
        const user = dt.data;

        const connection = mysql.createConnection({
            'host': process.env.host,
            'database': process.env.database,
            'port': process.env.port,
            'password': process.env.password,
            'user': process.env.user
        });

        connection.query(`insert into users (${dt.keys.substring(0,dt.keys.length-1)}) values (${dt.dat.substring(0, dt.dat.length-1)})`, (err, dat) => {
            if (err) return new Error(err);

            return callback(user);
        });

    }
}

module.exports = UserModel;
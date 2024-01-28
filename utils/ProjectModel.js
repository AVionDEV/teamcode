const mysql = require('mysql');

class ProjectModel {
    __datRes(data) {
        try {
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
        } catch (err) {
            console.log(err);
        }
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

        await connection.query(`select * from project where ${dt.whr.substring(2)}`, (err, dat) => {
            if (err) return new Error(err);

            return callback(dat[0]);
        });

    };

    async find(data, callback) {

        const dt = this.__datRes(data);

        const connection = mysql.createConnection({
            'host': process.env.host,
            'database': process.env.database,
            'port': process.env.port,
            'password': process.env.password,
            'user': process.env.user
        });

        await connection.query(`select id, creatorId, teamId, title from project where ${dt.whr.substring(2)} limit 100`, (err, dat) => {
            if (err) return new Error(err);

            return callback(dat);
        });

    };

    create(data, callback) {

        const dt = this.__datRes(data);
        const project = dt.data;

        const connection = mysql.createConnection({
            'host': process.env.host,
            'database': process.env.database,
            'port': process.env.port,
            'password': process.env.password,
            'user': process.env.user
        });

        connection.query(`select count(creatorId) from project where creatorId='${project.creatorId}'`, (result => {
            if (result >= 100) return callback({
                'state': 'failed',
                'code': 'mt100p',
                'msg': 'Failed to create a new project, because of limits at 100 projects per user.'
            });
            connection.query(`insert into project (${dt.keys.substring(0,dt.keys.length-1)}) values (${dt.dat.substring(0, dt.dat.length-1)})`, (err, dat) => {
                if (err) return new Error(err);

                return callback(project);
            });
        }));

    }
}

module.exports = ProjectModel;
// const functions = require('firebase-functions');
// console.log(`connect to:"/cloudsql/${functions.config().db.conn}"`);
module.exports = [
    {
        name: "local",
        type: "mariadb",
        host: "localhost",
        port: 3306,
        username: "example",
        password: "example",
        database: "example",
        entities: ["lib/models/*.js"],
        synchronize: true,
        logging: ["query", "error"]
    },
    // {
    //     name: "gcp",
    //     type: "mysql",
    //     host: "localhost",
    //     username: functions.config().db.user,
    //     password: functions.config().db.pw,
    //     database: functions.config().db.name,
    //     entities: ["lib/models/*.js"],
    //     synchronize: true,
    //     extra: {
    //         socketPath: `/cloudsql/${functions.config().db.conn}`,
    //     }
    // }
]

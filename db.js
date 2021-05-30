const {Pool} = require('pg');

const pool = new Pool({
    user: 'vurhevqxjhyrts',
    password: '93b7bf6b3ce3bebe91ec073867310303bd277441b716a0c72aef07aebd898a06',
    host: 'ec2-174-129-225-160.compute-1.amazonaws.com',
    port: 5432,
    database: 'dfirv0eppalgnn',
    ssl:{
        rejectUnauthorized: false
    }
});
module.exports = pool;
const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

if(!db) {
    console.log("Database setup incorrectly.");
    process.exit(1);
}

module.exports = db;
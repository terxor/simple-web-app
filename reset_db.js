var db = require("./modules/db");

var userTableQuery = `
  CREATE TABLE user (
    id varchar(50) NOT NULL,
    password varchar(500) NOT NULL,
    name varchar(50) NOT NULL,
    PRIMARY KEY (id)
  )
`;

async function go() {
  try {
    await db.connect(false);
    await db.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
    await db.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    await db.query(`USE ${process.env.DB_NAME}`);
    await db.query(`DROP TABLE IF EXISTS user`);
    await db.query(userTableQuery);
    process.exit(0);
  }
  catch (error) {
    console.log(error);
  }
}

go();
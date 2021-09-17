var db = require("./modules/db");

var userTableQuery = `
  CREATE TABLE user (
    id varchar(50) NOT NULL,
    password varchar(500) NOT NULL,
    name varchar(50) NOT NULL,
    PRIMARY KEY (id)
  )
`;

var notesTableQuery = `
  CREATE TABLE notes (
    id bigint(11) NOT NULL AUTO_INCREMENT,
    user_id varchar(50) NOT NULL,
    type varchar(50) NOT NULL,
    content varchar(1000),
    visibility ENUM('public', 'private') NOT NULL,
    FOREIGN KEY (user_id)
      REFERENCES user(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    PRIMARY KEY (id)
  ) AUTO_INCREMENT=0;
`;

async function go() {
  try {
    await db.connect(false);
    await db.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
    await db.query(`CREATE DATABASE ${process.env.DB_NAME}`);
    await db.query(`USE ${process.env.DB_NAME}`);
    await db.query(`DROP TABLE IF EXISTS user`);
    await db.query(userTableQuery);
    await db.query(notesTableQuery);
    process.exit(0);
  }
  catch (error) {
    console.log(error);
  }
}

go();
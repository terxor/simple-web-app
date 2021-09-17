/* Required for standalone execution of reset_db */
require("dotenv").config();

var mysql = require("mysql");

db = {
  connection: null
}

db.connect = async (includeDatabase = true) => {
  var config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  };
  if (includeDatabase) config["database"] = process.env.DB_NAME;
  db.connection = mysql.createConnection(config);
  return new Promise((resolve, reject) => {
    db.connection.connect((err) => {
      if (err) reject(err);
      resolve(true);
    });
  });
}

db.query = (queryString) => {
  return new Promise((resolve, reject) => {
    db.connection.query(queryString, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

db.getUser = async (id, includePassword = false) => {
  var users = await db.query(`SELECT * FROM user WHERE id='${id}'`);
  if (users.length != 1) return null;
  var user = users[0];
  if (!includePassword) delete user.password;
  return user;
}

db.addUser = async (user) => {
  try {
    await db.query(`INSERT INTO user (
        id,
        password,
        name
      ) VALUES (
        '${user.id}',
        '${user.password}',
        '${user.name}'
      )`);
    return { success: true, message: "Added user"};
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

db.addNote = async (note) => {
  return db.query(`INSERT INTO notes (
      user_id,
      type,
      content,
      visibility
    ) VALUES(
      '${note.user_id}',
      '${note.type}',
      '${note.content}',
      '${note.visibility}'
  )`);
}

db.getNotes = async (filter) => {
  var queryString = `SELECT * FROM notes`;
  if (!filter) filter = {};
  keys = Object.keys(filter);
  if (keys.length > 0) {
    queryString += ` WHERE`;
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      queryString += ` ${key} = '${filter[key]}'`;
      if (i < keys.length - 1) queryString += ` AND`;
    }
  }
  return db.query(queryString);
}

module.exports = db;
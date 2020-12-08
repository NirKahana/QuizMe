require('dotenv').config()
const scheme = process.env.DB_SCHEME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const config = {
  development: {
    username: username,
    password: password,
    database: scheme,
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: username,
    password: password,
    database: scheme,
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: username,
    password: password,
    database: scheme,
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
module.exports=config;
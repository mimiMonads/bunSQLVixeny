import { Database } from "bun:sqlite";

const db = new Database(":memory:");

db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`);

const insert = "INSERT INTO users (username, password) VALUES (?,?)";
db.run(insert, ["jhon", "1234"]);

export { db };

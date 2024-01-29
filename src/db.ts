import { Database } from "bun:sqlite";

const db = new Database(":memory:");

db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
  )`);

const insert = "INSERT INTO users (username, password) VALUES (?,?)";
db.run(insert, ["jhon", "1234"]);

// Create items table
db.run(`CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price DECIMAL
)`);

// Insert items
const insertItem = "INSERT INTO items (name, price) VALUES (?,?)";
db.run(insertItem, ["Item1", 10.99]);
db.run(insertItem, ["Item2", 15.50]);
db.run(insertItem, ["Item3", 7.25]);
db.run(insertItem, ["Item4", 12.00]);

export { db };

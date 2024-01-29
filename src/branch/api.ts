import { morphism } from "vixeny";
import { db } from "../db";

const getElements = "SELECT * FROM items LIMIT 10";

const getFromTableUser =
  `SELECT * FROM users WHERE username = ? AND password = ?`;

const deleteQuery = "DELETE FROM items WHERE id = ?";

const insertQuery = "INSERT INTO items (name, price) VALUES (?, ?)";


const getUserBranch = morphism()({
  f: (c) =>
    db
      .query(getFromTableUser)
      .values(c.arguments as {}),
});

const getFirst10 = morphism()({
  f: (c) => db.query(getElements).all() as [number, string, number][],
});

const deleteByID = morphism()({
  f: (c) => db.run(deleteQuery, [c.arguments as number]),
});

const addItem = morphism()({
  f: (c) => db.run(insertQuery, c.arguments as [])
});


export { deleteByID, getFirst10, getUserBranch, addItem };

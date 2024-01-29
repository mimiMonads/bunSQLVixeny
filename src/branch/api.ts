import { morphism } from "vixeny";
import { db } from "../db";

const getFromTableUser =
  `SELECT * FROM users WHERE username = ? AND password = ?`;

const getUserBranch = morphism()({
  f: (c) =>
    db
      .query(getFromTableUser)
      .values(c.arguments),
});

export { getUserBranch };

import { Item } from "../types.ts";
import { DB } from "../deps.ts";

export function save(data: Item[]) {
  const db = new DB("specials.db");

  db.query("DROP TABLE IF EXISTS specials");
  db.execute(`
  CREATE TABLE IF NOT EXISTS specials (
    name TEXT,  
    price REAL,
    PRIMARY KEY(name, price)
  )
`);

  for (const item of data) {
    db.query("DELETE FROM specials WHERE name = :name", {
      ":name": item.name,
    });
    db.query("INSERT INTO specials (name, price) VALUES (:name, :price)", {
      ":name": item.name,
      ":price": item.price,
    });
  }
  db.query("DELETE FROM specials WHERE price = 0");
  db.close();
}

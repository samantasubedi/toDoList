import dotenv from "dotenv";
import { dbConnect, getDB } from "./src/config/dbconfig.js";
const createTable = async () => {
  await dbConnect();
  const pool = getDB();
  const query = `CREATE TABLE todos(
 id INT AUTO_INCREMENT PRIMARY KEY,
 task VARCHAR(255) NOT NULL,
 dateAndTime varchar(255),
 completed BOOLEAN DEFAULT FALSE
 )`;
  await pool.query(query);
  console.log("table created sucessfully");
  process.exit();
};
createTable();

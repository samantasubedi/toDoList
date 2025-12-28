import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
let pool;
export const dbConnect = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.PORT_NUMBER,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
    });
    await pool.query("SELECT 1");
    console.log("sucessfully connected to the database");
  } catch (error) {
    console.log(`cant connect to the database ${error.message}`);
    process.exit(1);
  }
};
export const getDB = () => pool;

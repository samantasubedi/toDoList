import app from "./src/app.js";
import dotenv from "dotenv";
import { dbConnect } from "./src/config/dbconfig.js";
import { getDB } from "./src/config/dbconfig.js";
dotenv.config();
const portnum = process.env.PORT_NUMBER;
const startServer = async () => {
  await dbConnect();
  app.listen(portnum, (req, res) => {
    console.log("server is running in port 4000");
  });
};
startServer();

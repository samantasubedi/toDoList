import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();
const portnum = process.env.PORT_NUMBER;
app.listen(portnum, (req, res) => {
  console.log("server is running in port 4000");
});

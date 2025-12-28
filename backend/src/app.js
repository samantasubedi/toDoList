import express from "express";
import router from "./routes/todo.routes.js";
const app = express();
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("<h1>this is landing pageee</h1>");
// });
app.use("/api/routes", router);
export default app;

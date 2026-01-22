import express from "express";
import router from "./routes/todo.routes.js";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
const app = express();
app.use(express.json());
app.use(cors());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});
app.use(limiter);
app.get("/", (req, res) => {
  res.send("<h1>this is landing pageee</h1>");
});
app.use("/api/routes", router);
export default app;

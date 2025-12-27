import express from "express";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>this is landing pageee</h1>");
});
export default app;

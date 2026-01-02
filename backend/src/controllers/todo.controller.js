import { getDB } from "../config/dbconfig.js";
const getTodo = async (req, res) => {
  try {
    const pool = getDB();
    const [data] = await pool.query(`SELECT * FROM todos`);
    res.json(data);
  } catch (error) {
    console.log(`failed to retrive data from db, ${error.message}`);
    res.status(500).json({ error: "failed to fetch todos" });
  }
};
const putTodo = async (req, res) => {
  const task = req.body.task;
  const completed = req.body.completed;
  const dateAndTime = req.body.dateAndTime;
  try {
    const pool = getDB();
    await pool.query(
      "INSERT INTO todos (task,completed,dateAndTime) VALUES(?,?,?)",
      [task, completed, dateAndTime]
    );
  } catch (error) {
    console.log(`couldnt insert the data into the database,${error}`);
  }
};

export default { getTodo, putTodo };

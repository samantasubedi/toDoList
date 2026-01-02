import { getDB } from "../config/dbconfig.js";
export const getTodo = async (req, res) => {
  try {
    const pool = getDB();
    const [data] = await pool.query(`SELECT * FROM todos`);
    res.json(data);
  } catch (error) {
    console.log(`failed to retrive data from db, ${error.message}`);
    res.status(500).json({ error: "failed to fetch todos" });
  }
};
export const postTodo = async (req, res) => {
  try {
    const id = req.body.id;
    const task = req.body.task;
    const completed = req.body.completed;
    const dateAndTime = req.body.dateAndTime;
    const pool = getDB();
    await pool.query(
      "INSERT INTO todos (id,task,completed,dateAndTime) VALUES(?,?,?,?)",
      [id, task, completed, dateAndTime]
    );
    res.status(201).json({ message: "todo added" });
  } catch (error) {
    console.log(`couldnt insert the data into the database,${error}`);
  }
};

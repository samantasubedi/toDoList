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
    const dateAndTime = req.body.dateAndTime;
    const task = req.body.task;
    const completed = req.body.completed;
    const pool = getDB();
    await pool.query(
      "INSERT INTO todos (task,completed,dateAndTime) VALUES(?,?,?)",
      [task, completed, dateAndTime],
    );
    res.status(201).json({ message: "todo added" });
  } catch (error) {
    console.log(`couldn't insert the data into the database,${error}`);
  }
};

export const patchTodo = async (req, res) => {
  const id = req.body.id;

  try {
    const pool = getDB();
    const data = await pool.query("UPDATE todos  SET completed=? WHERE id=?", [
      true,
      id,
    ]);
    res.json({ message: `todo with id ${id} modified`, data });
  } catch (err) {
    console.log("cannot modify the data", err);
    res.status(400).json({ message: `todo with id ${id} modification failed` });
  }
};

export const deleteTodo = (req, res) => {
  const id = req.body.id;
  try {
    const pool = getDB();
    pool.query("DELETE FROM todos WHERE id=?", [id]);
  } catch (err) {
    console.log("cannot delete  todo", err);
  }
  res.json({ message: `todo with id ${id} deleted` });
};

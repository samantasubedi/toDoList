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
    const pool = getDB(); //its like doing pool=pool as getDB()is a function that returns pool
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
  const priority = req.body?.priority;
  if (id && !priority) {
    try {
      const pool = getDB();
      await pool.query("UPDATE todos  SET completed=? WHERE id=?", [true, id]);
      res.json({ message: `todo with id ${id} modified` });
    } catch (err) {
      console.log("cannot modify the data", err);
      res
        .status(400)
        .json({ message: `todo with id ${id} modification failed` });
    }
  } else if (id && priority) {
    try {
      const pool = getDB();
      await pool.query("UPDATE todos SET priority=? WHERE id=?", [
        priority,
        id,
      ]);
      res.json({ message: `priority set for todo ${id} as ${priority}` });
    } catch (err) {
      console.log(err);
    }
  }
};

export const deleteTodo = (req, res) => {
  const id = req.body.id;
  try {
    const pool = getDB();
    pool.query("DELETE FROM todos WHERE id=?", [id]);
    res.json({ message: `todo with id ${id} deleted` });
  } catch (err) {
    console.log("cannot delete  todo", err);
  }
};

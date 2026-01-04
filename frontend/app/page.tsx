"use client";
import { useState } from "react";

function Homepage() {
  const [input, setinput] = useState<string>("");
  const [task, settask] = useState<string[]>([]);
  const handleinputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setinput(data);
  };
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    settask((prevtask) => [...prevtask, input]);
    setinput("");
    console.log(task);
  };
  return (
    <>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          placeholder="Enter your task"
          onChange={handleinputchange}
        ></input>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
export default Homepage;

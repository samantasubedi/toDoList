"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

function Homepage() {
  const { theme, setTheme } = useTheme();
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
    <div className=" h-screen">
      <div className="flex justify-end-safe ">
        <button
          className="cursor-pointer text-3xl mr-5"
          onClick={() => {
            theme == "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          {theme == "dark" ? (
            <Icon icon="line-md:sun-rising-loop" />
          ) : (
            <Icon icon="line-md:moon-rising-alt-loop" />
          )}
        </button>
      </div>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          placeholder="Enter your task"
          onChange={handleinputchange}
        ></input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
export default Homepage;

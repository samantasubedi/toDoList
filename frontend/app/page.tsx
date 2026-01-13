"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
type todotype = {
  id: number | null;
  task: string;
  dateAndTime: string;
  completed: boolean;
};
function Homepage() {
  const { theme, setTheme } = useTheme();
  const [input, setinput] = useState<string>("");
  const [task, settask] = useState<todotype[]>([]);

  const handleinputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setinput(data);
  };
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Enter a task before adding ");
      return;
    }
    setinput("");

    try {
      await axios.post("http://localhost:3307/api/routes", {
        task: input,
        completed: false,
      });
    } catch (err) {
      console.log(`cannot insert data into the database, ${err}`);
    }
  };
  useEffect(() => {
    async function fetchdata() {
      try {
        let res = await axios.get("http://localhost:3307/api/routes");
        let fetchedData: todotype[] = res.data;
        settask(fetchedData);
        console.log("fetched data is ", fetchedData);
      } catch (err) {
        console.log(`couldnt fetch todos ${err}`);
      }
    }
    fetchdata();
  }, []);
  useEffect(() => {
    console.log("data fetched and stored is ", task);
  }, [task]);
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
            <Icon icon="line-md:moon-rising-alt-loop" />
          ) : (
            <Icon icon="line-md:sun-rising-loop" />
          )}
        </button>
      </div>
      <div className="flex justify-center ">
        <form onSubmit={handleAdd}>
          <Input
            placeholder="Add a Task"
            type="text"
            onChange={handleinputchange}
            value={input}
            className="w-100"
          />
          <Button
            type="submit"
            className="ml-6 bg-teal-700 dark:text-white font-semibold  hover:bg-teal-500 transition-colors duration-300 ease-in-out cursor-pointer"
          >
            ADD
          </Button>
        </form>
      </div>
    </div>
  );
}
export default Homepage;

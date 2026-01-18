"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
type fetchedDataType = {
  id: number | null;
  task: string;
  dateAndTime: string;
  completed: boolean;
};
type todotype = {
  id: number | null;
  task: string;
  date: string;
  time: string;
  completed: boolean;
};
function Homepage() {
  const { theme, setTheme } = useTheme();
  const [input, setinput] = useState<string>("");
  // const [task, settask] = useState<todotype[]>([]);
  const queryclient = useQueryClient();

  const handleinputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setinput(data);
  };

  async function fetchdata() {
    try {
      let res = await axios.get("http://localhost:3307/api/routes");
      let fetchedData: fetchedDataType[] = res.data;
      let todos = fetchedData.map((curr, i, arr) => {
        const dateobj = new Date(curr.dateAndTime);
        const date = dateobj.toLocaleDateString();
        const time = dateobj.toLocaleTimeString();
        const id = curr.id;
        const task = curr.task;
        const completed = curr.completed;
        return {
          id,
          task,
          date,
          time,
          completed,
        };
      });
      console.log("fetched data is ", fetchedData);
      return todos;
    } catch (err) {
      console.log(`couldnt fetch todos ${err}`);
    }
  }

  const postapi = async (input: string) => {
    try {
      await axios.post("http://localhost:3307/api/routes", {
        task: input,
        completed: false,
      });
    } catch (err) {
      console.log(`cannot insert data into the database, ${err}`);
    }
  };

  const patchtodo = async (id: number | null) => {
    try {
      axios.patch("http://localhost:3307/api/routes", { id: id });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id: number | null) => {
    try {
      await axios.delete("http://localhost:3307/api/routes", { data: { id } });
    } catch (err) {
      console.log(err);
    }
  };

  const query = useQuery({ queryFn: fetchdata, queryKey: ["todoData"] });

  const addMutation = useMutation({
    mutationFn: postapi,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["todoData"] });
      toast.success("Todo task added sucessfully!");
    },
    onError: () => {
      toast.error("Failed to add the data");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,

    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["todoData"] });
      toast.success("todo deleted sucessfully");
    },
    onError: () => {
      toast.error("Failed to delete the todo task");
    },
  });

  const patchmutation = useMutation({
    mutationFn: patchtodo,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["todoData"] });
      toast.success("Task set as completed");
    },
    onError: () => {
      toast.error("failed to update state");
    },
  });

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Enter a task before adding ");
      return;
    }
    setinput("");
    addMutation.mutate(input);
  };

  const handlePatch = (id: number | null) => {
    patchmutation.mutate(id);
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

      {query.data && (
        <div className="flex flex-col gap-10 mt-10 mr-5 ml-5 items-center">
          {query.data.map((currenttask, index, arr) => {
            return (
              <div
                key={currenttask.id}
                className={`border-2 border-amber-400 p-10 w-[50%] ${
                  currenttask.completed ? "bg-green-200" : ""
                }`}
              >
                <p>{currenttask.task}</p>
                <p>{currenttask.date}</p>
                <p>{currenttask.time}</p>
                <p> {currenttask.completed ? "completed" : "not completed"}</p>
                <div className="flex gap-5 mt-7">
                  {!currenttask.completed && (
                    <Button
                      onClick={() => {
                        handlePatch(currenttask.id);
                      }}
                      className="font-bold bg-amber-600 hover:bg-amber-400 cursor-pointer border-2 border-transparent hover:border-amber-600"
                    >
                      Set as Completed
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      deleteMutation.mutate(currenttask.id);
                    }}
                    className="bg-red-700 font-bold hover:bg-red-500 border-2 hover:border-red-700 cursor-pointer border-transparent"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Homepage;

"use client";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Empty from "@/components/ui/Empty";
import axios from "axios";
import { Dropdown } from "@/components/ui/Dropdown";
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
  const [focus, setfocus] = useState(false);
  const [input, setinput] = useState<string>("");
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
        const date = dateobj.toLocaleDateString("en-US", {
          timeZone: "Asia/Kathmandu",
        });
        const time = dateobj.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kathmandu",
        });
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
      return [];
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
  const inputrefrence = useRef<HTMLInputElement>(null);
  const [showdropdown,setshowdropdown]=useState(false)
  const [priority,setpriority]=useState("")

  return (
    <div className=" h-screen  dark:bg-black">
      <div className="flex justify-end-safe ">
        <button
          className="cursor-pointer text-3xl mr-5"
          onClick={() => {
            theme == "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          {theme == "dark" ? (
            <Icon
              icon="line-md:moon-rising-alt-loop"
              className="text-blue-500"
            />
          ) : (
            <Icon icon="line-md:sun-rising-loop" className="text-orange-700" />
          )}
        </button>
      </div>
      <div className="flex justify-center ">
        <form onSubmit={handleAdd}>
          <Input
            ref={inputrefrence}
            placeholder="Add a Task"
            type="text"
            onChange={handleinputchange}
            value={input}
            className={`w-150 border-2 border-gray-400 text-neutral-600 text-xl! h-15 dark:text-white ${focus ? "" : ""}`}
          />
          <Button
            type="submit"
            className="ml-6 bg-teal-700 dark:text-white font-semibold text-2xl h-13  hover:bg-teal-500 transition-colors duration-300 ease-in-out cursor-pointer"
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
                className={`${priority=="high"?"bg-linear-to-l from-red-100 to-red-300":priority=="medium"?"bg-linear-to-l from-amber-100 to-amber-200":"bg-linear-to-l from-teal-50 to-teal-100"} dark:shadow-gray-700 dark:bg-linear-to-l dark:from-gray-900 dark:to-gray-950 border-l-20  p-10 w-[50%] h-fit   rounded-xl hover:translate-y-2 shadow-md shadow-gray-600 transition-all duration-200  ${
                  currenttask.completed
                    ? " border-l-green-400 dark:border-l-green-800"
                    : ""
                }`}
              >
                <div className="flex justify-end">
                 
                    <button title="Options"
                    onClick={()=>{setshowdropdown(!showdropdown)}}>
                      <Icon
                        icon="bi:three-dots-vertical"
                        className="text-2xl mb-2"
                      />
                    </button>
                    {showdropdown && <Dropdown priorityfn={setpriority} dropdown={setshowdropdown}/>}
                 
                </div>
                <div className="flex justify-between gap-5">
                  <p
                    className={` p-5 w-[90%] rounded-xl font-semibold text-xl text-fuchsia-900 dark:text-white ${currenttask.completed ? "line-through" : ""}`}
                  >
                    {currenttask.task}
                  </p>
                  <div className="flex gap-10 border-b-2 border-t-2 px-6 border-teal-300 dark:bg-gray-950 bg-white rounded-4xl">
                    {!currenttask.completed && (
                      <button
                        title="Set this task as completed"
                        onClick={() => {
                          handlePatch(currenttask.id);
                        }}
                      >
                        <Icon
                          icon="octicon:tracked-by-closed-completed-16"
                          className="text-orange-500 text-3xl hover:translate-y-1 transition-all duration-200 cursor-pointer hover:text-amber-500"
                        />
                      </button>
                    )}
                    <button
                      title="Delete this task"
                      onClick={() => {
                        deleteMutation.mutate(currenttask.id);
                      }}
                    >
                      <Icon
                        icon="material-symbols:delete"
                        className="text-red-700 text-3xl hover:translate-y-1 transition-all duration-200 cursor-pointer hover:text-red-500"
                      />
                    </button>
                  </div>
                </div>
                <div className="flex  bg-white justify-between px-10 mt-3 rounded-2xl dark:bg-gray-950">
                  <div className="flex gap-2">
                    <Icon
                      icon="clarity:date-solid-badged"
                      className="text-lg"
                    />
                    <p className=" font-semibold text-gray-500 text-md">
                      {currenttask.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Icon icon="carbon:time-filled" className="text-lg" />
                    <p className=" font-semibold text-md text-gray-500">
                      {currenttask.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {query.data?.length == 0 && <Empty inputrefrence={inputrefrence} />}
    </div>
  );
}
export default Homepage;

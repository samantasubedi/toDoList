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
import { Filter } from "@/components/ui/Filter";

import moment from "moment-timezone";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type fetchedDataType = {
  id: number | null;
  task: string;
  dateAndTime: string;
  completed: 1 | 0;
  priority: string;
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

  const classNames = {
    high: "bg-linear-to-l from-red-100 to-red-300 dark:border-t-2 dark:border-b-2 dark:border-r-2 dark:border-r-red-400 dark:border-t-red-400 dark:border-b-red-400",
    medium:
      "bg-linear-to-l from-amber-100 to-amber-200 dark:border-t-2 dark:border-b-2 dark:border-r-2 dark:border-r-yellow-400 dark:border-t-yellow-400 dark:border-b-yellow-400",
    low: "bg-linear-to-l from-green-100 to-green-200 dark:border-t-2 dark:border-b-2 dark:border-r-2 dark:border-r-green-400 dark:border-t-green-400 dark:border-b-green-400",
  };

  async function fetchdata() {
    try {
      let res = await axios.get("http://localhost:3307/api/routes");
      let fetchedData: fetchedDataType[] = res.data;
      let todos = fetchedData.map((curr, i, arr) => {
        const dateobj = curr.dateAndTime;
        const dateAndTime = dateobj;
        const id = curr.id;
        const task = curr.task;
        const completed = curr.completed;
        const priority = curr.priority;
        return {
          id,
          task,
          dateAndTime,
          completed,
          priority,
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
        dateAndTime: new Date(),
      });
    } catch (err) {
      console.log(`cannot insert data into the database, ${err}`);
    }
  };

  const patchcompleted = async (id: number | null) => {
    try {
      await axios.patch("http://localhost:3307/api/routes", { id: id });
    } catch (err) {
      console.log(err);
    }
  };
  const patchpriority = async ({
    id,
    priority,
  }: {
    id: number | null;
    priority: string;
  }) => {
    try {
      await axios.patch("http://localhost:3307/api/routes", {
        id: id,
        priority: priority,
      });
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

  const query = useQuery({
    queryFn: async () => await fetchdata(),
    queryKey: ["todoData"],
  });

  const addMutation = useMutation({
    mutationFn: postapi,
    onSuccess: () => {
      query.refetch();
      toast.success("Todo task added sucessfully!");
    },
    onError: () => {
      toast.error("Failed to add the data");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      query.refetch();
      toast.success("todo deleted sucessfully");
    },
    onError: () => {
      toast.error("Failed to delete the todo task");
    },
  });

  const completedmutation = useMutation({
    mutationFn: patchcompleted,
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["todoData"] });
      toast.success("Task set as completed");
    },
    onError: () => {
      toast.error("failed to update state");
    },
  });

  const prioritymutation = useMutation({
    mutationFn: patchpriority,
    onSuccess: () => {
      query.refetch();
      toast.success("priority set sucessfully");
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

  const handlecompleted = (id: number | null) => {
    completedmutation.mutate(id);
  };

  const handlepriority = (id: number | null, priority: string) => {
    prioritymutation.mutate({ id, priority });
  };

  const inputrefrence = useRef<HTMLInputElement>(null);

  const [ids, setids] = useState<{
    editid: number | null;
    deleteid: number | null;
  }>({ editid: null, deleteid: null });

  const [filtertype, setfiltertype] = useState<string>("none");
  const alltodos = query?.data;

  const [todos, settodos] = useState<fetchedDataType[] | null>(null);

  useEffect(() => {
    if (!query.isSuccess || !query.data) return;
    const completetodos = query.data?.filter(
      (cur, i, arr) => cur.completed == 1,
    );
    const incompletetodos = query.data?.filter((cur) => cur.completed == 0);
    const highprioritytoods = query.data?.filter((cur) => {
      return cur.priority == "high";
    });
    const mediumprioritytoods = query.data?.filter((cur) => {
      return cur.priority == "medium";
    });
    const lowprioritytoods = query.data?.filter((cur) => {
      return cur.priority == "low";
    });

    console.log(completetodos, filtertype);

    if (filtertype == "none" && alltodos) {
      settodos(() => alltodos);
    } else if (filtertype == "complete") {
      settodos(completetodos);
    } else if (filtertype == "incomplete") {
      settodos(incompletetodos);
    } else if (filtertype == "high priority") {
      settodos(highprioritytoods);
    } else if (filtertype == "medium priority") {
      settodos(mediumprioritytoods);
    } else if (filtertype == "low priority") {
      settodos(lowprioritytoods);
    }
  }, [filtertype, query.data, query.isSuccess]);

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
      {query.data?.length !== 0 && (
        <div className="flex justify-center mt-10">
          <Filter filter={setfiltertype} />
        </div>
      )}
    { (query.data?.length !== 0 && filtertype !=="none") && <div className="flex gap-2 w-[60%] justify-center">
        <span className={`flex gap-2  p-2 rounded-md ${filtertype=="low priority"?"dark:bg-gray-800 dark:border-2 dark:border-green-800 dark:border-dotted bg-green-300":filtertype=="medium priority"?"dark:bg-gray-800 dark:border-2 dark:border-yellow-500 dark:border-dotted bg-yellow-200":filtertype=="high priority"?"dark:bg-gray-800 dark:border-2 dark:border-red-800 dark:border-dotted bg-red-300":filtertype=="complete"?"dark:bg-gray-800 dark:border-2 dark:border-teal-800 dark:border-dotted bg-teal-300":filtertype=="incomplete"?"dark:bg-gray-800 dark:border-2 dark:border-orange-800 dark:border-dotted bg-orange-300":""}`} >
          <div className="leading-none">{filtertype}</div>
          <button className="cursor-pointer" onClick={()=>{setfiltertype("none")}}>
            <Icon icon="oui:cross-in-circle-filled" />
          </button>
        </span>
      </div>}

      {query.data?.length !== 0 && (
        <div className="flex flex-col gap-10 mt-10 mr-5 ml-5 items-center">
          {todos?.map((currenttask, index, arr) => {
            return (
              <div
                key={currenttask.id}
                className={cn(
                  `bg-linear-to-l from-cyan-100 to-cyan-50  dark:shadow-gray-700 dark:bg-linear-to-l dark:from-gray-900 dark:to-gray-950 border-l-20  p-10 w-[50%] h-fit    rounded-xl hover:translate-y-2 shadow-md shadow-gray-600 transition-all duration-200 `,
                  currenttask.completed &&
                    "border-l-green-400 dark:border-l-emerald-700",
                  currenttask.priority == "high" && classNames.high,
                  currenttask.priority == "medium" && classNames.medium,
                  currenttask.priority == "low" && classNames.low,
                )}
              >
                <div className="flex justify-end">
                  <Dropdown
                    id={currenttask.id}
                    handlepriority={handlepriority}
                  />
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
                          handlecompleted(currenttask.id);
                          setids({ editid: currenttask.id, deleteid: null });
                        }}
                      >
                        <Icon
                          icon={
                            completedmutation.isPending &&
                            currenttask.id == ids.editid
                              ? "codex:loader"
                              : "octicon:tracked-by-closed-completed-16"
                          }
                          className={cn(
                            "text-orange-500 text-3xl hover:translate-y-1 transition-all duration-200 cursor-pointer hover:text-amber-500",
                          )}
                        />
                      </button>
                    )}
                    <button
                      title="Delete this task"
                      disabled={deleteMutation.isPending}
                      onClick={() => {
                        setids({ editid: null, deleteid: currenttask.id });
                        deleteMutation.mutate(currenttask.id);
                      }}
                    >
                      <Icon
                        icon={
                          deleteMutation.isPending &&
                          ids.deleteid == currenttask.id
                            ? "codex:loader"
                            : "material-symbols:delete"
                        }
                        className={cn(
                          "text-red-700 text-3xl hover:translate-y-1 transition-all duration-200 cursor-pointer hover:text-red-500",
                        )}
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
                      {moment(currenttask.dateAndTime).format("YYYY-MM-DD ")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Icon icon="carbon:time-filled" className="text-lg" />
                    <p className=" font-semibold text-md text-gray-500">
                      {moment(currenttask.dateAndTime).format("hh-mm a")}
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

import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "./button";
import { RefObject } from "react";
type inputrefrencetype = {
  inputrefrence: RefObject<HTMLInputElement | null>;
};

const Empty = ({ inputrefrence }: inputrefrencetype) => {
  return (
    <div className="flex justify-center mt-15 ml-2 mr-2">
      <div className="flex flex-col gap-5   dark:bg-linear-to-br dark:from-gray-900 dark:to-neutral-900  bg-linear-to-br from-fuchsia-200 to-green-200 p-10 rounded-2xl  ">
        <div className="flex justify-center">
          <Icon
            icon="hugeicons:task-done-02"
            className="text-8xl text-fuchsia-900 dark:text-fuchsia-300"
          />
        </div>
        <div className="md:text-6xl text-3xl textblue-900 text-center font-bold font-serif text-emerald-800 dark:text-emerald-400">
          All Clear !
        </div>
        <p className="font-semibold md:text-2xl text-sm text-center text-gray-600 dark:text-neutral-400">
          Your task list is empty. Start planning your next big goal by adding a
          task.
        </p>
        <Button
          onClick={() => {
            inputrefrence.current?.focus();
          }}
          className=" dark:text-white font-semibold  bg-fuchsia-700 hover:shadow-md shadow-fuchsia-900 hover:bg-fuchsia-500 transition-all duration-300 md:text-xl text-md cursor-pointer h-10"
        >
          + Create your First Task
        </Button>
      </div>
    </div>
  );
};

export default Empty;

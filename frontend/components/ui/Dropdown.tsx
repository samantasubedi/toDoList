import React from "react";
import { useState } from "react";
type proptype = {
  priorityfn: React.Dispatch<React.SetStateAction<string>>;
  dropdown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Dropdown = ({ priorityfn, dropdown }: proptype) => {
  const [subdropdown, setsubdropdown] = useState(false);
  return (
    <div className="relative z-10">
      <div className="absolute">
        <button
          className=" dark:bg-neutral-600 dark:text-white  bg-blue-300 font-semibold text-gray-700 p-2  w-40 rounded-t-xl"
          onClick={() => {
            setsubdropdown(!subdropdown);
          }}
        >
          Set Priority
        </button>
        {subdropdown && (
          <div className="flex flex-col gap-2 bg-linear-to-br from-blue-200 to-blue-300 p-2 rounded-b-xl dark:bg-linear-to-br dark:from-neutral-700 dark:to-neutral-900">
            <button
              onClick={() => {
                priorityfn("high")
                dropdown(false);
              }}
              className="bg-linear-to-br from-red-300 to-red-700 text-white rounded-md font-semibold"
            >
              High
            </button>
            <button
              onClick={() => {
                priorityfn("medium")
                dropdown(false);
              }}
              className="bg-linear-to-br from-amber-300 to-amber-700 text-white rounded-md font-semibold"
            >
              Medium
            </button>
            <button
              onClick={() => {
                priorityfn("low")
                dropdown(false);
              }}
              className="bg-linear-to-br from-emerald-300 to-emerald-800 text-white rounded-md font-semibold"
            >
              Low
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

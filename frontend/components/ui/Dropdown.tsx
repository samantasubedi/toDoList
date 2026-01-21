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
          className="bg-blue-300 font-semibold text-gray-700 p-2  w-40 rounded-t-xl"
          onClick={() => {
            setsubdropdown(!subdropdown);
          }}
        >
          Set Priority
        </button>
        {subdropdown && (
          <div className="flex flex-col gap-2 bg-blue-200 p-2 rounded-b-xl">
            <button
              onClick={() => {
                priorityfn("high")
                dropdown(false);
              }}
              className="bg-red-400 text-white rounded-md font-semibold"
            >
              High
            </button>
            <button
              onClick={() => {
                priorityfn("medium")
                dropdown(false);
              }}
              className="bg-amber-400 text-white rounded-md font-semibold"
            >
              Medium
            </button>
            <button
              onClick={() => {
                priorityfn("low")
                dropdown(false);
              }}
              className="bg-emerald-400 text-white rounded-md font-semibold"
            >
              Low
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

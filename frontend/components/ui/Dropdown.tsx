import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
type proptype = {
  id: number | null;
  handlepriority: (id: number | null, priority: string) => void;
};

export const Dropdown = ({ id, handlepriority }: proptype) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger >
          <Icon icon="bi:three-dots-vertical" className="text-2xl mb-2" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Priority</DropdownMenuLabel>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem onClick={()=>{handlepriority(id,"high")}} className="bg-red-100 hover:bg-red-200! transition-colors duration-300 cursor-pointer">High</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{handlepriority(id,"medium")}} className="bg-amber-100 mt-1 mb-1 hover:bg-amber-200! transition-colors duration-300 cursor-pointer">
            medium
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{handlepriority(id,"low")}} className="bg-green-100 hover:bg-green-200! transition-colors duration-300 cursor-pointer">Low</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>

    // <div className="relative z-10">
    //   <div className="absolute">
    //     <button
    //       className=" dark:bg-neutral-600 dark:text-white  bg-blue-300 font-semibold text-gray-700 p-2  w-40 rounded-t-xl"
    //       onClick={() => {
    //         setsubdropdown(!subdropdown);
    //       }}
    //     >
    //       Set Priority
    //     </button>
    //     {subdropdown && (
    //       <div className="flex flex-col gap-2 bg-linear-to-br from-blue-200 to-blue-300 p-2 rounded-b-xl dark:bg-linear-to-br dark:from-neutral-700 dark:to-neutral-900">
    //         <button
    //           onClick={() => {
    //             handlepriority(id,"high")

    //             dropdown(false);
    //           }}
    //           className="bg-linear-to-br from-red-300 to-red-700 text-white rounded-md font-semibold"
    //         >
    //           High
    //         </button>
    //         <button
    //           onClick={() => {
    //             handlepriority(id,"medium")

    //             dropdown(false);
    //           }}
    //           className="bg-linear-to-br from-amber-300 to-amber-700 text-white rounded-md font-semibold"
    //         >
    //           Medium
    //         </button>
    //         <button
    //           onClick={() => {
    //             handlepriority(id,"low")

    //             dropdown(false);
    //           }}
    //           className="bg-linear-to-br from-emerald-300 to-emerald-800 text-white rounded-md font-semibold"
    //         >
    //           Low
    //         </button>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

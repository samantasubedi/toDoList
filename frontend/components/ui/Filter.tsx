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
import { Button } from "./button";
import { Icon } from "@iconify/react";
export const Filter = ({
  filter,
}: {
  filter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="dark:bg-neutral-800 dark:text-white text-lg bg-blue-900 font-bold hover:bg-blue-800 cursor-pointer transition-all duration-300 ease-in-out">
            <span> Filter</span> <Icon icon="flowbite:filter-outline" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="bg bg-gray-200 dark:bg-gray-700">
            Filter By
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="dark:bg-gray-800 font-semibold hover:dark:bg-gray-950!  bg-gray-100 cursor-pointer hover:bg-gray-200! transition-all duration-250">
              Completion
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => {
                  filter("complete");
                }}
                className="dark:bg-gray-800 font-semibold hover:dark:bg-gray-950!  bg-neutral-100 mb-1  hover:bg-gray-200! transition-all duration-250"
              >
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  filter("incomplete");
                }}
                className="dark:bg-gray-800 font-semibold hover:dark:bg-gray-950!  bg-neutral-100  hover:bg-gray-200! transition-all duration-250"
              >
                Not Completed
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="dark:bg-gray-800 font-semibold hover:dark:bg-gray-950!  bg-gray-100 mt-1  hover:bg-gray-200! transition-all duration-250">
              Priority
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => {
                  filter("high");
                }}
                className="dark:bg-gray-800 font-semibold hover:dark:bg-gray-950!  bg-neutral-100  hover:bg-gray-200! transition-all duration-250"
              >
                High
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  filter("medium");
                }}
                className="dark:bg-gray-800 font-semibold hover:dark:bg-gray-950!  bg-neutral-100 mt-1 mb-1  hover:bg-gray-200! transition-all duration-250"
              >
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  filter("low");
                }}
                className="dark:bg-gray-800 font-semibold hover:dark:bg-gray-950!  bg-neutral-100  hover:bg-gray-200! transition-all duration-250"
              >
                Low
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

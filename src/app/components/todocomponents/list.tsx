"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListProps } from "@/app/components/types";
import { db, List } from "@/app/models/db";
export default function TaskComponent(props: ListProps) {
  const [listName, setListname] = useState("");
  // const [currentList,setCurrentList]=useState<List|"All">("All")

  function handleInputChange(event: any) {
    setListname(event.target.value);
  }

  return (
    <div className="h-screen hide-scrollbar  outline outline-zinc-100 w-[500px] overflow-y-scroll   box-border p-6 ">
      <div className="flex gap-2 w-80  justify-between">
        <Input
          onChange={handleInputChange}
          className="w-full"
          id="name"
          placeholder="Add List"
          value={listName}
        />
        <Button
          onClick={() => {
            db.todoLists.add({ name: listName });
            // toast(listName + " added");
            console.log(props.lists);
            setListname("");
          }}
          variant={"default"}
        >
          Addd
        </Button>
      </div>
      <div className="flex flex-col gap-2 w-80 pt-2">
        <Button
          onClick={() => props.onClick("All")}
          variant={props.slectedList == "All" ? "default" : "outline"}
          className="h-10 border rounded-md"
        >
          <p className="px-4 py-2 text-sm">All</p>
        </Button>
        <Button
          onClick={() => props.onClick("Today")}
          variant={props.slectedList == "Today" ? "default" : "outline"}
          className="h-10 border rounded-md"
        >
          <p className="px-4 py-2 text-sm">Today</p>
        </Button>
        {props.lists.map((List, index) => (
          <Button
            onClick={() => props.onClick(List)}
            variant={props.slectedList == List ? "default" : "outline"}
            className="h-10 border rounded-md"
          >
            <p className="px-4 py-2 text-sm">{List.name}</p>
          </Button>
        ))}
      </div>
    </div>
  );
}

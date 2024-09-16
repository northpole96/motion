"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListProps } from "@/app/components/types";
import { db, List } from "@/app/models/db";
import { Trash2, EllipsisVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { taskByList } from "@/app/components/types";
export default function TaskComponent(props: ListProps) {
  const [listName, setListname] = useState("");
  const [renameValue, setRenameValue] = useState("");
  const[isOpen,setIsOpen]=useState(false)
  // const [currentList,setCurrentList]=useState<List|"All">("All")
  function handleInputChange(event: any) {
    setListname(event.target.value);
  }
  function handleRenameInputChange(event: any) {
    setRenameValue(event.target.value);
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      db.todoLists.add({ name: listName });
      // toast(listName + " added");
      console.log(props.lists);
      setListname("");
    }
  };

  return (
    <div className="h-screen hide-scrollbar  outline outline-zinc-100 w-[500px] overflow-y-scroll   box-border p-6 ">
      <div className="flex gap-2 w-80  justify-between">
        <Input
          onChange={handleInputChange}
          className="w-full"
          id="name"
          placeholder="Add List"
          value={listName}
          onKeyDown={handleKeyPress}
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
          Add
        </Button>
      </div>
      <div className="flex flex-col gap-2 w-80 pt-2">
        <Button
          onClick={() => props.onClick("All")}
          variant={props.slectedList == "All" ? "default" : "outline"}
          className="h-10 border rounded-md"
        >
          <p className="px-4 py-2 text-sm">
            All {taskByList("All", props.tasks)}
          </p>
        </Button>
        <Button
          onClick={() => props.onClick("Today")}
          variant={props.slectedList == "Today" ? "default" : "outline"}
          className="h-10 border rounded-md"
        >
          <p className="px-4 py-2 text-sm">
            Today {taskByList("Today", props.tasks)}
          </p>
        </Button>
        <Button
          onClick={() => props.onClick("Today")}
          variant={props.slectedList == "Today" ? "default" : "outline"}
          className="h-10 border rounded-md"
        >
          <p className="px-4 py-2 text-sm">
            Next 7 days {taskByList("Today", props.tasks)}
          </p>
        </Button>
        {props.lists.map((List, index) => (
          <Button
            onClick={() => props.onClick(List)}
            variant={props.slectedList == List ? "default" : "outline"}
            className="h-10 border rounded-md group"
          >
            <span className="mr-auto">{List.name}</span>{" "}
            <span className="   ">{taskByList(List, props.tasks)}</span>
            <Trash2
              onClick={() => db.deleteList(List.id!)}
              className=" h-4 w-4 mx-2 "
            />
            <Dialog
            

              onOpenChange={(op) => {
                if (op) {
                  setRenameValue(List.name);
                }
                setIsOpen(isOpen)
              }}
            >
              <DialogTrigger >
                <span>Rename</span>
              </DialogTrigger>
              <DialogContent className="">
                <div className="flex gap-2 w-full p-4  justify-between">
                  <Input
                    onChange={handleRenameInputChange}
                    className="w-full"
                    id="name"
                    placeholder="Update List Name"
                    value={renameValue}
                    // onKeyDown={handleKeyPress}
                  />
                  <Button
                    onClick={() => {
                      db.updateListName(List.id!,renameValue)
                      setRenameValue("");
                      setIsOpen(false)

                    }}
                    variant={"default"}
                  >
                    Update
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </Button>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { db, List, Task } from "@/app/models/db";
import { useLiveQuery } from "dexie-react-hooks";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { TaskProps } from "@/app/components/types";

export default function TaskComponent(props: TaskProps) {
  const [date, setdate] = useState<Date>();
  const [taskName, setTaskName] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<List | undefined>(undefined);
  const dropDownArray = props.lists.map((x) => {
    value: x;
    label: x.name;
  });
  function handleTaskInputChange(event: any) {
    setTaskName(event.target.value);
  }
  function filter(task: Task): boolean {
    if (props.slectedList == "All") {
      return true;
    } else if (
      props.slectedList == "Today" &&
      task.dateAdded?.getFullYear()! === new Date().getFullYear() &&
      task.dateAdded?.getMonth()! === new Date().getMonth() &&
      task.dateAdded?.getDate()! === new Date().getDate()
    ) {
      return true;
    } else if (
      typeof props.slectedList == "object" &&
      props.slectedList.id == task.todoListId
    ) {
      return true;
    } else return false;
  }

  // console.log(props.lists);

  return (
    <div className=" w-full flex flex-col justify-start pt-[200px] items-center overflow-y-scroll hide-scrollbar">
      <div className="flex  gap-2  w-[600px] ">
        <Input
          onChange={handleTaskInputChange}
          className="w-full"
          id="name"
          placeholder="Add Task"
          value={taskName}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(val) => setdate(val)}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? props.lists.find((framework) => framework.name === value.name)
                    ?.name
                : "Select List"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              {/* <CommandInput placeholder="Search framework..." /> */}
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {props.lists.map((task) => (
                    <CommandItem
                      key={task.id}
                      value={task.id?.toString()}
                      onSelect={() => {
                        setValue(value?.id === task.id ? undefined : task);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === task ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {task.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => {
            db.todoTasks.add({
              name: taskName,
              todoListId: value?.id!,
              dateAdded: date,
            });

            // toast(taskName + " added");
            console.log(props.tasks);
            setTaskName("");
          }}
          variant={"default"}
        >
          Add
        </Button>
      </div>
      <div className="flex flex-col gap-2  w-[600px] pt-2">
        {props.tasks.filter(filter).map((task, index) => (
          <div className="h-10 border rounded-md">
            <p className="px-4 py-2 text-sm">{task.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

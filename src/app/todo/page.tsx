"use client";
import type { List, Task } from "@/app/models/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { log } from "console";
// import { div, li, p } from "framer-motion/client";
import { useState } from "react";
import { toast } from "sonner";
import TaskComponent from "@/app/components/todocomponents/task";
import ListComponent from "@/app/components/todocomponents/list";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/app/models/db";

export default function Page() {
  const lists = useLiveQuery(() => db.todoLists.toArray());
  const tasks = useLiveQuery(() => db.todoTasks.toArray());
  const [selectedList, setSelectedList] = useState<List | "All"|"Today">("All");
  function addList(listName: string) {
    const newList: List = { name: listName };
  }

  if (!lists || !tasks) return null;

  return (
    <div className=" h-screen w-screen  flex  ">
      <ListComponent
        onClick={(p) => {
          setSelectedList(p);
          console.log(selectedList);
        }}
        slectedList={selectedList}
        lists={lists}
        tasks={tasks}
      />
      <TaskComponent slectedList={selectedList} tasks={tasks!} lists={lists!} />
    </div>
  );
}

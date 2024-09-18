import type { List, Task } from "@/app/models/db";
export interface ListProps {
  lists: List[];
  tasks: Task[];
  slectedList: List | "All" | "Today"|"Completed";
  onClick: (param: List | "All" | "Today"|"Completed") => void;
}
export interface TaskProps {
  tasks: Task[];
  lists: List[];
  slectedList: List | "All" | "Today"|"Completed";
}

export function taskByList(
  lists: List | "All" | "Today" | "Completed",
  tasks: Task[]
): number {
  if (lists == "All") {
    return tasks.length;
  } else if ((lists = "Completed")) {
    const completedTasks=tasks.filter((task)=>task.isCOmpleted==true)
    return completedTasks.length;
  } else if (lists == "Today") {
    const todaytasks = tasks.filter(
      (task) =>
        task.dateAdded?.getFullYear()! === new Date().getFullYear() &&
        task.dateAdded?.getMonth()! === new Date().getMonth() &&
        task.dateAdded?.getDate()! === new Date().getDate()
    );
    return todaytasks.length;
  } else {
    const listedTasks = tasks.filter((task) => task.todoListId == lists.id);
    return listedTasks.length;
  }
}

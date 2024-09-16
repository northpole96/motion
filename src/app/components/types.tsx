import type { List, Task } from "@/app/models/db";
export interface ListProps {
  lists: List[];
  tasks: Task[];
  slectedList: List | "All" | "Today";
  onClick: (param: List | "All" | "Today") => void;
}
export interface TaskProps {
  tasks: Task[];
  lists: List[];
  slectedList: List | "All" | "Today";
}

export function taskByList(
  lists: List | "All" | "Today",
  tasks: Task[]
): number {
  if (lists == "All") {
    return tasks.length;
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

import type { List, Task } from "@/app/models/db";
export interface ListProps {
  lists: List[];
  tasks: Task[];
  slectedList: SelectedListType;
  onClick: (param: SelectedListType) => void;
}
export interface TaskProps {
  tasks: Task[];
  lists: List[];
  slectedList: SelectedListType;
}
type SelectedListType = List | "All" | "Today" | "Completed" | "7 days";
export function taskByList(lists: SelectedListType, tasks: Task[]): number {
  if (lists == "All") {
    return tasks.length;
  } else if ((lists = "Completed")) {
    const completedTasks = tasks.filter((task) => task.isCOmpleted == true);
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
    const listedTasks = tasks.filter((task) => {
      if (typeof lists == "object") {
        lists.id == task.todoListId;
      }
    });
    return listedTasks.length;
  }
}
export function inNext7Days(tasks: Task[]): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next7Days = new Date(today);
  next7Days.setDate(today.getDate() + 7);
  const filteredTasks = tasks.filter((task) => {
    if (task.dateAdded == undefined) {
      return false;
    } else {
      return task.dateAdded >= today && task.dateAdded <= next7Days;
    }
  });
  return filteredTasks.length;
}

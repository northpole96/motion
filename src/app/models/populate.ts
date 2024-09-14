import { db } from "./db";

export async function populate() {
  const todoListId = await db.todoLists.add({name:"Block"})
  await db.todoTasks.bulkAdd([
    {
      todoListId,
      name: "Feed the birds"
    },
    {
      todoListId,
      name: "Watch a movie"
    },
    {
      todoListId,
      name: "Have some sleep"
    }
  ]);
}

// db.ts
import Dexie, { Table, type EntityTable } from 'dexie';
import { populate } from "./populate";

export interface Task {
  id?: number;
  name: string;
  todoListId:number;
  dateAdded?:Date

}
export interface List{
id?:number;
name:string;
}

export class TodoDB extends Dexie{
    todoTasks!:Table<Task,number>
    todoLists!:Table<List,number>

    constructor() { 
        super('TodoDB');
        this.version(1).stores({
          todoLists: '++id',
          todoTasks: '++id, todoListId'
        });
      }

      deleteList(todoListId: number) {
        return this.transaction('rw', this.todoTasks, this.todoLists, () => {
          this.todoTasks.where({ todoListId }).delete();
          this.todoLists.delete(todoListId);
        });
      }

}



export const db=new TodoDB()
db.on('populate', populate);


export function resetDatabase() {
    return db.transaction('rw', db.todoLists, db.todoTasks, async () => {
      await Promise.all(db.tables.map(table => table.clear()));
      await populate();
    });
  }



// const db = new Dexie('TasksDatabase') as Dexie & {
//   tasks: EntityTable<
//     Task,
//     'id' // primary key "id" (for the typings only)
//   >;
// };

// // Schema declaration:
// db.version(1).stores({
//   tasks: '++id, name' // primary key "id" (for the runtime!)
// });

// export type { Task };
// export { db };
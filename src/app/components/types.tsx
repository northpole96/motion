import type{ List,Task } from "@/app/models/db";
export interface ListProps{
lists:List[]    
slectedList:List|"All"|"Today"
onClick:(param:List|"All"|"Today")=>void

}
export interface TaskProps{
    tasks:Task[]
    lists:List[]
    slectedList:List|"All"|"Today"


}
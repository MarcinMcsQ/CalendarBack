import { TaskEntity } from "../../src/task/entities/task.entity";

export enum taskType {
  work = "work",
  friends = "friends family",
  development = "personal development",
  health = "health and sport",
  hobby = "hobby",
  other = "other",
  all = "all"
}

export type TaskType =
  taskType.work |
  taskType.friends |
  taskType.development |
  taskType.health |
  taskType.hobby |
  taskType.other|
  taskType.all;

export enum taskTypeDb {
  work = "work",
  friends = "friends family",
  development = "personal development",
  health = "health and sport",
  hobby = "hobby",
  other = "other",
}

export type TaskTypeDb =
  taskType.work |
  taskType.friends |
  taskType.development |
  taskType.health |
  taskType.hobby |
  taskType.other;


export interface TaskFormData {
  id?: string | null;
  userId?:string;
  date: string;
  location?: string;
  title?: string;
  taskType?: TaskTypeDb ;
  important?: boolean;
  description?: string ;
  atHour?: number | null;
  atMinute?: number | null;
}

export type TaskCreateResponse = {
  success: boolean,
  task: TaskEntity,
}
export type GetAllTasksResponse = {
  success:boolean;
  tasks:TaskFormData[];
}
export type TaskUpdateResponse ={
  success:boolean,
}
export type TaskRemoveResponse = {
  success:boolean;
  remove?:string;
}





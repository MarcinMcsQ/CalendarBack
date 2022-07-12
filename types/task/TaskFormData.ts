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

export interface TaskFormData{
  id?: string | null;
  date: string | null;
  location: string;
  title: string;
  taskType: TaskType;
  important: boolean;
  description: string;
  atHour: number | null;
  atMinute: number | null;
}



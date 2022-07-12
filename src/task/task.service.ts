import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskEntity } from "./entities/task.entity";
import { v4 as uuid } from "uuid";
import {
  GetAllTasksResponse, TaskCreateResponse,
  TaskFormData, TaskRemoveResponse,
  TaskUpdateResponse,
  User
} from "types";

@Injectable()
export class TaskService {

  async create(createTask: TaskFormData, user: User):Promise<TaskCreateResponse> {

    try {
      const newTask = new TaskEntity();
      do {
        newTask.id = uuid();
      } while (await TaskEntity.findOne({ where: { id: newTask.id } }));
      newTask.userId = user.id;
      newTask.date = new Date(createTask.date);
      newTask.location = createTask.location;
      newTask.title = createTask.title;
      newTask.taskType = createTask.taskType;
      newTask.important = createTask.important;
      newTask.description = createTask.description;
      newTask.atHour = createTask.atHour;
      newTask.atMinute = createTask.atMinute;

      await newTask.save();

      newTask.userId = undefined;

      return {
        success: true,
        task: newTask
      };
    }catch (err){
      console.error(err)
      throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findAll(user: User):Promise<GetAllTasksResponse>{

    try {
      const all = await TaskEntity.find({ where: { userId: user.id }}) as TaskFormData[];
      const tasks = all.map(item => ({...item, userId:undefined}));
      return {
        success:true,
        tasks
      };
    }catch (err){
      console.error(err)
      throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async update(id: string, updateTask: UpdateTaskDto):Promise<TaskUpdateResponse> {

    try {
      const taskFind = await TaskEntity.findOne({where:{id}})

      taskFind.date = new Date(updateTask.date);
      taskFind.location = updateTask.location;
      taskFind.title = updateTask.title;
      taskFind.taskType = updateTask.taskType;
      taskFind.important = updateTask.important;
      taskFind.description = updateTask.description;
      taskFind.atHour = updateTask.atHour;
      taskFind.atMinute = updateTask.atMinute;

      taskFind.save()

      return {
        success:true,
      }

    }catch (err){
      console.error(err)
      throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

 async  remove(id: string):Promise<TaskRemoveResponse> {
    try {
      const deleteId = await TaskEntity.delete({id:id})
      if(deleteId.affected === 1){
        return{
          success:true,
          remove:id
        }
      }else{
        return{
          success:false,
        }
      }
    }catch (err){
      console.error(err)
      throw new HttpException('Something wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

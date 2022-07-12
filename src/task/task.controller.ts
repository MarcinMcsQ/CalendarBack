import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { UserObject } from "../decorators/user-object.decorator";
import {
  GetAllTasksResponse,
  TaskCreateResponse,
  TaskRemoveResponse,
  TaskUpdateResponse,
  User
} from "types";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post("/")
  async create(
    @UserObject() user: User,
    @Body() createTaskDto: CreateTaskDto
  ):Promise<TaskCreateResponse> {
    return await this.taskService.create(createTaskDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/")
  async findAll(
    @UserObject() user: User,
  ):Promise<GetAllTasksResponse> {
    return await this.taskService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("/:id")
  async update(
    @UserObject() user: User,
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ):Promise<TaskUpdateResponse> {
    return await this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  async remove(
    @UserObject() user: User,
    @Param("id") id: string
  ):Promise<TaskRemoveResponse> {
    return await this.taskService.remove(id);
  }
}

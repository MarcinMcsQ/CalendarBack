import { TaskFormData, TaskTypeDb } from "../../../types";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";



export class CreateTaskDto implements TaskFormData{
  @IsDateString()
  date: string ;

  @IsString()
  location: string;

  @IsString()
  title: string;

  @IsString()
  taskType: TaskTypeDb;

  @IsBoolean()
  important: boolean;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  atHour: number | null;

  @IsOptional()
  @IsNumber()
  atMinute: number | null;
}

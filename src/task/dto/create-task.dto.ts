import { TaskFormData, TaskTypeDb } from "../../../types";
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";



export class CreateTaskDto implements TaskFormData{
  @IsDateString()
  date: string ;

  @IsOptional()
  @IsString()
  location: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  taskType: TaskTypeDb;

  @IsOptional()
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

import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { taskType, TaskType } from "types";
import { UserEntity } from "../../user/entities/user.entity";


@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index()
  @Column()
  userId:string;

  @Column({
    type: "date"
  })
  date: Date | "";

  @Column({
    length: 255
  })
  location: string;

  @Column({
    length: 255,
  })
  title: string;

  @Column({
    type:'enum',
    enum:taskType,
    default:'all',
  })
  taskType: TaskType;

  @Column({
    type:'boolean',
    default:false
  })
  important: boolean;

  @Column({
    type:"text",
    nullable: true,
    default: null,
  })
  description: string;

  @Column({
    type: "int",
  })
  atHour: number;

  @Column({
    type: "int",
  })
  atMinute: number;

  @ManyToOne(() => UserEntity, user => user.tasks)
  user: UserEntity;
}

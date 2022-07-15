import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskTypeDb, taskTypeDb } from "../../../types";
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
    enum:taskTypeDb,
    default:'other',
  })
  taskType: TaskTypeDb;

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
    nullable: true,
    default: null,
  })
  atHour: number | null;

  @Column({
    nullable: true,
    default: null,
  })
  atMinute: number | null;

  @ManyToOne(() => UserEntity, user => user.tasks)
  user: UserEntity;
}

import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {
  optionsAccountSelect,
  OptionsAccountSelect,
  optionsAccountSelectEnum, optionsProvinceSelect,
  OptionsProvinceSelect,
  optionsProvinceSelectEnum, optionsSexSelect,
  OptionsSexSelect, optionsSexSelectEnum, TaskFormData
} from "../../../types";
import { Collection } from "@nestjs/cli/lib/schematics";
import { TaskEntity } from "../../task/entities/task.entity";


@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 255
  })
  nick: string;

  @Column({
    length: 255,
    nullable: true,
    default: null
  })
  name: string;

  @Index()
  @Column({
    length: 255
  })
  email: string;

  @Column({
    nullable: true,
    default: null,
    type: "date"
  })
  dateOfBirth: Date | "";

  @Column({
    type: "enum",
    enum: optionsSexSelect
  })
  sex: OptionsSexSelect | "";


  @Column({
    type: "enum",
    enum: optionsProvinceSelect,
    nullable: true,
    default: null,
  })
  province: OptionsProvinceSelect | "" | null = null;

  @Column({
    type: "enum",
    enum: optionsAccountSelect,
    default: optionsAccountSelectEnum.PRIVATE
  })
  accountPublic: OptionsAccountSelect | "";

  @Column()
  pwdHash: string;

  @Column({
      nullable: true,
      default: null
    }
  )
  currentTokenId: string | null;

  @Column({
    default: "user"
  })
  rank: string;

  @OneToMany(() => TaskEntity, task => task.user)
  tasks: TaskFormData[];
}

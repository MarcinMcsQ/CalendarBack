import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {
    optionsAccountSelect,
    OptionsAccountSelect,
    optionsAccountSelectEnum, optionsProvinceSelect,
    OptionsProvinceSelect,
    optionsProvinceSelectEnum, optionsSexSelect,
    OptionsSexSelect, optionsSexSelectEnum
} from "../../types";
import { Collection } from "@nestjs/cli/lib/schematics";


@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nick:string;

    @Column()
    name:string;

    @Column({
        length: 255,
    })
    email: string;

    @Column({
        type:"date"
    })
    dateOfBirth:Date | '';

    @Column({
        type:"enum",
        enum:optionsSexSelect
    })
    sex: OptionsSexSelect | '';

    @Column({
        type:'enum',
        enum:optionsProvinceSelect
    })
    province:OptionsProvinceSelect | '';

    @Column({
        type:'enum',
        enum:optionsAccountSelect
    })
    accountPublic:OptionsAccountSelect | '';

    @Column({
        nullable: true,
        default: null
    })
    pwdHash: string;

    @Column({
            nullable: true,
            default: null
        }
    )
    currentTokenId: string | null;

    @Column()
    rank: string;
}

import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Patient} from "../../patients/entities/patient.entity";
import {Doctor} from "../../doctors/entities/doctor.entity";
import {Role} from "../user-role.enum";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 25})
    first_name: string

    @Column({length: 25})
    last_name: string

    @Column({
        nullable: true,
    })
    birthdate: Date

    @Column({
        type: 'enum',
        enum: Role,
    })
    public role: Role

    @Column({
        nullable: true,
    })
    gender: string

    @Column({
        nullable: true,
    })
    address: string

    @Column({
        nullable: true,
    })
    photo: string;

    @Column({
        nullable: true,
    })
    phone: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(
        () => Patient, (patient) => patient.user
    ) // specify inverse side as a second parameter
    patient: Patient

    @OneToOne(
        () => Doctor, (doctor) => doctor.user
    ) // specify inverse side as a second parameter
    doctor: Doctor

}

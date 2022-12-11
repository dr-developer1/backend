import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PatientEntity} from "../../patients/entities/patient.entity";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 25 })
    first_name:string

    @Column({ length: 25 })
    last_name:string

    @Column('date')
    birthdate:Date

    @Column()
    role:string

    @Column()
    gender:string

    @Column()
    address:string

    @Column()
    photo:string;

    @Column()
    phone:string

    @Column({ unique: true })
    email:string

    @Column()
    password

    @Column()
    @CreateDateColumn()
    createdAt: Date

    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    @OneToOne(
        () => PatientEntity, (patient) => patient.user
    ) // specify inverse side as a second parameter
    @JoinColumn()
    patient: PatientEntity

}
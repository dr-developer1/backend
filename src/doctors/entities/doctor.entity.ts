import {BaseEntity, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Speciality} from "../../specialities/entities/speciality.entity";
import {Department} from "../../departments/entities/department.entity";
import {Appointment} from "../../appointments/entities/appointment.entity";
import {Schedule} from "../../schedules/entities/schedule.entity";

@Entity('doctors')
export class Doctor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(
        () => User, (user) => user.doctor,
        { onDelete: 'CASCADE' }
    ) // specify inverse side as a second parameter
    @JoinColumn()
    user: User

    @ManyToOne(
        () => Speciality, (speciality) => speciality.doctors
    ) // specify inverse side as a second parameter
    @JoinColumn()
    speciality: Speciality

    @ManyToOne(
        () => Department, (department) => department.doctors
    ) // specify inverse side as a second parameter
    @JoinColumn()
    department: Department

    @OneToMany(
        () => Appointment, (appointment) => appointment.doctor,
        { onDelete: 'CASCADE' }
    ) // specify inverse side as a second parameter
    appointments: Appointment[]

    @OneToMany(() => Schedule, (schedule) => schedule.doctor,
        { onDelete: 'CASCADE' }
        )
    schedules: Schedule[]

}
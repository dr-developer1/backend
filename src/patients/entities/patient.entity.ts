import {BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../../users/entities/user.entity";
import {Allergy} from "../../allergies/entities/allergy.entity";
import {Appointment} from "../../appointments/entities/appointment.entity";

@Entity('patients')
export class Patient extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    blood_group: string;

    @OneToOne(
        () => User, (user) => user.patient,
        { onDelete: 'CASCADE' }
    ) // specify inverse side as a second parameter
    @JoinColumn()
    user: User

    @OneToMany(() => Allergy, (allergy) => allergy.patient,
        { onDelete: 'CASCADE' }
    )

    allergies: Allergy[]

    @OneToOne(
        () => Appointment, (appointment) => appointment.patient,
        {onDelete: 'CASCADE'}
    ) // specify inverse side as a second parameter
    appointment: Appointment

}
import {IsDateString, IsNotEmpty, IsString, Matches} from "class-validator";
import {Role} from "../user-role.enum";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsDateString()
    birthdate: Date;

    role: Role;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsString()
    photo: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/ ,
        {
            message: 'Your password is too weak !'
        }
    )
    password: string;


}

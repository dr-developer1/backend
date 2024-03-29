import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreatePatientDto} from "../patients/dto/create-patient.dto";
import {IAuthResponse} from "./auth-response.interface";

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('/register')
    async register(@Body() createPatientDto: CreatePatientDto) {
        return this.authService.register(createPatientDto)
    }

    @Post('/login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string
    ): Promise<IAuthResponse> {

        return this.authService.login(email, password);

    }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UsePipes,
    ValidationPipe, UseGuards
} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from "./entities/user.entity";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../guards/roles.guard";
import {Role} from "./user-role.enum";
import {Roles} from "./roles.decorator";

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}

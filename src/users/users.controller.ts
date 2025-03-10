import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RequestUserDto } from './dto/request-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: RequestUserDto) {
    const createdUser = await this.usersService.create(createUserDto);
    return new ResponseUserDto(createdUser);
  }

  @Get()
  async findAll() {
    const allUsers = await this.usersService.findAll();

    return allUsers.map((user: UserEntity) => new ResponseUserDto(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(+id);

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return new ResponseUserDto(foundUser);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<ResponseUserDto>,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

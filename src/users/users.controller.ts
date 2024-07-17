import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { UUID } from 'node:crypto';
import { Role } from './entities';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

/*   @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard) */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if(!createUserDto.role) createUserDto.role = Role.USER;
    return this.usersService.create(createUserDto);
  }

/*   @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard) */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

/*   @Roles(Role.ADMIN) */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.findOne(id);
  }

/*   @Roles(Role.ADMIN) */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

/*   @Roles(Role.ADMIN) */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.remove(id);
  }
}

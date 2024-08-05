import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CreateUserDto, PartialUserDto, UpdateUserDto } from './dto';
import { UsersService } from './users.service';
import { UUID } from 'node:crypto';
import { Role } from './entities';
import { Roles } from 'src/auth/decorators';
import { JwtGuard, RolesGuard } from 'src/auth/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.role) createUserDto.role = Role.USER;
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: { request: ExpressRequest; user: PartialUserDto },
  ) {
    const { user } = req;
    return this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ClassSerializerInterceptor)
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.remove(id);
  }
}

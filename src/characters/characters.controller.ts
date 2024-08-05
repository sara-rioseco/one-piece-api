import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto, UpdateCharacterDto  } from './dto';
import { UUID } from 'crypto';
import { Roles } from 'src/auth/decorators';
import { Role } from '../users/entities';
import { JwtGuard, RolesGuard } from 'src/auth/guards';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtGuard, RolesGuard)
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.charactersService.getById(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() updateCharacterDto: UpdateCharacterDto) {
    return this.charactersService.update(id, updateCharacterDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.charactersService.remove(id);
  }
}

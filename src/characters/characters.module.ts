import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Affiliation, Age, Alias, Bounty, Character, Debut, DevilFruit, Epiteth, Height, Occupation, Origin, Residence } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/entities';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Character,  Affiliation, Age, Alias, Bounty, Debut, DevilFruit, Epiteth, Height, Occupation, Origin, Residence])],
  controllers: [CharactersController],
  providers: [CharactersService, AuthService, UsersService, JwtService],
})
export class CharactersModule {}

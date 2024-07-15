import { Module } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CharactersController } from './characters.controller';
import { Affiliation, Age, Alias, Bounty, Character, Debut, DevilFruit, Epiteth, Height, Occupation, Origin, Residence } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Character,  Affiliation, Age, Alias, Bounty, Debut, DevilFruit, Epiteth, Height, Occupation, Origin, Residence])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}

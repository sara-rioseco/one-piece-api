import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Affiliation, Age, Alias, Bounty, Debut, DevilFruit, Epiteth, Height, Occupation, Origin, Residence } from 'src/characters/entities/index';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.PORT) || 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'one_piece_db',
      entities: [Affiliation, Age, Alias, Bounty, Debut, DevilFruit, Epiteth, Height, Occupation, Origin, Residence],
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    };
  }
}
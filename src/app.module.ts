import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttlerOptions, throttlerProvider } from './config';
import { IsUnique } from './auth/decorators/';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ThrottlerModule.forRoot(throttlerOptions),
    UsersModule,
    AuthModule,
    CharactersModule
  ],
  controllers: [AppController],
  providers: [AppService, throttlerProvider, IsUnique],
})
export class AppModule {}

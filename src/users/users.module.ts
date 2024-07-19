import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [AuthModule],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService/* , AuthService, JwtService */],
})
export class UsersModule {}

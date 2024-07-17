import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  // imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService/* , AuthService, JwtService */],
})
export class UsersModule {}

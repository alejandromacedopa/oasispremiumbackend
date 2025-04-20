import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { Rol } from 'src/roles/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // Tipo de db
      host: 'localhost',
      port: 3306, // Puerto de la db
      username: 'root', // Nombre de usuario
      password: '', // Contraseña
      database: 'oasisdba', // Nombre de la db
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    //Modulos creados
    UsersModule,
    RolesModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

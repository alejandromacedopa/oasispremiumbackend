import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import storage from '../firebase/cloud_storage';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Funcion para crear un nuevo usuario
  create(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // Relación con roles
  findAll() {
    return this.userRepository.find({ relations: ['roles'] });
  }

  // Actualizar un usuario
  async update(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOneBy({ id: id });

    if (!userFound) {
      throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }

    console.log('User:', user);

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }

  // Actualizar img
  async updateWithImage(
    file: Express.Multer.File,
    id: number,
    user: UpdateUserDto,
  ) {
    const url = await storage(file, file.originalname);
    console.log('URL: ' + url);
    console.log('UserURL: ', user);

    if (url === undefined && url === null) {
      throw new HttpException(
        'La imagen no se pudo guardar',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userFound = await this.userRepository.findOneBy({ id: id });

    if (!userFound) {
      throw new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }
    user.image = url;
    const updatedUser = Object.assign(userFound, user);
    return this.userRepository.save(updatedUser);
  }
}

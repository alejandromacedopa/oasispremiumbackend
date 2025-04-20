import { hash } from 'bcrypt';
import { Rol } from 'src/roles/rol.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' }) // Nombre de la tabla en la DB
export class User {
  @PrimaryGeneratedColumn() // Llave primaria
  id: number;

  @Column() // Columna
  name: string;

  @Column() // Columna
  lastname: string;

  @Column({ unique: true }) // Valor unico
  email: string;

  @Column({ unique: true }) // Valor unico
  phone: string;

  @Column() // Columna
  password: string;

  @Column({ nullable: true }) // Valor nulo = verdadero
  image: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de creación por defecto
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Fecha de actualización por defecto
  updated_at: Date;

  // Tabla intermedia relacional
  @JoinTable({
    name: 'user_has_roles',
    joinColumn: {
      name: 'id_user',
    },
    inverseJoinColumn: {
      name: 'id_rol',
    },
  })

  // Relación de muchos a muchos, 1 ROL - N USUARIOS
  @ManyToMany(() => Rol, (rol) => rol.users)
  roles: Rol[];

  // Hasheamos la contraseña (encrytamos)
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(process.env.HASH_SALT));
  }
}

import { Injectable } from "@nestjs/common";
import { InsertResult } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const entity = this.repo.create(createUserDto);
    const result: User = await this.repo.save(entity);
    return result;
  }

  async findAll(): Promise<User[]> {
    return await this.repo.find();
  }

  async findByUsername(username: string): Promise<User> {
    return this.repo.findOne({
      where: { username },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

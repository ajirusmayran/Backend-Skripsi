import { Injectable } from "@nestjs/common";
import { InsertResult } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserDetailDto } from "./dto/user-detail.dto";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const entity = this.repo.create(createUserDto);
    const result: User = await this.repo.save(entity);
    return result;
  }

  async findAll(): Promise<UserDetailDto[]> {
    const user = await this.repo.find({
      where:{
        status:true
      }
    });
    const userDetail: UserDetailDto[] = user.map(({ username, id, name, phone, type, }) => {
      const detail: UserDetailDto = {
        id,
        username,
        name,
        phone,
        type
      }
      return detail
    })
    return userDetail

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

  async validateNewUsername(username: string) :Promise<Boolean> {
    const user = await this.findByUsername(username)
    if(user){
      return false
    }
    return true
  }
  async remove(id: string) {
    await this.repo.findOne({
      where: { id }
    }).then(data =>  {
      data.status = false
      this.repo.update(id, data)
    })
    .catch(err => {
      console.log(err)
      return false
    })
  }
}

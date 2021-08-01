import { getCustomRepository } from 'typeorm';
import { UsersRepository } from "../repositories/UsersRepository";
import { hash } from 'bcryptjs';

interface IUserRequest {
  name: string,
  email: string,
  password: string,
  admin?: Boolean
}

class CreateUserService {

  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new Error("Email incorrect!");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    });

    await usersRepository.save(user);

    return user;
  }

}

export { CreateUserService }
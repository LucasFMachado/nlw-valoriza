import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
  email: string,
  password: string
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email
    });

    if (!user) {
      throw new Error("Email/Password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin
    }

    const token = sign(
      payload,
      "77a314f78164258051533668f36790ed",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }

}

export { AuthenticateUserService }
import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentRequest {
  sender_id: string;
  receiver_id: string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {

  async execute({ sender_id, receiver_id, tag_id, message } : IComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (sender_id === receiver_id) {
      throw new Error("Incorrect user receiver!");
    }

    const userReceiverExists = await usersRepository.findOne(receiver_id);

    if (!userReceiverExists) {
      throw new Error("User receiver does not exists!");
    }

    const compliment = complimentRepository.create({
      sender_id,
      receiver_id,
      tag_id,
      message
    });

    await complimentRepository.save(compliment);

    return compliment;
  }

}

export { CreateComplimentService }
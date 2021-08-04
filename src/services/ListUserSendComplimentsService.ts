import { getCustomRepository } from "typeorm";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";

class ListUserSendComplimentsService {

  async execute(user_id: string) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);

    const compliments = await complimentsRepository.find({
      where: {
        sender_id: user_id
      },
      relations: [
        "userSender",
        "userReceiver",
        "tag"
      ]
    });

    return compliments;
  }

}

export { ListUserSendComplimentsService }
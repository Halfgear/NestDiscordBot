import { Injectable } from "@nestjs/common";
import { from, Observable } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { notrollz_entity } from "./data_base/notrollz_db.entity";
import { UserInterface } from "./data_base/user.interface";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(notrollz_entity)
    private userRepository: Repository<notrollz_entity>
  ) {}

  add(user: UserInterface): Observable<notrollz_entity> {
    return from(this.userRepository.save(user));
  }

  findAll(): Observable<notrollz_entity[]> {
    return from(this.userRepository.find());
  }
}

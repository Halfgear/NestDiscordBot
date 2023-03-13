import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterface } from 'src/data_base/user.interface';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { notrollz_entity } from '../data_base/notrollz_db.entity';


//this is not used yet. Will implement it if this becomes necessary.
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(notrollz_entity)
        private userRepository: Repository<UserInterface>
    ) {}

    add(user: UserInterface): Observable<UserInterface> {
        return from(this.userRepository.save(user));
    }

    findAll(): Observable<UserInterface[]> {
        return from(this.userRepository.find());
    }

}
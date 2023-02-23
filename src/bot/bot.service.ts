import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { notrollz_entity } from '../data_base/notrollz_db.entity';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(notrollz_entity)
        private usersRepository: Repository<notrollz_entity>,
    ) { }

    findAll(): Promise<notrollz_entity[]> {
        return this.usersRepository.find();
    }

    //not sure if JSON.parse completely fixed this problem, but I will leave it like this for now.
    findOne(id: string): Promise<notrollz_entity> {
        return JSON.parse(localStorage.getItem('id') || '{}');
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
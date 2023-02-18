//JSON 파일로 유저 태그와 소환사 명을 저장합니다

import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {notrollz_entity} from '../../data_base/notrollz_db.entity';

@Injectable()
export class UsersService {
  constructor(private dataSource: notrollz_entity) {}
}


export async function saveToJSON(
  id: string,
  discordTag: string,
  summonerName: string,
) {

  


}
//TODO: move the DATA file into src.
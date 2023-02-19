//JSON 파일로 유저 태그와 소환사 명을 저장합니다

import {AppDataSource} from '../../data_base/index';
import {notrollz_entity} from '../../data_base/notrollz_db.entity';

//saves 
export async function saveToDB(
  id: string,
  summonerName: string,
  discordTag: string,  
) {
//parse int
var id_int = +id;

const user = new notrollz_entity()
user.discord_id = id_int;
user.discord_tag = discordTag
user.summoner_name = summonerName
user.team_name = ""
user.team_catain = false;


await AppDataSource.manager.save(user)
console.log(user.discord_tag,"님이 등록되셨습니다.")

}

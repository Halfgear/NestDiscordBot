import {notrollz_entity} from '../../data_base/notrollz_db.entity';
import { v4 as uuidv4 } from 'uuid';
import { QueryFailedError } from 'typeorm';

//saves 
export async function saveToDB(
  id: string,
  summonerName: string,
  discordTag: string,  
) {


const user = new notrollz_entity()
user.uuid = uuidv4();
user.discord_id = id;
user.discord_tag = discordTag;
user.summoner_name = summonerName;
user.team_name = "";
user.team_catain = false;


//add user
try{
  await notrollz_entity.save(user);
} catch(QueryFailedError) {
  await notrollz_entity.save(user);
  console.log("중복된 유저입니다.");

}


console.log(user.discord_tag,"님이 등록되셨습니다.")

}

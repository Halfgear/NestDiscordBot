import {notrollz_entity} from '../../data_base/notrollz_db.entity';

//saves 
export async function saveToDB(
  id: string,
  summonerName: string,
  discordTag: string,  
) {


const user = new notrollz_entity()
user.discord_id = id;
user.discord_tag = discordTag
user.summoner_name = summonerName
user.team_name = ""
user.team_catain = false;


//add user
await this.UsersService.add(user);
console.log(user.discord_tag,"님이 등록되셨습니다.")

}

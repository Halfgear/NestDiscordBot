const fs = require('fs');

//JSON 파일로 유저 태그와 소환사 명을 저장합니다
export function saveToJSON(
  id: string,
  discordTag: string,
  summonerName: string,
) {

  var currentData = fs.readFileSync('./NoTrollzUsers.json');
  var data = JSON.parse(currentData);

  let newClient = {
    아이디: `${id}`,
    디스코드태그: `${discordTag}`,
    소환사명: `${summonerName}`,
  };

  data.push(newClient);

  var usersjson = JSON.stringify(data);

  fs.writeFileSync('./NoTrollzUsers.json', usersjson, (err: any) => {
    if (err) console.log(err);
    else {
      console.log('NoTrollzUsers.json에 성공적으로 저장되었습니다\n');
    }
  });



}

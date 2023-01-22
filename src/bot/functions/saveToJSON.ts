const fs = require('fs');

//JSON 파일로 유저 태그와 소환사 명을 저장합니다
export function saveToJSON(
  id: string,
  discordTag: string,
  summonerName: string,
) {

  //현재 데이터 읽기
  var currentData = fs.readFileSync('./NoTrollzUsers.json');

  try {
    var data = JSON.parse(currentData);
  
  } catch (error) {
        
  }
  
  //추가할 신규데이터
  let newClient = {
    아이디: `${id}`,
    디스코드태그: `${discordTag}`,
    소환사명: `${summonerName}`,
  };

  //데이터 통합
  data.push(newClient);

  //Json화
  var usersjson = JSON.stringify(data, null, 4);

  //다시 파일로 추가
  fs.writeFileSync('./NoTrollzUsers.json', usersjson, (err: any) => {
    if (err) console.log(err);
  });
  console.log('NoTrollzUsers.json에 성공적으로 저장되었습니다\n');
}
//TODO: move the DATA file into src.
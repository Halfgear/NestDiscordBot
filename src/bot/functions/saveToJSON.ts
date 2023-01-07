import fs from 'fs';

//JSON 파일로 유저 태그와 소환사 명을 저장합니다
export function saveToJSON(
  id: string,
  discordTag: string,
  summonerName: string,
) {
  const client = {
    info: {
      아이디: `${id}`,
      디스코드태그: `${discordTag}`,
      소환사명: `${summonerName}`,
    },
  };
  const data = JSON.stringify(client);

  fs.writeFile('./NoTrollzUsers.json', data, (err: any) => {
    if (err) console.log(err);
    else {
      console.log('NoTrollzUsers.json에 성공적으로 저장되었습니다\n');
    }
  });
}

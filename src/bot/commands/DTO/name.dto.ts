import { Param } from '@discord-nestjs/core';
export class nameDTO {
  @Param({
    name: '소환사명',
    description: '롤 인게임 이름',
    required: true,
  })
  name: string;
}

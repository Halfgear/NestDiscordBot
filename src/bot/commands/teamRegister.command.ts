import {
  UsePipes,
  Payload,
  DiscordTransformedCommand,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { TransformPipe } from '@discord-nestjs/common';
import { nameDTO } from './DTO/name.dto';
import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Command } from './commandDecorator/command.decorator';
import { saveToJSON } from '../functions/saveToJSON';

@Injectable()
@Command({
  name: '팀등록',
  description: '팀원등록 신청하기',
  defaultMemberPermissions: 'ViewChannel',
})
@UsePipes(TransformPipe)
/**
 * 팀장에게 팀원추가 신청보내기
 * 팀장이 받아줄시 팀이름추가 및 팀멤버로 추가
 * 로그로 저장
 */
export class BaseInfoCommand implements DiscordTransformedCommand<nameDTO> {
  async handler(
    @Payload() { name }: nameDTO,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<void> {
    //유저가 빈 값을 입력했을때는 디스코드 자체적으로 입력을 요구함
    const discordTag = interaction.user.tag;
    const id = interaction.user.id;
    //커맨드를 사용한 유저 특정
    const user = interaction.guild.members.cache.get(id);
    //유저에게 추가할 역할 특정
    const memberRole = interaction.guild.roles.cache.find(
      (role) => role.name === 'Member',
    );

    //이미 팀원인지 유저인지 확인.
    if (user.roles.cache.find((role) => role.name === '팀원')) {
      await interaction.reply(
        '이미 팀원으로 등록되어있습니다 팀원 역활을 지워주세요.',
      );
      return;
    }

    //유저 이름 변경
    user.setNickname(name);
    //유저에게 Member 추가
    user.roles.add(memberRole);

    //JSON파일로 태그와 유저이름을 저장합니다.
    saveToJSON(id, discordTag, name);

    //채널 로그로 답장
    const message = new EmbedBuilder().setDescription(
      `소환사명:${name} \n 디스코드태그:${discordTag}`,
    );
    await interaction.reply({ embeds: [message] });
  }
}

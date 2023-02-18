import {
  UsePipes,
  Payload,
  DiscordTransformedCommand,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { nameDTO } from './DTO/name.dto';
import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Command } from './commandDecorator/command.decorator';
import { saveToJSON } from '../functions/saveToJSON';
import { TransformPipe } from '@discord-nestjs/common';

@Injectable()
@UsePipes(TransformPipe)
@Command({
  name: '등급업',
  description: '소환사명 확인',
  defaultMemberPermissions: 'UseApplicationCommands',
})
/**
 * 처음 유저가 들어올시 쓰는 "Member"권한 추가 및 소환사명으로 디스코드 닉네임 변경
 * JSON파일로 유저 디스코드 ID, 닉네임태그, 소환사명 수집.
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

    //이미 등업된 유저인지 확인.
    if (user.roles.cache.find((role) => role.name === 'Member')) {
      await interaction.reply('이미 등업되어있습니다.');
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

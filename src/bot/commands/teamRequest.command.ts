import {
  UsePipes,
  Payload,
  DiscordTransformedCommand,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { TransformPipe } from '@discord-nestjs/common';
import { captainDTO } from './DTO/captain.dto';
import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Command } from './commandDecorator/command.decorator';

@Injectable()
@Command({
  name: '팀등록신청',
  description: '팀원등록 신청하기',
  defaultMemberPermissions: 'ViewChannel',
})
@UsePipes(TransformPipe)
/**
 * 팀장에게 팀원추가 신청보내기
 * 팀장이 받아줄시 팀이름추가 및 팀멤버로 추가
 * 로그로 저장
 */
export class TeamAddRequest implements DiscordTransformedCommand<captainDTO> {
  async handler(
    @Payload() { captain }: captainDTO,
    { interaction }: TransformedCommandExecutionContext,
  ): Promise<void> {
    //유저가 빈 값을 입력했을때는 디스코드 자체적으로 입력을 요구함
    const id = interaction.user.id;
    const userName = interaction.user.username;

    //DM보낼 팀장 특정
    const leaderID = captain.substring(2, captain.length - 1);
    console.log(leaderID)
    const leaderName = (await interaction.guild.members.fetch(leaderID)).nickname;
    console.log(leaderName)
    const leader = interaction.guild.members.cache.get(leaderID);

    //팀이름 획득
    const teamName = leaderName.split("/", 1)[0];
    console.log(teamName);

    if (leader.roles.cache.find((role) => role.name === '팀장')) {
      await interaction.reply(
        '선택하신 유저가 팀장이 아닙니다. 팀장을 골라주세요.',
      );
      return;
    }



    //팀장이름 양식확인 (팀이름이 앞에오고 /로 나눠져 있어야합니다)
    if (leaderName.split("/", 2).length == 0) {
      await interaction.reply("팀장이름 양식이 맞지 않습니다");
      return;
    }

    //커맨드를 사용한 유저 특정
    const user = interaction.guild.members.cache.get(id);

    //이미 팀원인지 유저인지 확인.
    if (user.roles.cache.find((role) => role.name === '팀원')) {
      await interaction.reply(
        '이미 팀원으로 등록되어있습니다 팀원 역할을 지워주세요.',
      );
      return;
    }

    //채널 로그로 답장
    const message = new EmbedBuilder().setDescription(
      `팀장에게 신청을 보냈습니다 팀장이 수락할시 팀에 추가 예정입니다.`,
    );
    await interaction.reply({ embeds: [message] });

    //팀장에게 수락버튼이 포함된 DM전송
    leader.send("message")



    ////////////////////////////////////팀장이 수락한후 버튼이 할 행동

    //유저 이름 변경
    user.setNickname(teamName + "/" + userName);


    //유저에게 추가할 역할 특정
    const teamRole = interaction.guild.roles.cache.find(
      (role) => role.name === '팀원',
    );

    //유저에게 팀원역할 추가
    user.roles.add(teamRole);

    //JSON파일로 팀원저장

  }
}

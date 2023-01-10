import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { BotGateway } from './bot.gateway';
import { BaseInfoCommand } from './commands/rankup.command';
import { TeamAddRequest } from './commands/teamRequest.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, BaseInfoCommand, TeamAddRequest],
})
export class BotModule {}

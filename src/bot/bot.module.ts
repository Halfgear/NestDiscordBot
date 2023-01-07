import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { BotGateway } from './bot.gateway';
import { BaseInfoCommand } from './rankup.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, BaseInfoCommand],
})
export class BotModule {}

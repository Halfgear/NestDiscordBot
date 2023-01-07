import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { DelegateDiscordModule } from './delegate.discord.module';

@Module({
  imports: [ConfigModule.forRoot(), DelegateDiscordModule, BotModule],
})
export class AppModule {}

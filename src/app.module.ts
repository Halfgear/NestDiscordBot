import { Module } from "@nestjs/common";
import { BotModule } from "./bot/bot.module";
import { ConfigModule } from "@nestjs/config";
import { DelegateDiscordModule } from "./delegate.discord.module";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule,
    DelegateDiscordModule, 
    BotModule],
})
export class AppModule {}
